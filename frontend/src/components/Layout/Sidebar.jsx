import React, { useState } from 'react';
import { HistoryIcon, SettingsIcon } from '../Icons/Icons';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <ul className="sidebar-tabs">
          {tabs.map(tab => (
            <li
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="tab-icon">
                {tab.icon === 'history' && <HistoryIcon />}
                {tab.icon === 'settings' && <SettingsIcon />}
              </div>
              {isOpen && <span className="tab-label">{tab.label}</span>}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-content">
        {activeTab === 'history' && isOpen && (
          <div className="history-panel">
            <h3>Recent Code</h3>
            <div className="empty-state">
              <p>No recent code reviews yet</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && isOpen && (
          <div className="settings-panel">
            <h3>Settings</h3>
            <div className="setting-group">
              <label className="setting-label">Editor Font Size</label>
              <select className="setting-select" defaultValue="16px">
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
              </select>
            </div>
            <div className="setting-group">
              <label className="setting-label">Tab Size</label>
              <select className="setting-select" defaultValue="4 spaces">
                <option value="2 spaces">2 spaces</option>
                <option value="4 spaces">4 spaces</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
