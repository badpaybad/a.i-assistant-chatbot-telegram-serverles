import asyncio
import time
import sys
from unittest.mock import MagicMock, AsyncMock

# Mocking external dependencies
sys.modules['playwright'] = MagicMock()
sys.modules['playwright.async_api'] = MagicMock()
sys.modules['bot_telegram'] = MagicMock()
sys.modules['knowledgebase.dbcontext'] = MagicMock()

# Import the module to test
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../skills/zalo/')))
import zalo_surf

# Helper to stop the loops after some time
async def stop_after(seconds):
    await asyncio.sleep(seconds)
    zalo_surf.isStop = True
    print(f"Stopping loops after {seconds} seconds...")

async def test_concurrency():
    print("Testing concurrency and batching logic...")
    
    # Mock open_zalo_group_omt_tbp to return sequences of messages
    # We want to test batching 3 items
    zalo_surf.open_zalo_group_omt_tbp = AsyncMock(side_effect=[
        ["msg1"], ["msg2"], ["msg3"], # Batch 1
        ["msg1"], ["msg2"], ["msg3"], # Batch 2 (Duplicate)
        ["msg4"],                      # Batch 3 (Short batch if queue empty)
        None
    ])
    
    # Mock db context
    zalo_surf.knowledgebase.dbcontext.zalo_all_message = MagicMock()
    
    # Run the loops for a short duration
    try:
        await asyncio.wait_for(
            asyncio.gather(
                zalo_surf.loop_enqueue_processed_zalo_group_msg(),
                zalo_surf.loop_dequeue_processed_zalo_group_msg_into_telegram(),
                stop_after(5)
            ),
            timeout=10
        )
    except asyncio.TimeoutError:
        print("Test timed out!")
    except Exception as e:
        print(f"Test error: {e}")

    # Verify results
    insert_calls = zalo_surf.knowledgebase.dbcontext.zalo_all_message.insert.call_args_list
    print(f"DB insert call count: {len(insert_calls)}")
    
    for i, call in enumerate(insert_calls):
        args, kwargs = call
        data = args[0]
        print(f"Insert {i}: batch_size={data.get('batch_size')}, messages={data.get('messages')}")

    # We expect:
    # 1. First batch of 3 (msg1, msg2, msg3)
    # 2. Second batch of 3 (msg1, msg2, msg3) - SHOULD BE SKIPPED as duplicate
    # 3. Third batch of 1 (msg4)
    # Total unique inserts: 2
    
    if len(insert_calls) == 2:
        print("BATCH & DUPLICATE TEST PASSED!")
    else:
        print(f"BATCH & DUPLICATE TEST FAILED: Expected 2 inserts, got {len(insert_calls)}")

if __name__ == "__main__":
    asyncio.run(test_concurrency())
