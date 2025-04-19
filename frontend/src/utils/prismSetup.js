import Prism from 'prismjs';

// Import theme
import 'prismjs/themes/prism-tomorrow.css';

// Add a plain text language definition as fallback
Prism.languages.plain = {
  'code': /[\s\S]+/
};

// Initialize Prism
const initPrism = () => {
  try {
    // Run highlightAll to initialize
    Prism.highlightAll();
    return true;
  } catch (error) {
    console.error('Failed to initialize Prism:', error);
    return false;
  }
};

// Export Prism and initialization function
export { Prism, initPrism };
export default Prism;
