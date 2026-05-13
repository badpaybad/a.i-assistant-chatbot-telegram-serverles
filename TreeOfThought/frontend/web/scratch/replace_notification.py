import os
import re

files = [
    "src/app/modules/core-infra-auth/claim-sync/claim-sync.component.ts",
    "src/app/modules/core-infra-auth/change-password/change-password.component.ts",
    "src/app/modules/auth/signup/signup.component.ts",
    "src/app/modules/auth/login/login.component.ts",
    "src/app/modules/test/firestore-test/firestore-test.component.ts",
    "src/app/core/http/http-client.service.ts",
    "src/app/core/auth/claim.guard.ts",
    "src/app/modules/cqrs-dashboard/cqrs-test/cqrs-test.component.ts",
    "src/app/modules/test/fcm-test/fcm-test.component.ts",
    "src/app/modules/cqrs-dashboard/dashboard/dashboard.component.ts",
    "src/app/modules/cqrs-dashboard/message-list/message-list.component.ts",
    "src/app/modules/cqrs-dashboard/tracing/tracing.component.ts"
]

root_dir = "/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web"
service_abs_path = os.path.join(root_dir, "src/app/core/services/app-notification.service.ts")

for rel_path in files:
    abs_path = os.path.join(root_dir, rel_path)
    if not os.path.exists(abs_path):
        print(f"File not found: {abs_path}")
        continue
    
    with open(abs_path, 'r') as f:
        content = f.read()
    
    # Calculate relative path to service
    file_dir = os.path.dirname(abs_path)
    rel_service_path = os.path.relpath(service_abs_path, file_dir)
    # Remove .ts extension and ensure it starts with ./ or ../
    rel_service_path = rel_service_path[:-3]
    if not rel_service_path.startswith('.'):
        rel_service_path = './' + rel_service_path
    
    # Replace import
    new_content = re.sub(
        r"import\s+{\s*NzNotificationService\s*}\s*from\s*'ng-zorro-antd/notification';",
        f"import {{ AppNotificationService }} from '{rel_service_path}';",
        content
    )
    
    # Replace inject
    new_content = new_content.replace("inject(NzNotificationService)", "inject(AppNotificationService)")
    
    # If content changed, write back
    if new_content != content:
        with open(abs_path, 'w') as f:
            f.write(new_content)
        print(f"Updated: {rel_path}")
    else:
        print(f"No changes for: {rel_path}")
