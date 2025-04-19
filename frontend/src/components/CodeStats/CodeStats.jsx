import { useState, useEffect } from 'react';
import './CodeStats.css';

function CodeStats({ code, language }) {
  const [stats, setStats] = useState({
    lines: 0,
    characters: 0,
    words: 0,
    functions: 0
  });
  
  useEffect(() => {
    if (!code) {
      setStats({
        lines: 0,
        characters: 0,
        words: 0,
        functions: 0
      });
      return;
    }
    
    // Calculate basic stats
    const lines = code.split('\n').length;
    const characters = code.length;
    const words = code.split(/\s+/).filter(word => word.length > 0).length;
    
    // Calculate functions based on language
    let functions = 0;
    if (language === 'javascript') {
      // Count function declarations and arrow functions
      const functionMatches = code.match(/function\s+\w+\s*\(|const\s+\w+\s*=\s*\([^)]*\)\s*=>/g);
      functions = functionMatches ? functionMatches.length : 0;
    } else if (language === 'python') {
      // Count def statements
      const functionMatches = code.match(/def\s+\w+\s*\(/g);
      functions = functionMatches ? functionMatches.length : 0;
    } else if (language === 'java' || language === 'csharp') {
      // Count method declarations
      const functionMatches = code.match(/\b(public|private|protected)?\s+\w+\s+\w+\s*\([^)]*\)\s*{/g);
      functions = functionMatches ? functionMatches.length : 0;
    }
    
    setStats({
      lines,
      characters,
      words,
      functions
    });
  }, [code, language]);
  
  return (
    <div className="code-stats">
      <div className="stat-item">
        <span className="stat-label">Lines:</span>
        <span className="stat-value">{stats.lines}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Characters:</span>
        <span className="stat-value">{stats.characters}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Words:</span>
        <span className="stat-value">{stats.words}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Functions:</span>
        <span className="stat-value">{stats.functions}</span>
      </div>
    </div>
  );
}

export default CodeStats;
