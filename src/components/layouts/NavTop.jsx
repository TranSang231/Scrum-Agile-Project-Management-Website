import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/layouts/navTop.scss"; // Đường dẫn đến file CSS riêng
import UserAvatar from "../../assets/images/UserAvatar.png"; // Đường dẫn đến hình ảnh người dùng
import info from "../../assets/images/info.png"; // Đường dẫn đến hình ảnh thông tin
import alarm from "../../assets/images/alarm.png"; // Đường dẫn đến hình ảnh thông báo
import Search from "../../assets/images/search.png"; // Đường dẫn đến hình ảnh tìm kiếm
import logoutIcon from "../../assets/images/logout.png"; // Thêm đường dẫn đến icon logout
import { useAuth } from '../../contexts/AuthContext';

const Navtop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  const handleProfile = (e) => {
    e.stopPropagation();
    navigate('/profile');
    setShowDropdown(false);
  };
  
  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    navigate('/login');
  };
  
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Hiển thị tên người dùng
  const displayName = user ? (
    user.first_name && user.last_name 
      ? `${user.first_name} ${user.last_name}`
      : user.email
  ) : 'Guest';
  
  return (
    <div className="navtop">
      <div className="navtop-left">
        <div className="search-box">
          <img src={Search} alt="search" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navtop-right">
        <div className="notification">
          <img src={alarm} alt="notification" />
        </div>
        <div className="info">
          <img src={info} alt="info" />
        </div>
        <div className="user" ref={dropdownRef}>
          <div className="user-info" onClick={toggleDropdown}>
            <img 
              src={user?.avatar_url || UserAvatar} 
              alt="user"
              className="user-avatar"
            />
            <span className="user-name">{displayName}</span>
          </div>
          {showDropdown && (
            <div className="dropdown">
              <div 
                className="dropdown-item" 
                onClick={handleProfile}
                role="button"
                tabIndex={0}
              >
                <img 
                  src={user?.avatar_url || UserAvatar} 
                  alt="profile"
                  className="dropdown-avatar"
                />
                <span>Profile</span>
              </div>
              <div 
                className="dropdown-item" 
                onClick={handleLogout}
                role="button"
                tabIndex={0}
              >
                <img 
                  src={logoutIcon} 
                  alt="logout"
                  className="dropdown-icon"
                />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navtop;