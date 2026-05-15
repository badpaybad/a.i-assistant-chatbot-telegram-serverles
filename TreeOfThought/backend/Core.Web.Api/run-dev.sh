#!/bin/bash

# Ensure we are in the script's directory
cd "$(dirname "$0")"

fuser -k 5000/tcp
fuser -k 4200/tcp

# Create wwwroot/admin if it doesn't exist, and clean it to avoid StaticWebAssets conflicts
rm -rf wwwroot/admin/*
mkdir -p wwwroot/admin

# Start Angular build in watch mode in the background
echo "Starting Angular build in watch mode..."
# Using --base-href and --output-path here as well to be sure, 
# although they are in angular.json
(cd ../../frontend/web && npm start) &
ANGULAR_PID=$!

# Function to kill background processes on exit
cleanup() {
    echo "Stopping Angular build (PID: $ANGULAR_PID)..."
    kill $ANGULAR_PID
    exit
}
trap cleanup SIGINT SIGTERM

# Start .NET backend in watch mode
echo "Starting Backend in watch mode (Hot Reload disabled for stability)..."
# Use --no-hot-reload to avoid crashes when Angular builds many files into wwwroot
dotnet watch run --no-hot-reload --urls "http://0.0.0.0:5000"
