import React from 'react';
import { SHORTCUTS } from '../../utils/keyboardShortcuts';
import './KeyboardShortcuts.css';

function KeyboardShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="shortcuts-modal">
      <div className="shortcuts-content">
        <h2>Keyboard Shortcuts</h2>
        <ul className="shortcuts-list">
          {Object.entries(SHORTCUTS).map(([key, description]) => (
            <li key={key} className="shortcut-item">
              <kbd>{key}</kbd>
              <span>{description}</span>
            </li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default KeyboardShortcutsHelp;
