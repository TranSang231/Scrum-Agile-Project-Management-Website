import { useState, useEffect, useRef } from 'react';
import '../assets/styles/components/dropDownMenu.scss'; 

function DropdownMenu({ onEdit, onDelete, type1}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const handleToggle = (e) => {
    e.stopPropagation(); // Ngăn event click lan ra ngoài
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="dropdown-container" ref={menuRef}>
      <button className="button--icon" onClick={handleToggle}>
        {type1 === 'horizontal' ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
          </svg>
        ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
        )}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={onEdit}>Chỉnh sửa</button>
          <button onClick={onDelete}>Xóa</button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
