import { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import Templates from '../Templates/Templates';
import KeyboardShortcuts from '../KeyboardShortcuts/KeyboardShortcuts';
import CodeStats from '../CodeStats/CodeStats';
import ExportButton from '../ExportButton/ExportButton';
import './CodeEditor.css';

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
];

function CodeEditor({ code, setCode, onReviewClick }) {
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Prism languages when component mounts
  useEffect(() => {
    // Ensure Prism is properly initialized
    Prism.highlightAll();

    // Re-initialize when language changes
    const highlightCode = () => {
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
    };

    // Add event listener for language changes
    window.addEventListener('prism-language-change', highlightCode);

    // Clean up
    return () => {
      window.removeEventListener('prism-language-change', highlightCode);
    };
  }, []);

  const handleReviewClick = async () => {
    setIsLoading(true);
    await onReviewClick(code, language);
    setIsLoading(false);
  };

  const handleClearEditor = () => {
    if (window.confirm('Are you sure you want to clear the editor?')) {
      setCode('');
    }
  };

  const handleSelectTemplate = (templateCode) => {
    if (code.trim() && !window.confirm('This will replace your current code. Continue?')) {
      return;
    }
    setCode(templateCode);
  };

  return (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <div className="language-selector">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                // Dispatch event to trigger re-highlighting
                window.dispatchEvent(new CustomEvent('prism-language-change'));
              }}
              className="language-dropdown"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <Templates
            language={language}
            onSelectTemplate={handleSelectTemplate}
          />
        </div>
        <div className="editor-actions">
          <KeyboardShortcuts
            handlers={{
              reviewCode: handleReviewClick,
              clearEditor: handleClearEditor,
              saveCode: () => console.log('Save code functionality to be implemented')
            }}
          />
          <ExportButton
            code={code}
            language={language}
          />
          <button
            className="clear-btn"
            onClick={handleClearEditor}
            title="Clear editor (Ctrl+L)"
          >
            Clear
          </button>
          <button
            className="review-btn"
            onClick={handleReviewClick}
            disabled={isLoading || !code.trim()}
            title="Review code (Ctrl+Enter)"
          >
            {isLoading ? 'Analyzing...' : 'Review Code'}
          </button>
        </div>
      </div>

      <div className="editor-wrapper">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => {
            try {
              // Check if the language grammar exists
              const grammar = Prism.languages[language] || Prism.languages.javascript || Prism.languages.plain;
              return Prism.highlight(code, grammar, language);
            } catch (error) {
              console.error(`Error highlighting ${language} code:`, error);
              // Fallback to plain text
              return code;
            }
          }}
          padding={16}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: 'var(--editor-bg)',
            color: 'var(--text-primary)',
            height: '100%',
            width: '100%',
          }}
          className="code-editor"
        />
      </div>

      <div className="editor-footer">
        <CodeStats code={code} language={language} />
      </div>
    </div>
  );
}

export default CodeEditor;
