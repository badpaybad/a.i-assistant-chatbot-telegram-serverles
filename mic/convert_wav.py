import os
import sys
import wave
import struct

def resample_wav_to_16k_mono(input_path, output_wav_path, output_h_path, array_name):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} does not exist.")
        return False
        
    # Open input WAV file using built-in wave module
    with wave.open(input_path, "rb") as w_in:
        num_channels = w_in.getnchannels()
        sample_width = w_in.getsampwidth()
        sample_rate = w_in.getframerate()
        num_frames = w_in.getnframes()
        raw_frames = w_in.readframes(num_frames)
        
    print(f"Loaded: {input_path}")
    print(f"  Sample Rate: {sample_rate}Hz")
    print(f"  Channels: {num_channels}")
    print(f"  Sample Width: {sample_width} bytes ({sample_width * 8} bits)")
    print(f"  Frames: {num_frames}")
    
    # Parse frames based on bit depth
    if sample_width == 2: # 16-bit signed
        total_samples = len(raw_frames) // 2
        fmt = f"<{total_samples}h"
        samples = list(struct.unpack(fmt, raw_frames))
    elif sample_width == 1: # 8-bit unsigned
        total_samples = len(raw_frames)
        fmt = f"<{total_samples}B"
        raw_samples = list(struct.unpack(fmt, raw_frames))
        samples = [(x - 128) * 256 for x in raw_samples]
    else:
        print(f"Error: Unsupported sample width ({sample_width}). Only 8-bit and 16-bit WAV supported.")
        return False
        
    # Mix down multi-channel to mono
    mono_samples = []
    if num_channels > 1:
        for i in range(0, len(samples), num_channels):
            channel_sum = sum(samples[i:i+num_channels])
            mono_samples.append(channel_sum // num_channels)
    else:
        mono_samples = samples
        
    # Resample to 16000 Hz using linear interpolation
    resampled_samples = []
    if sample_rate == 16000:
        resampled_samples = mono_samples
    else:
        ratio = sample_rate / 16000.0
        new_len = int(len(mono_samples) / ratio)
        print(f"Resampling from {sample_rate}Hz to 16000Hz (Ratio: {ratio:.3f}, Samples: {len(mono_samples)} -> {new_len})")
        for i in range(new_len):
            pos = i * ratio
            idx = int(pos)
            frac = pos - idx
            if idx + 1 < len(mono_samples):
                val = int((1.0 - frac) * mono_samples[idx] + frac * mono_samples[idx + 1])
            else:
                val = mono_samples[-1]
            resampled_samples.append(val)
            
    # Pack resampled samples to 16-bit signed binary bytes
    out_pcm_bytes = struct.pack(f"<{len(resampled_samples)}h", *resampled_samples)
    
    # Write the output 16kHz Mono 16-bit WAV file using wave module
    # This automatically writes a standard 44-byte WAV header
    with wave.open(output_wav_path, "wb") as w_out:
        w_out.setnchannels(1)
        w_out.setsampwidth(2)
        w_out.setframerate(16000)
        w_out.writeframes(out_pcm_bytes)
        
    # Re-read output WAV file to get the exact binary data including header
    with open(output_wav_path, "rb") as f:
        final_wav_data = f.read()
        
    print(f"Saved resampled WAV: {output_wav_path} ({len(final_wav_data)} bytes)")
    
    # Generate C/C++ Header file matching ok_wav.h format
    out_h = []
    out_h.append(f"#ifndef {array_name.upper()}_H")
    out_h.append(f"#define {array_name.upper()}_H")
    out_h.append("")
    out_h.append(f"const unsigned char {array_name}[] = {{")
    
    # Write 12 bytes per line
    hex_bytes = []
    for i, b in enumerate(final_wav_data):
        hex_bytes.append(f"0x{b:02x}")
        if i % 12 == 11 or i == len(final_wav_data) - 1:
            out_h.append("  " + ", ".join(hex_bytes) + ",")
            hex_bytes = []
            
    out_h.append("};")
    out_h.append(f"const unsigned int {array_name}_len = {len(final_wav_data)};")
    out_h.append("")
    out_h.append("#endif")
    
    with open(output_h_path, "w") as f:
        f.write("\n".join(out_h))
        
    print(f"Saved C header: {output_h_path} ({len(out_h)} lines)")
    return True

if __name__ == "__main__":
    # Source WAV path
    src_wav = "/home/dunp/Downloads/ok_wifi.wav"
    dest_wav = "/work/a.i-assistant-chatbot-telegram-serverles/esp32/esp32os/ok_wifi.wav"
    dest_h = "/work/a.i-assistant-chatbot-telegram-serverles/esp32/esp32os/ok_wifi_wav.h"
    
    if not os.path.exists(src_wav):
        # Fallback to local file if Downloads folder copy doesn't exist
        src_wav = dest_wav
        
    resample_wav_to_16k_mono(src_wav, dest_wav, dest_h, "ok_wifi_wav")
