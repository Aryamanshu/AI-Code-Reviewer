import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import Prism and language support
import Prism from 'prismjs'

// Import core languages first
import 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'

// Then import languages that depend on clike
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-python'

// Import theme
import 'prismjs/themes/prism-tomorrow.css'

// Initialize Prism and make it globally available
window.Prism = Prism

// Add a plain text language definition as fallback
Prism.languages.plain = {
  'code': /[\s\S]+/
}

// Run initial highlighting
Prism.highlightAll()

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
