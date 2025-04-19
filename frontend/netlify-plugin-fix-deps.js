// Netlify plugin to fix dependency issues
module.exports = {
  onPreBuild: async ({ utils }) => {
    try {
      console.log('Running custom Netlify plugin to fix dependencies...');
      
      // Fix style-to-js import in hast-util-to-jsx-runtime
      const fs = require('fs');
      const path = require('path');
      
      const filePath = path.join(__dirname, 'node_modules/hast-util-to-jsx-runtime/lib/index.js');
      
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
      
      console.log('Dependency fixes completed successfully!');
    } catch (error) {
      console.error('Error fixing dependencies:', error);
      // Don't fail the build
    }
  }
};
