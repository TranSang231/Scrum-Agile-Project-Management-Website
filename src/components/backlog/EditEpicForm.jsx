import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/styles/components/backlog/editEpicForm.scss';
import RecentEmails from '../project/RecentEmail';

// API base URL - should match the one in BacklogColumn
const API_URL = 'http://localhost:8000/api';

function EditEpicForm({
    epic,
    onSave,
    onCancel,
    isCreating = false,
    projects = [],
    users = [],
    currentUser = null
}) {
    const [editedEpic, setEditedEpic] = useState({
        ...(isCreating ? {
            // Remove client-side ID generation, backend will create ID
            name: '',
            description: '',
            project: '',
            status: 'not_started',
            created_by: '',
        } : {
            ...epic,
        })
    });

    const [validationError, setValidationError] = useState('');
    const [loading, setLoading] = useState(false);

    // State for creator email input
    const [creatorInput, setCreatorInput] = useState('');
    const [showRecentCreator, setShowRecentCreator] = useState(false);
    const [recentEmails, setRecentEmails] = useState([]);

    // Reference for detecting clicks outside dropdown
    const creatorRef = useRef(null);

    // Fetch user emails for suggestions
    useEffect(() => {
        const fetchUserEmails = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/`);
                // Extract emails from users
                const emails = response.data.map(user =>
                    user.email || `${user.username}@example.com`
                );
                setRecentEmails(emails);
            } catch (error) {
                console.error("Failed to fetch user emails:", error);
            }
        };

        fetchUserEmails();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (creatorRef.current && !creatorRef.current.contains(e.target)) {
                setShowRecentCreator(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEpic(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error when user makes changes
        if (name === 'name' && value.trim()) {
            setValidationError('');
        }
    };

    // Handle email input changes
    const handleEmailInputChange = (e) => {
        setCreatorInput(e.target.value);
    };

    // Handle email selection from dropdown
    const handleEmailSelection = (email) => {
        setEditedEpic(prev => ({
            ...prev,
            created_by: email
        }));
        setCreatorInput('');
        setShowRecentCreator(false);
    };

    // Remove email from tag
    const removeEmail = () => {
        setEditedEpic(prev => ({
            ...prev,
            created_by: ''
        }));
    };

    // Handle adding email on Enter key
    const handleEmailKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const email = creatorInput.trim();
            if (email) {
                setEditedEpic(prev => ({
                    ...prev,
                    created_by: email
                }));
                setCreatorInput('');
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate data
        if (!editedEpic.name.trim()) {
            setValidationError('Epic name is required');
            setLoading(false);
            return;
        }

        if (!editedEpic.project) {
            setValidationError('Please select a project');
            setLoading(false);
            return;
        }

        try {
            // Handle email to user ID conversion if needed
            let finalData = { ...editedEpic };

            if (finalData.created_by && finalData.created_by.includes('@')) {
                try {
                    // Try to get user by email
                    const response = await axios.get(`${API_URL}/users/by-email/${encodeURIComponent(finalData.created_by)}/`);
                    if (response.data && response.data.id) {
                        finalData.created_by = response.data.id;
                    }
                } catch (err) {
                    console.error("Error looking up user by email:", err);
                    // Continue with email as is - backend will handle it
                }
            }

            // Pass to parent component for saving to API
            onSave(finalData);
        } catch (error) {
            console.error("Error processing form:", error);
            setValidationError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-epic-form">
            <div className="create-epic-form__overlay" onClick={onCancel}></div>
            <div className="create-epic-form__content">
                <div className="create-epic-form__header">
                    <h2 className="create-epic-form__title">
                        {isCreating ? 'Create Epic' : 'Edit Epic'}
                    </h2>
                    <button className="create-epic-form__close" onClick={onCancel}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="create-epic-form__body">
                    {/* Project Selection */}
                    <div className="create-epic-form__group">
                        <label className="create-epic-form__label">Project</label>
                        <select
                            name="project"
                            value={editedEpic.project}
                            onChange={handleChange}
                            className="create-epic-form__select"
                            required
                            disabled={loading}
                        >
                            <option value="">Select Project</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Epic Name */}
                    <div className="create-epic-form__group">
                        <label className="create-epic-form__label">Epic Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedEpic.name}
                            onChange={handleChange}
                            className="create-epic-form__input"
                            placeholder="Enter epic name"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Description */}
                    <div className="create-epic-form__group">
                        <label className="create-epic-form__label">Description</label>
                        <textarea
                            name="description"
                            value={editedEpic.description}
                            onChange={handleChange}
                            className="create-epic-form__textarea"
                            placeholder="Describe the epic"
                            rows="4"
                            disabled={loading}
                        />
                    </div>

                    {/* Status */}
                    <div className="create-epic-form__group">
                        <label className="create-epic-form__label">Status</label>
                        <select
                            name="status"
                            value={editedEpic.status}
                            onChange={handleChange}
                            className="create-epic-form__select"
                            disabled={loading}
                        >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Creator as email tag */}
                    <div className="create-epic-form__group" ref={creatorRef}>
                        <label className="create-epic-form__label">Creator (Email)</label>
                        <div className="create-epic-form__tags-input-container">
                            <div className="create-epic-form__tags-area">
                                {editedEpic.created_by && (
                                    <span className="create-epic-form__tag">
                                        {editedEpic.created_by}
                                        <button
                                            type="button"
                                            className="create-epic-form__tag-remove"
                                            onClick={removeEmail}
                                            disabled={loading}
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {!editedEpic.created_by && (
                                    <input
                                        type="text"
                                        name="creatorInput"
                                        value={creatorInput}
                                        onChange={handleEmailInputChange}
                                        onFocus={() => setShowRecentCreator(true)}
                                        className="create-epic-form__tag-input"
                                        placeholder="Type creator email"
                                        onKeyDown={handleEmailKeyDown}
                                        disabled={loading}
                                    />
                                )}
                            </div>
                        </div>

                        {showRecentCreator && !editedEpic.created_by && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={creatorInput}
                                onSelect={handleEmailSelection}
                                loading={loading}
                            />
                        )}
                    </div>

                    {/* Validation Error Display */}
                    {validationError && (
                        <div className="create-epic-form__error">
                            {validationError}
                        </div>
                    )}

                    <div className="create-epic-form__actions">
                        <button
                            type="button"
                            className="create-epic-form__cancel"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="create-epic-form__submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : isCreating ? 'Create Epic' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEpicForm;