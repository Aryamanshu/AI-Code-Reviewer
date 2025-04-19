#!/bin/bash

# Exit on error
set -e

echo "Starting Netlify build process..."

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Downgrade React to a stable version
echo "Downgrading React to v18.2.0..."
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"
