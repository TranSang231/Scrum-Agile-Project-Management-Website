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
    boardId: '',
    startDate: '',
    endDate: '',
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
        boardId: currentSprint.boardId || '',
        startDate: currentSprint.startDate || '',
        endDate: currentSprint.endDate || '',
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

    // Board ID validation
    if (!formData.boardId) {
      newErrors.boardId = 'Project ID is required';
    } else if (isNaN(Number(formData.boardId))) {
      newErrors.boardId = 'Project ID must be a number';
    }

    // Date validations
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
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
            Cập nhật thông tin sprint hiện tại
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

            {/* Project ID Field */}
            <div className="edit-sprint-form__field">
              <label htmlFor="boardId" className="edit-sprint-form__label">
                Origin Board / Project ID <span className="edit-sprint-form__required">*</span>
              </label>
              <input
                type="number"
                id="boardId"
                name="boardId"
                className={`edit-sprint-form__input ${errors.boardId ? 'edit-sprint-form__input--error' : ''}`}
                placeholder="Enter project ID"
                value={formData.boardId}
                onChange={handleChange}
              />
              {errors.boardId && (
                <div className="edit-sprint-form__error">{errors.boardId}</div>
              )}
            </div>

            {/* Date Fields Container */}
            <div className="edit-sprint-form__date-container">
              {/* Start Date Field */}
              <div className="edit-sprint-form__field edit-sprint-form__field--half">
                <label htmlFor="startDate" className="edit-sprint-form__label">
                  Start Date <span className="edit-sprint-form__required">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className={`edit-sprint-form__input ${errors.startDate ? 'edit-sprint-form__input--error' : ''}`}
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <div className="edit-sprint-form__error">{errors.startDate}</div>
                )}
              </div>

              {/* End Date Field */}
              <div className="edit-sprint-form__field edit-sprint-form__field--half">
                <label htmlFor="endDate" className="edit-sprint-form__label">
                  End Date <span className="edit-sprint-form__required">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className={`edit-sprint-form__input ${errors.endDate ? 'edit-sprint-form__input--error' : ''}`}
                  value={formData.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && (
                  <div className="edit-sprint-form__error">{errors.endDate}</div>
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