import React from 'react';
import '../../assets/styles/backlog/Navbar-left.css'

const NavbarLeft = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M3 6L21 6 21 8 3 8z M3 11L21 11 21 13 3 13z M3 16L21 16 21 18 3 18z" />
        </svg>
      </div>

      <div className="sidebar-top">
        <div className="sidebar-item">
          <div className="sidebar-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="sidebar-text">Project</span>
        </div>

        <div className="sidebar-item active">
          <div className="sidebar-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="sidebar-text">Backlog</span>
        </div>

        <div className="sidebar-item">
          <div className="sidebar-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" />
              <line x1="7" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="sidebar-text">Kanban</span>
        </div>

        <div className="sidebar-item">
          <div className="sidebar-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <span className="sidebar-text">Settings</span>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-item">
          <div className="sidebar-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="16 17 21 12 16 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="sidebar-text">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarLeft;