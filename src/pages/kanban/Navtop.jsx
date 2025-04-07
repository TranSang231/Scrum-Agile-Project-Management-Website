import React from 'react';
import "../../assets/styles/kanban/Navtop.css"; // Đường dẫn đến file CSS riêng
import UserAvatar from "../../assets/images/UserAvatar.png"; // Đường dẫn đến hình ảnh người dùng
import info from "../../assets/images/info.png"; // Đường dẫn đến hình ảnh thông tin
import alarm from "../../assets/images/alarm.png"; // Đường dẫn đến hình ảnh thông báo
import Search from "../../assets/images/search.png"; // Đường dẫn đến hình ảnh tìm kiếm

const Navtop = () => {
  return (
    <div className="navbar-top">
      <div className="search-container">
        <div className="search-icon">
        <div className="search-icon">
         <img src={Search} alt="Search Icon" className="icon-image" />
        </div>
        </div>
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      
  
        
        <div className="nav-action">
        <img src={alarm} alt="noti" className="icon-image"  width="20" height="20"   />
        </div>


        <div className="nav-action">
        <img src={info} alt="info" className="icon-image"  width="20" height="20" />
        </div>
        
        <div className="user-avatar">
        <img src={UserAvatar} alt="UserAvatar" />
        </div>

      </div>
    
  );
};

export default Navtop;