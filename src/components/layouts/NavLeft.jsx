import React from 'react';
import "../../assets/styles/layouts/navLeft.scss"; 
import { useNavigate } from 'react-router-dom';

const NavLeft = ({ activeView, setActiveView }) => {
  const navigate = useNavigate(); 
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { id: 'project', label: 'Project', icon: 'project', path: '/project' },
    { id: 'backlog', label: 'Backlog', icon: 'calendar', path: '/backlog' },
    { id: 'kanban', label: 'Kanban', icon: 'layers', path: '/kanban' },
    { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
  ];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />  
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        );
    
      case 'project':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        );
      case 'calendar':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case 'layers':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 2H8a2 2 0 0 0-2 2v3h12V4a2 2 0 0 0-2-2z" />
          </svg>
        );
      case 'settings':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'log-out':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleNavigation = (item) => () => {
    setActiveView(item.id);
    navigate(item.path);
  }

  const handleLogout = () => {
    // Xóa token và thông tin đăng nhập
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  return (
    <div className="navbar-left">
      <div className="navbar-content">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={handleNavigation(item)}
          >
            <div className="nav-icon">
              {renderIcon(item.icon)}
            </div>
            <div className="nav-title">{item.label}</div>
          </div>
        ))}
      </div>
      
      <div className="navbar-footer">
        <div className="nav-item" onClick={handleLogout}>
          <div className="nav-icon">
            {renderIcon('log-out')}
          </div>
          <div className="nav-title">Log out</div>
        </div>
      </div>
    </div>
  );
};

export default NavLeft;