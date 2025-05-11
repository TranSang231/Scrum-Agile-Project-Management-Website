import React, { useState } from 'react';
import "../../assets/styles/layouts/navTop.scss"; // Đường dẫn đến file CSS riêng
import UserAvatar from "../../assets/images/UserAvatar.png"; // Đường dẫn đến hình ảnh người dùng
import info from "../../assets/images/info.png"; // Đường dẫn đến hình ảnh thông tin
import alarm from "../../assets/images/alarm.png"; // Đường dẫn đến hình ảnh thông báo
import Search from "../../assets/images/search.png"; // Đường dẫn đến hình ảnh tìm kiếm

// Nếu có react-router-dom, bỏ comment dòng này
//import { useNavigate } from 'react-router-dom';

const Navtop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  // Nếu có react-router-dom, hãy bỏ comment dòng này
  //const navigate = useNavigate();

  const handleProfile = () => {
    console.log('Navigating to profile page');
    // Nếu có react-router-dom:
    //navigate('/profile');
    // Hoặc có thể dùng:
    window.location.href = '/profile';
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Thêm logic đăng xuất tại đây
    // Nếu có react-router-dom:
    // navigate('/login');
    // Hoặc có thể dùng:
    //window.location.href = '/login';
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
            <img src={UserAvatar} alt="UserAvatar" />
          </div>
          
          {showDropdown && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={handleProfile}>
                Profile
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navtop;