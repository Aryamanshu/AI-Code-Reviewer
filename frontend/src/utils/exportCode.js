// Utility for exporting code to different formats

// Export code as a file
export const exportAsFile = (code, language) => {
  // Determine file extension based on language
  const fileExtensions = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    csharp: 'cs',
    cpp: 'cpp'
  };
  
  const extension = fileExtensions[language] || 'txt';
  const filename = `code-export.${extension}`;
  
  // Create a blob with the code
  const blob = new Blob([code], { type: 'text/plain' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Copy code to clipboard
export const copyToClipboard = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

export default {
  exportAsFile,
  copyToClipboard
};
