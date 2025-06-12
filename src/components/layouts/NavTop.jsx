import React, { useState, useEffect } from 'react';
import "../../assets/styles/layouts/navTop.scss"; // Đường dẫn đến file CSS riêng
import UserAvatar from "../../assets/images/UserAvatar.png"; // Đường dẫn đến hình ảnh người dùng
import info from "../../assets/images/info.png"; // Đường dẫn đến hình ảnh thông tin
import alarm from "../../assets/images/alarm.png"; // Đường dẫn đến hình ảnh thông báo
import Search from "../../assets/images/search.png"; // Đường dẫn đến hình ảnh tìm kiếm
import logoutIcon from "../../assets/images/logout.png"; // Thêm đường dẫn đến icon logout

// Nếu có react-router-dom, bỏ comment dòng này
//import { useNavigate } from 'react-router-dom';

const Navtop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    avatarUrl: UserAvatar,
    role: 'User'
  });
  
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user-profile/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const profile = data[0];
          setUserData({
            fullName: profile.full_name || '',
            email: profile.email || '',
            avatarUrl: profile.avatar_url || UserAvatar,
            role: profile.role || 'User'
          });
        }
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  const handleProfile = () => {
    window.location.href = '/profile';
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleClickOutside = (e) => {
    if (!e.target.closest('.user-avatar-container')) {
      setShowDropdown(false);
    }
  };
  
  React.useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);
  
  return (
    <div className="navbar-top">
      <div className="search-container">
        <div className="search-icon">
          <img src={Search} alt="Search Icon" className="icon-image" />
        </div>
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      
      <div className="navbar-actions-container">
        <div className="nav-action">
          <img src={alarm} alt="noti" className="icon-image" />
        </div>
        <div className="nav-action">
          <img src={info} alt="info" className="icon-image" />
        </div>
        
        <div className="user-avatar-container">
          <div className="user-avatar" onClick={toggleDropdown}>
            <img src={userData.avatarUrl} alt="UserAvatar" />
          </div>
          
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-user-avatar">
                  <img src={userData.avatarUrl} alt="UserAvatar" />
                </div>
                <div className="dropdown-user-info">
                  <div className="dropdown-username">{userData.fullName}</div>
                  <div className="dropdown-user-role">{userData.role}</div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item" onClick={handleProfile}>
                <div className="dropdown-item-icon">
                  <img src={UserAvatar} alt="Profile" className="dropdown-icon-image" />
                </div>
                <span>Profile</span>
              </button>
              
              <button className="dropdown-item" onClick={handleLogout}>
                <div className="dropdown-item-icon">
                  <img src={logoutIcon} alt="Logout" className="dropdown-icon-image" />
                </div>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navtop;