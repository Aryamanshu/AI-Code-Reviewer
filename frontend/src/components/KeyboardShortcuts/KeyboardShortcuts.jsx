import { useState, useEffect } from 'react';
import { initKeyboardShortcuts } from '../../utils/keyboardShortcuts';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import './KeyboardShortcuts.css';

function KeyboardShortcuts({ handlers }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Initialize keyboard shortcuts
  useEffect(() => {
    const cleanup = initKeyboardShortcuts(handlers);
    return cleanup;
  }, [handlers]);

  return (
    <>
      <button
        className="keyboard-help-btn"
        onClick={() => setIsHelpOpen(true)}
        title="Keyboard Shortcuts"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <path d="M6 8h.001"></path>
          <path d="M10 8h.001"></path>
          <path d="M14 8h.001"></path>
          <path d="M18 8h.001"></path>
          <path d="M8 12h.001"></path>
          <path d="M12 12h.001"></path>
          <path d="M16 12h.001"></path>
          <path d="M7 16h10"></path>
        </svg>
      </button>

      <KeyboardShortcutsHelp
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </>
  );
}

export default KeyboardShortcuts;
