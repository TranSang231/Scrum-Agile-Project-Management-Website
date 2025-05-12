import React, { useState } from 'react';
import "../../assets/styles/pages/project/createProjectForm.scss";

// Mock choices - these should come from your backend or constants file
const PROJECT_TYPE_CHOICES = [
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile Application' },
  { value: 'desktop', label: 'Desktop Software' },
  { value: 'ai', label: 'AI/Machine Learning' },
  { value: 'iot', label: 'IoT Solution' },
  { value: 'other', label: 'Other' },
];

const STATUS_CHOICES = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const PRIORITY_CHOICES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const DOMAIN_CHOICES = [
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

// Mock users - in a real app, these would come from an API
const MOCK_USERS = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Robert Johnson' },
  { id: 4, name: 'Emily Davis' },
];

const CreateProjectForm = ({ onClose, onSubmit, currentUser }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    project_type: 'web',
    goal: '',
    client: '',
    status: 'not_started',
    priority: 'medium',
    domain: 'other',
    start_date: '',
    end_date: '',
    product_owner: currentUser?.id || '', // Default to current user
    scrum_master: '',
    team_members: [],
    team_size: 0,
    budget: 0,
    notes: '',
  });
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [memberSearch, setMemberSearch] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Ensure numeric fields are numbers
    setProjectData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: 'Please select a valid image (JPG, PNG, GIF)',
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: 'Image size should be less than 5MB',
      }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setThumbnailFile(file);
    
    // Clear thumbnail error
    setErrors((prev) => ({
      ...prev,
      thumbnail: '',
    }));
  };

  const removeImage = () => {
    setThumbnailPreview(null);
    setThumbnailFile(null);
  };

  const toggleTeamMember = (userId) => {
    setProjectData(prev => {
      const newMembers = prev.team_members.includes(userId)
        ? prev.team_members.filter(id => id !== userId)
        : [...prev.team_members, userId];
      
      return {
        ...prev,
        team_members: newMembers,
        team_size: newMembers.length, // Update team size automatically
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!projectData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    if (!projectData.client.trim()) {
      newErrors.client = 'Client name is required';
    }
    if (!projectData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    if (!projectData.end_date) {
      newErrors.end_date = 'End date is required';
    } else if (
      projectData.start_date &&
      new Date(projectData.end_date) < new Date(projectData.start_date)
    ) {
      newErrors.end_date = 'End date must be after start date';
    }
    if (!projectData.product_owner) {
      newErrors.product_owner = 'Product owner is required';
    }
    if (!projectData.scrum_master) {
      newErrors.scrum_master = 'Scrum master is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Create a completed project data object
    const finalProjectData = {
      ...projectData,
      thumbnail: thumbnailPreview, // Use the base64 string for the mock data
      created_by: currentUser?.id, // Set the creator to current user
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSubmit(finalProjectData);
  };

  // Filter users for search
  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="create-project-overlay">
      <div className="create-project-modal">
        <div className="create-project-modal__header">
          <h2 className="create-project-modal__title">Create New Project</h2>
          <button
            className="create-project-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form className="create-project-form" onSubmit={handleSubmit}>
          <div className="create-project-form__group">
            <label htmlFor="name" className="create-project-form__label">
              Project Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`create-project-form__input ${errors.name ? 'error' : ''}`}
              value={projectData.name}
              onChange={handleChange}
              placeholder="Enter project name"
            />
            {errors.name && <div className="create-project-form__error">{errors.name}</div>}
          </div>

          <div className="create-project-form__group">
            <label htmlFor="description" className="create-project-form__label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="create-project-form__textarea"
              value={projectData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="3"
            />
          </div>

          <div className="create-project-form__row">
            <div className="create-project-form__group">
              <label htmlFor="project_type" className="create-project-form__label">
                Project Type
              </label>
              <select
                id="project_type"
                name="project_type"
                className="create-project-form__select"
                value={projectData.project_type}
                onChange={handleChange}
              >
                {PROJECT_TYPE_CHOICES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-project-form__group">
              <label htmlFor="domain" className="create-project-form__label">
                Domain
              </label>
              <select
                id="domain"
                name="domain"
                className="create-project-form__select"
                value={projectData.domain}
                onChange={handleChange}
              >
                {DOMAIN_CHOICES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="create-project-form__group">
            <label htmlFor="goal" className="create-project-form__label">
              Project Goal
            </label>
            <input
              type="text"
              id="goal"
              name="goal"
              className="create-project-form__input"
              value={projectData.goal}
              onChange={handleChange}
              placeholder="Enter project goal"
            />
          </div>

          <div className="create-project-form__group">
            <label htmlFor="client" className="create-project-form__label">
              Client Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="client"
              name="client"
              className={`create-project-form__input ${errors.client ? 'error' : ''}`}
              value={projectData.client}
              onChange={handleChange}
              placeholder="Enter client name"
            />
            {errors.client && <div className="create-project-form__error">{errors.client}</div>}
          </div>

          <div className="create-project-form__row">
            <div className="create-project-form__group">
              <label htmlFor="start_date" className="create-project-form__label">
                Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className={`create-project-form__input ${errors.start_date ? 'error' : ''}`}
                value={projectData.start_date}
                onChange={handleChange}
              />
              {errors.start_date && (
                <div className="create-project-form__error">{errors.start_date}</div>
              )}
            </div>

            <div className="create-project-form__group">
              <label htmlFor="end_date" className="create-project-form__label">
                End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className={`create-project-form__input ${errors.end_date ? 'error' : ''}`}
                value={projectData.end_date}
                onChange={handleChange}
              />
              {errors.end_date && (
                <div className="create-project-form__error">{errors.end_date}</div>
              )}
            </div>
          </div>

          <div className="create-project-form__row">
            <div className="create-project-form__group">
              <label htmlFor="status" className="create-project-form__label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="create-project-form__select"
                value={projectData.status}
                onChange={handleChange}
              >
                {STATUS_CHOICES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-project-form__group">
              <label htmlFor="priority" className="create-project-form__label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="create-project-form__select"
                value={projectData.priority}
                onChange={handleChange}
              >
                {PRIORITY_CHOICES.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="create-project-form__row">
            <div className="create-project-form__group">
              <label htmlFor="product_owner" className="create-project-form__label">
                Product Owner <span className="required">*</span>
              </label>
              <select
                id="product_owner"
                name="product_owner"
                className={`create-project-form__select ${errors.product_owner ? 'error' : ''}`}
                value={projectData.product_owner}
                onChange={handleChange}
              >
                <option value="">Select Product Owner</option>
                {MOCK_USERS.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.product_owner && (
                <div className="create-project-form__error">{errors.product_owner}</div>
              )}
            </div>

            <div className="create-project-form__group">
              <label htmlFor="scrum_master" className="create-project-form__label">
                Scrum Master <span className="required">*</span>
              </label>
              <select
                id="scrum_master"
                name="scrum_master"
                className={`create-project-form__select ${errors.scrum_master ? 'error' : ''}`}
                value={projectData.scrum_master}
                onChange={handleChange}
              >
                <option value="">Select Scrum Master</option>
                {MOCK_USERS.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.scrum_master && (
                <div className="create-project-form__error">{errors.scrum_master}</div>
              )}
            </div>
          </div>

          <div className="create-project-form__group">
            <label className="create-project-form__label">
              Team Members
            </label>
            <div className="create-project-form__team-members">
              <input
                type="text"
                className="create-project-form__input"
                placeholder="Search team members..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
              />
              
              <div className="create-project-form__member-list">
                {filteredUsers.map(user => (
                  <div key={user.id} className="create-project-form__member-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={projectData.team_members.includes(user.id)}
                        onChange={() => toggleTeamMember(user.id)}
                      />
                      {user.name}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="create-project-form__selected-members">
                {projectData.team_members.length > 0 ? (
                  <>
                    <span>Selected: </span>
                    {projectData.team_members.map(id => {
                      const user = MOCK_USERS.find(u => u.id === id);
                      return user ? (
                        <span key={id} className="create-project-form__member-tag">
                          {user.name}
                        </span>
                      ) : null;
                    })}
                  </>
                ) : (
                  <span>No team members selected</span>
                )}
              </div>
            </div>
          </div>

          <div className="create-project-form__row">
            <div className="create-project-form__group">
              <label htmlFor="team_size" className="create-project-form__label">
                Team Size
              </label>
              <input
                type="number"
                id="team_size"
                name="team_size"
                className="create-project-form__input"
                value={projectData.team_size}
                onChange={handleNumberChange}
                min="0"
                disabled // Auto-calculated from team members
              />
            </div>

            <div className="create-project-form__group">
              <label htmlFor="budget" className="create-project-form__label">
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                className="create-project-form__input"
                value={projectData.budget}
                onChange={handleNumberChange}
                min="0"
                step="1000"
              />
            </div>
          </div>

          <div className="create-project-form__group">
            <label htmlFor="notes" className="create-project-form__label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              className="create-project-form__textarea"
              value={projectData.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
              rows="2"
            />
          </div>

          <div className="create-project-form__group">
            <label className="create-project-form__label">
              Project Thumbnail
            </label>
            
            <div className="create-project-form__thumbnail-container">
              {thumbnailPreview ? (
                <div className="create-project-form__thumbnail-preview">
                  <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="create-project-form__preview-image"
                  />
                  <button 
                    type="button"
                    className="create-project-form__remove-image"
                    onClick={removeImage}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="create-project-form__upload">
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    className="create-project-form__file-input"
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                  />
                  <label htmlFor="thumbnail" className="create-project-form__upload-label">
                    <svg className="create-project-form__upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Choose image</span>
                  </label>
                  <p className="create-project-form__file-help">
                    JPG, PNG or GIF. Max size 5MB
                  </p>
                </div>
              )}
              {errors.thumbnail && (
                <div className="create-project-form__error">{errors.thumbnail}</div>
              )}
            </div>
          </div>

          <div className="create-project-form__actions">
            <button
              type="button"
              className="create-project-form__button create-project-form__button--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-project-form__button create-project-form__button--submit"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;