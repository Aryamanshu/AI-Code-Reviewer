import React from 'react';
import { MenuIcon, SunIcon, MoonIcon, GitHubIcon } from '../Icons/Icons';
import './Header.css';

function Header({ toggleSidebar, toggleTheme, isDarkMode }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <h1 className="app-title">Code Review</h1>
      </div>
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {isDarkMode ? (
            React.createElement(React.Fragment, null, [
              React.createElement(SunIcon, { key: 'icon' }),
              React.createElement('span', { key: 'label', className: 'theme-label' }, 'Light Mode')
            ])
          ) : (
            React.createElement(React.Fragment, null, [
              React.createElement(MoonIcon, { key: 'icon' }),
              React.createElement('span', { key: 'label', className: 'theme-label' }, 'Dark Mode')
            ])
          )}
        </button>
        <a href="https://github.com/Aryamanshu" target="_blank" rel="noopener noreferrer" className="github-link">
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
}

export default Header;
