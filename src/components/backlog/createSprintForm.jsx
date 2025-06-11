import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/components/backlog/createSprintForm.scss';

const CreateSprintForm = ({ isOpen, onClose, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    goal: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  // Refs
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        goal: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Validate form on data change
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Sprint Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Sprint name is required';
    }

    // Start Date
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    // End Date validation
    if (!formData.end_date) {
      newErrors.end_date = 'End date is required';
    } else if (formData.start_date && new Date(formData.end_date) < new Date(formData.start_date)) {
      newErrors.end_date = 'End date must be after start date';
    }

    // Sprint Goal validation
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
      onSubmit(formData);
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
    <div className="create-sprint-modal" onClick={handleBackdropClick}>
      <div 
        className="create-sprint-modal__content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="create-sprint-modal__header">
          <h2 id="modal-title" className="create-sprint-modal__title">Create New Sprint</h2>
          <button 
            className="create-sprint-modal__close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div id="modal-description" className="create-sprint-modal__body">
          <form className="create-sprint-form" onSubmit={handleSubmit}>
            {/* Sprint Name Field */}
            <div className="create-sprint-form__field">
              <label htmlFor="name" className="create-sprint-form__label">
                Sprint Name <span className="create-sprint-form__required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                ref={firstInputRef}
                className={`create-sprint-form__input ${errors.name ? 'create-sprint-form__input--error' : ''}`}
                placeholder="Enter sprint name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="create-sprint-form__error">{errors.name}</div>
              )}
            </div>

            {/* Date Fields Container */}
            <div className="create-sprint-form__date-container">
              {/* Start Date Field */}
              <div className="create-sprint-form__field create-sprint-form__field--half">
                <label htmlFor="start_date" className="create-sprint-form__label">
                  Start Date <span className="create-sprint-form__required">*</span>
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  className={`create-sprint-form__input ${errors.start_date ? 'create-sprint-form__input--error' : ''}`}
                  value={formData.start_date}
                  onChange={handleChange}
                />
                {errors.start_date && (
                  <div className="create-sprint-form__error">{errors.start_date}</div>
                )}
              </div>

              {/* End Date Field */}
              <div className="create-sprint-form__field create-sprint-form__field--half">
                <label htmlFor="end_date" className="create-sprint-form__label">
                  End Date <span className="create-sprint-form__required">*</span>
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  className={`create-sprint-form__input ${errors.end_date ? 'create-sprint-form__input--error' : ''}`}
                  value={formData.end_date}
                  onChange={handleChange}
                />
                {errors.end_date && (
                  <div className="create-sprint-form__error">{errors.end_date}</div>
                )}
              </div>
            </div>

            {/* Sprint Goal Field */}
            <div className="create-sprint-form__field">
              <label htmlFor="goal" className="create-sprint-form__label">Sprint Goal</label>
              <textarea
                id="goal"
                name="goal"
                className={`create-sprint-form__textarea ${errors.goal ? 'create-sprint-form__textarea--error' : ''}`}
                placeholder="Enter sprint goal (max 255 characters)"
                value={formData.goal}
                onChange={handleChange}
                maxLength={255}
                rows={4}
              ></textarea>
              <div className="create-sprint-form__char-count">
                {formData.goal.length}/255
              </div>
              {errors.goal && (
                <div className="create-sprint-form__error">{errors.goal}</div>
              )}
            </div>
          </form>
        </div>

        <div className="create-sprint-modal__footer">
          <button 
            className="create-sprint-modal__button create-sprint-modal__button--secondary" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="create-sprint-modal__button create-sprint-modal__button--primary"
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Create Sprint
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSprintForm;