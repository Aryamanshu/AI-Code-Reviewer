// Keyboard shortcuts utility

// Map of shortcuts and their descriptions
export const SHORTCUTS = {
  'Ctrl+Enter': 'Review code',
  'Ctrl+S': 'Save to local storage',
  'Ctrl+L': 'Clear editor',
  'Ctrl+D': 'Toggle dark/light mode',
  'Ctrl+F': 'Toggle fullscreen',
  'Esc': 'Exit fullscreen'
};

// Initialize keyboard shortcuts
export const initKeyboardShortcuts = (handlers) => {
  const handleKeyDown = (event) => {
    // Ctrl+Enter to review code
    if (event.ctrlKey && event.key === 'Enter' && handlers.reviewCode) {
      event.preventDefault();
      handlers.reviewCode();
    }

    // Ctrl+S to save code
    if (event.ctrlKey && event.key === 's' && handlers.saveCode) {
      event.preventDefault();
      handlers.saveCode();
    }

    // Ctrl+L to clear editor
    if (event.ctrlKey && event.key === 'l' && handlers.clearEditor) {
      event.preventDefault();
      handlers.clearEditor();
    }

    // Ctrl+D to toggle theme
    if (event.ctrlKey && event.key === 'd' && handlers.toggleTheme) {
      event.preventDefault();
      handlers.toggleTheme();
    }

    // Ctrl+F to toggle fullscreen
    if (event.ctrlKey && event.key === 'f' && handlers.toggleFullscreen) {
      event.preventDefault();
      handlers.toggleFullscreen();
    }

    // Esc to exit fullscreen
    if (event.key === 'Escape' && handlers.exitFullscreen) {
      handlers.exitFullscreen();
    }
  };

  // Add event listener
  window.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
};

export default initKeyboardShortcuts;
