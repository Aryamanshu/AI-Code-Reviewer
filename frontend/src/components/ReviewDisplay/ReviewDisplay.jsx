import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Prism from 'prismjs';
import { copyToClipboard } from '../../utils/exportCode';
import 'highlight.js/styles/github-dark.css';
import './ReviewDisplay.css';

function ReviewDisplay({ review, isLoading, error }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize Prism when the component mounts
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // Re-initialize Prism when the review content changes
  useEffect(() => {
    if (review && !isLoading) {
      // Small delay to ensure the DOM is updated
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
    }
  }, [review, isLoading]);

  // Reset copy success message after 2 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCopyReview = async () => {
    if (review) {
      const success = await copyToClipboard(review);
      if (success) {
        setCopySuccess(true);
      }
    }
  };

  return (
    <div className={`review-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="review-header">
        <h2 className="review-title">Code Review</h2>
        <div className="review-actions">
          <button
            className="fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            )}
          </button>
          <button
            className="copy-btn"
            onClick={handleCopyReview}
            title="Copy to Clipboard"
            disabled={!review || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          {copySuccess && (
            <div className="copy-success-tooltip">Copied!</div>
          )}
        </div>
      </div>

      <div className="review-content">
        {error && (
          <div className="review-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="review-loading">
            <div className="loading-spinner"></div>
            <p>Analyzing your code...</p>
          </div>
        )}

        {!isLoading && !error && review ? (
          <div className="markdown-content">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          </div>
        ) : !isLoading && !error ? (
          <div className="review-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <p>Enter your code and click "Review Code" to get feedback</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ReviewDisplay;
