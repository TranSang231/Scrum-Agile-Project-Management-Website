import React, { useState } from 'react';
import '../../assets/styles/components/project/createProjectForm.scss';

const CreateProjectForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        project_type: 'web',
        goal: '',
        client: '',
        start_date: '',
        end_date: '',
        team_size: 1,
        status: 'active',
        priority: 'medium',
        domain: 'other',
        budget: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            id: Date.now()
        });
        onClose();
    };

    return (
        <div className="create-project-form">
            <div className="create-project-form__overlay" onClick={onClose}></div>
            <div className="create-project-form__content">
                <div className="create-project-form__header">
                    <h2 className="create-project-form__title">Create New Project</h2>
                    <button className="create-project-form__close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="create-project-form__body">
                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Project Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="create-project-form__input"
                            required
                        />
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="create-project-form__textarea"
                            rows="4"
                        />
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Project Type</label>
                        <select
                            name="project_type"
                            value={formData.project_type}
                            onChange={handleChange}
                            className="create-project-form__input"
                        >
                            <option value="web">Web Application</option>
                            <option value="mobile">Mobile Application</option>
                            <option value="desktop">Desktop Application</option>
                            <option value="api">API/Backend</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Goal</label>
                        <textarea
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            className="create-project-form__textarea"
                            rows="3"
                        />
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Client</label>
                        <input
                            type="text"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="create-project-form__input"
                        />
                    </div>

                    <div className="create-project-form__row">
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                className="create-project-form__input"
                                required
                            />
                        </div>

                        <div className="create-project-form__group">
                            <label className="create-project-form__label">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="create-project-form__input"
                                required
                            />
                        </div>
                    </div>

                    <div className="create-project-form__row">
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Team Size</label>
                            <input
                                type="number"
                                name="team_size"
                                value={formData.team_size}
                                onChange={handleChange}
                                className="create-project-form__input"
                                min="1"
                                required
                            />
                        </div>

                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Budget</label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="create-project-form__input"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="create-project-form__row">
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="create-project-form__input"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Domain</label>
                            <select
                                name="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                className="create-project-form__input"
                            >
                                <option value="education">Education</option>
                                <option value="health">Health</option>
                                <option value="finance">Finance</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="create-project-form__textarea"
                            rows="3"
                        />
                    </div>

                    <div className="create-project-form__actions">
                        <button type="button" className="create-project-form__cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="create-project-form__submit">
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectForm; 