sudo apt update && sudo apt install ffmpeg
pip install pydub

../venv/bin/pip install tensorflow-cpu

../venv/bin/pip install --force-reinstall torch --index-url <https://download.pytorch.org/whl/cpu> --dry-run
