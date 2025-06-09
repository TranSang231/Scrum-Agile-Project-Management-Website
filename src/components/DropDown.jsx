import { useState, useEffect, useRef } from 'react';
import '../assets/styles/components/dropDown.scss';

function Dropdown({ value, options, onChange, label, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`dropdown ${className || ''}`}>
      {label && <label className="dropdown__label">{label}</label>}
      
      <div className="dropdown__selected" onClick={toggleDropdown}>
        <span className="dropdown__value">{value}</span>
        <svg 
          className={`dropdown__arrow ${isOpen ? 'dropdown__arrow--open' : ''}`} 
          viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" 
          strokeWidth="2" fill="none"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="dropdown__options">
          {options.map((option) => (
            <div 
              key={option} 
              className={`dropdown__option ${option === value ? 'dropdown__option--active' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;