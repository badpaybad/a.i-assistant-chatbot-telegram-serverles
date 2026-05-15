#!/bin/bash

# Ensure we are in the script's directory
cd "$(dirname "$0")"

# Create wwwroot/admin if it doesn't exist
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
echo "Starting .NET backend..."
dotnet watch run --urls "http://localhost:5000"
