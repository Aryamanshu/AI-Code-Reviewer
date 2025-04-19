// Local storage service for saving and retrieving code

const STORAGE_KEY = 'code_review_app';

// Save code to local storage
export const saveCode = (code, language) => {
  try {
    const data = {
      code,
      language,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving code to local storage:', error);
    return false;
  }
};

// Load code from local storage
export const loadCode = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading code from local storage:', error);
    return null;
  }
};

// Save code history to local storage
export const saveCodeHistory = (history) => {
  try {
    localStorage.setItem(`${STORAGE_KEY}_history`, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error saving code history to local storage:', error);
    return false;
  }
};

// Load code history from local storage
export const loadCodeHistory = () => {
  try {
    const history = localStorage.getItem(`${STORAGE_KEY}_history`);
    if (!history) return [];
    
    return JSON.parse(history);
  } catch (error) {
    console.error('Error loading code history from local storage:', error);
    return [];
  }
};

export default {
  saveCode,
  loadCode,
  saveCodeHistory,
  loadCodeHistory
};
