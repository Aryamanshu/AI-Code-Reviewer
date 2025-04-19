#!/bin/bash

# Exit on error
set -e

echo "Starting Netlify build process..."

# Install dependencies with specific flags to handle peer dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps --force

# Fix specific dependency issues
echo "Fixing dependency issues..."
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps --force
npm install style-to-js@1.1.3 --legacy-peer-deps --force
npm install react-markdown@8.0.7 --legacy-peer-deps --force

# Create a patch for the problematic file
echo "Creating patch for hast-util-to-jsx-runtime..."
mkdir -p node_modules_patches
cat > node_modules_patches/hast-util-to-jsx-runtime-fix.js << 'EOL'
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../node_modules/hast-util-to-jsx-runtime/lib/index.js');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the problematic import
  content = content.replace(
    "import styleToJs from 'style-to-js'",
    "import * as styleToJsModule from 'style-to-js'; const styleToJs = styleToJsModule.default || styleToJsModule"
  );

  fs.writeFileSync(filePath, content);
  console.log('Successfully patched hast-util-to-jsx-runtime');
} else {
  console.log('File not found:', filePath);
}
EOL

# Apply the patch
echo "Applying patches..."
node node_modules_patches/hast-util-to-jsx-runtime-fix.js

# Build the project
echo "Building the project..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

echo "Build completed successfully!"
