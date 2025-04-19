import { useState } from 'react';
import './CodeHistory.css';

function CodeHistory({ history, onSelectCode }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="code-history">
      <button 
        className="history-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide History' : 'Show History'}
      </button>
      
      {isOpen && (
        <div className="history-panel">
          <h3>Previous Code</h3>
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <div className="history-item-header">
                  <span className="history-timestamp">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <button 
                    className="history-load-btn"
                    onClick={() => onSelectCode(item.code)}
                  >
                    Load
                  </button>
                </div>
                <div className="history-preview">
                  {item.code.substring(0, 100)}
                  {item.code.length > 100 ? '...' : ''}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CodeHistory;
