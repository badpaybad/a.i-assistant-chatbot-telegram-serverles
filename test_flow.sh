#!/bin/bash
# 1. Get auth code
echo "Getting code..."
# We can't easily script the login because it redirects to the React UI and requires user interaction.
# But I can just look at the raw response if I fake an auth code? No, auth code must be valid.
