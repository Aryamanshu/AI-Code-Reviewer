import { useState } from 'react';
import { getTemplatesForLanguage } from '../../utils/codeTemplates';
import './Templates.css';

function Templates({ language, onSelectTemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const templates = getTemplatesForLanguage(language);
  
  const handleSelectTemplate = (templateCode) => {
    onSelectTemplate(templateCode);
    setIsOpen(false);
  };
  
  return (
    <div className="templates-container">
      <button 
        className="templates-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Code Templates"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        <span>Templates</span>
      </button>
      
      {isOpen && (
        <div className="templates-dropdown">
          <div className="templates-header">
            <h3>Code Templates for {language}</h3>
            <button 
              className="close-templates-btn"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {templates.length > 0 ? (
            <ul className="templates-list">
              {templates.map((template, index) => (
                <li key={index} className="template-item">
                  <span className="template-name">{template.name}</span>
                  <button 
                    className="use-template-btn"
                    onClick={() => handleSelectTemplate(template.code)}
                  >
                    Use
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-templates">
              <p>No templates available for {language}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Templates;
