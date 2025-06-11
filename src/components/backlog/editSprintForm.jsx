import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/components/backlog/editSprintForm.scss';

/**
 * Edit Sprint Form Component
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Object} props.currentSprint - Sprint data to edit
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onSave - Handler for saving changes
 */
const EditSprintForm = ({ isOpen, currentSprint, onClose, onSave }) => {
  // Form state initialized with current sprint data or defaults
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    goal: ''
  });
  
  // Track validation errors
  const [errors, setErrors] = useState({});
  // Track if form is valid
  const [formValid, setFormValid] = useState(false);
  
  // Refs for focus management
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastButtonRef = useRef(null);
  
  // Populate form with current sprint data when modal opens or sprint changes
  useEffect(() => {
    if (isOpen && currentSprint) {
      setFormData({
        name: currentSprint.name || '',
        start_date: currentSprint.start_date || '',
        end_date: currentSprint.end_date || '',
        goal: currentSprint.goal || ''
      });
    }
  }, [isOpen, currentSprint]);

  // Focus management: focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard handler for ESC key and focus trap
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      // Close modal on ESC
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Trap focus within modal
      if (e.key === 'Tab') {
        // If shift+tab on first element, focus last element
        if (e.shiftKey && document.activeElement === closeButtonRef.current) {
          e.preventDefault();
          lastButtonRef.current.focus();
        }
        
        // If tab on last element, focus first element
        if (!e.shiftKey && document.activeElement === lastButtonRef.current) {
          e.preventDefault();
          closeButtonRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Form validation
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Sprint Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Sprint name is required';
    }

    // Date validations
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    } else if (formData.start_date && new Date(formData.end_date) < new Date(formData.start_date)) {
      newErrors.end_date = 'End date must be after start date';
    }

    // Goal validation (optional but with character limit)
    if (formData.goal && formData.goal.length > 255) {
      newErrors.goal = 'Sprint goal must be less than 255 characters';
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      onSave(formData);
    }
  };
  
  // Click outside to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-sprint-modal" onClick={handleBackdropClick}>
      <div 
        className="edit-sprint-modal__content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-sprint-title"
        aria-describedby="edit-sprint-desc"
      >
        {/* Modal Header */}
        <div className="edit-sprint-modal__header">
          <h2 id="edit-sprint-title" className="edit-sprint-modal__title">Edit Sprint</h2>
          <button 
            className="edit-sprint-modal__close" 
            onClick={onClose}
            aria-label="Close modal"
            ref={closeButtonRef}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="edit-sprint-modal__body">
          <p id="edit-sprint-desc" className="edit-sprint-modal__description">
            Update sprint information
          </p>
          
          <form className="edit-sprint-form" onSubmit={handleSubmit}>
            {/* Sprint Name Field */}
            <div className="edit-sprint-form__field">
              <label htmlFor="name" className="edit-sprint-form__label">
                Sprint Name <span className="edit-sprint-form__required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                ref={firstInputRef}
                className={`edit-sprint-form__input ${errors.name ? 'edit-sprint-form__input--error' : ''}`}
                placeholder="Enter sprint name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="edit-sprint-form__error">{errors.name}</div>
              )}
            </div>

            {/* Date Fields Container */}
            <div className="edit-sprint-form__date-container">
              {/* Start Date Field */}
              <div className="edit-sprint-form__field edit-sprint-form__field--half">
                <label htmlFor="start_date" className="edit-sprint-form__label">
                  Start Date <span className="edit-sprint-form__required">*</span>
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  className={`edit-sprint-form__input ${errors.start_date ? 'edit-sprint-form__input--error' : ''}`}
                  value={formData.start_date}
                  onChange={handleChange}
                />
                {errors.start_date && (
                  <div className="edit-sprint-form__error">{errors.start_date}</div>
                )}
              </div>

              {/* End Date Field */}
              <div className="edit-sprint-form__field edit-sprint-form__field--half">
                <label htmlFor="end_date" className="edit-sprint-form__label">
                  End Date <span className="edit-sprint-form__required">*</span>
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  className={`edit-sprint-form__input ${errors.end_date ? 'edit-sprint-form__input--error' : ''}`}
                  value={formData.end_date}
                  onChange={handleChange}
                />
                {errors.end_date && (
                  <div className="edit-sprint-form__error">{errors.end_date}</div>
                )}
              </div>
            </div>

            {/* Sprint Goal Field */}
            <div className="edit-sprint-form__field">
              <label htmlFor="goal" className="edit-sprint-form__label">Sprint Goal</label>
              <textarea
                id="goal"
                name="goal"
                className={`edit-sprint-form__textarea ${errors.goal ? 'edit-sprint-form__textarea--error' : ''}`}
                placeholder="Enter sprint goal (max 255 characters)"
                value={formData.goal}
                onChange={handleChange}
                maxLength={255}
                rows={4}
              ></textarea>
              <div className="edit-sprint-form__char-count">
                {formData.goal.length}/255
              </div>
              {errors.goal && (
                <div className="edit-sprint-form__error">{errors.goal}</div>
              )}
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="edit-sprint-modal__footer">
          <button 
            className="edit-sprint-modal__button edit-sprint-modal__button--secondary" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="edit-sprint-modal__button edit-sprint-modal__button--primary"
            onClick={handleSubmit}
            disabled={!formValid}
            ref={lastButtonRef}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSprintForm;