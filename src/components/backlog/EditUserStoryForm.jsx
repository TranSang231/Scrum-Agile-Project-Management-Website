import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/styles/components/backlog/editUserStoryForm.scss';
import RecentEmails from '../project/RecentEmail';

// API base URL - should match the one in BacklogColumn
const API_URL = 'http://localhost:8000/api';

function EditUserStoryForm({
    userStory,
    onSave,
    onCancel,
    isCreating = false,
    projects = [],
    epics: initialEpics = [],
    sprints: initialSprints = [],
    users = [],
    priorities = [],
    currentUser = null
}) {
    const [editedUserStory, setEditedUserStory] = useState({
        ...(isCreating ? {
            // Remove client-side ID generation, backend will create ID
            title: '',
            description: '',
            project: '',
            epic: '',
            sprint: '',
            acceptance_criteria: '',
            story_points: 0, // Match backend default
            priority: 'medium',
            status: 'backlog',
            created_by: '',
            attachments: [],
            assignees: []
        } : {
            ...userStory,
            acceptance_criteria: userStory.acceptance_criteria || userStory.acceptanceCriteria,
            story_points: userStory.story_points || userStory.storyPoints,
            created_by: userStory.created_by || userStory.creator
        })
    });

    const [fileNames, setFileNames] = useState([]);
    const [validationError, setValidationError] = useState('');
    const [loading, setLoading] = useState(false);

    // State for dynamic data
    const [epics, setEpics] = useState(initialEpics);
    const [sprints, setSprints] = useState(initialSprints);
    const [recentEmails, setRecentEmails] = useState([]);

    // State for email inputs
    const [assigneeInput, setAssigneeInput] = useState('');
    const [creatorInput, setCreatorInput] = useState('');
    const [showRecentAssignees, setShowRecentAssignees] = useState(false);
    const [showRecentCreator, setShowRecentCreator] = useState(false);

    // References for detecting clicks outside dropdown
    const assigneesRef = useRef(null);
    const creatorRef = useRef(null);

    // Fibonacci numbers for story points
    const fibonacciPoints = [0, 1, 2, 3, 5, 8, 13, 21];

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

    // Fetch epics and sprints when project changes
    useEffect(() => {
        if (!editedUserStory.project) return;

        const fetchProjectData = async () => {
            setLoading(true);
            try {
                // Fetch epics for selected project
                const epicsResponse = await axios.get(`${API_URL}/projects/${editedUserStory.project}/epics/`);
                setEpics(epicsResponse.data);

                // Fetch sprints for selected project
                const sprintsResponse = await axios.get(`${API_URL}/projects/${editedUserStory.project}/sprints/`);
                setSprints(sprintsResponse.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [editedUserStory.project]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assigneesRef.current && !assigneesRef.current.contains(e.target)) {
                setShowRecentAssignees(false);
            }
            if (creatorRef.current && !creatorRef.current.contains(e.target)) {
                setShowRecentCreator(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle file changes
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setEditedUserStory(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
        setFileNames([...fileNames, ...files.map(file => file.name)]);
    };

    // Remove file from attachments
    const removeFile = (index) => {
        setEditedUserStory(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
        setFileNames(fileNames.filter((_, i) => i !== index));
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserStory(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'title' && value.trim()) {
            setValidationError('');
        }

        // If project changes, clear epic and sprint selections
        if (name === 'project') {
            setEditedUserStory(prev => ({
                ...prev,
                epic: '',
                sprint: ''
            }));
        }
    };

    // Handle email input changes
    const handleEmailInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "assigneeInput") {
            setAssigneeInput(value);
        } else if (name === "creatorInput") {
            setCreatorInput(value);
        }
    };

    // Handle email selection from dropdown
    const handleEmailSelection = (field, email) => {
        if (field === 'assignees') {
            if (!editedUserStory.assignees.includes(email)) {
                setEditedUserStory(prev => ({
                    ...prev,
                    assignees: [...prev.assignees, email]
                }));
            }
            setAssigneeInput('');
            setShowRecentAssignees(false);
        } else if (field === 'created_by') {
            setEditedUserStory(prev => ({
                ...prev,
                created_by: email
            }));
            setCreatorInput('');
            setShowRecentCreator(false);
        }
    };

    // Remove email from tags
    const removeEmail = (field, email) => {
        if (field === 'assignees') {
            setEditedUserStory(prev => ({
                ...prev,
                assignees: prev.assignees.filter(e => e !== email)
            }));
        } else if (field === 'created_by') {
            setEditedUserStory(prev => ({
                ...prev,
                created_by: ''
            }));
        }
    };

    // Handle adding email on Enter key
    const handleEmailKeyDown = (e, field) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            let email = '';

            if (field === 'assignees') {
                email = assigneeInput.trim();
                if (email && !editedUserStory.assignees.includes(email)) {
                    setEditedUserStory(prev => ({
                        ...prev,
                        assignees: [...prev.assignees, email]
                    }));
                }
                setAssigneeInput('');
            } else if (field === 'created_by') {
                email = creatorInput.trim();
                if (email) {
                    setEditedUserStory(prev => ({
                        ...prev,
                        created_by: email
                    }));
                }
                setCreatorInput('');
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate data
        if (!editedUserStory.title.trim()) {
            setValidationError('User story title is required');
            setLoading(false);
            return;
        }

        if (!editedUserStory.project) {
            setValidationError('Please select a project');
            setLoading(false);
            return;
        }

        try {
            // Handle email to user ID conversion for creator if needed
            let finalData = { ...editedUserStory };

            if (finalData.created_by && finalData.created_by.includes('@')) {
                try {
                    // Try to get user by email
                    const response = await axios.get(`${API_URL}/users/by-email/${encodeURIComponent(finalData.created_by)}/`);
                    if (response.data && response.data.id) {
                        finalData.created_by = response.data.id;
                    }
                } catch (err) {
                    console.error("Error looking up creator by email:", err);
                    // Continue with email as is
                }
            }

            // Handle assignee emails to user IDs
            if (finalData.assignees && finalData.assignees.length > 0) {
                const assigneePromises = finalData.assignees.map(async email => {
                    if (typeof email === 'string' && email.includes('@')) {
                        try {
                            const response = await axios.get(`${API_URL}/users/by-email/${encodeURIComponent(email)}/`);
                            return response.data?.id;
                        } catch (err) {
                            console.error(`Error looking up assignee ${email}:`, err);
                            return email; // Keep original if lookup fails
                        }
                    }
                    return email; // Return as is if not an email
                });

                finalData.assignees = await Promise.all(assigneePromises);
            }

            // Pass to parent for API saving
            onSave(finalData);
        } catch (error) {
            console.error("Error processing form:", error);
            setValidationError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // User story format template
    const userStoryTemplate = "As a [role], I want [feature], so that [benefit]";

    return (
        <div className="edit-user-story-form">
            <div className="edit-user-story-form__overlay" onClick={onCancel}></div>
            <div className="edit-user-story-form__content">
                <div className="edit-user-story-form__header">
                    <h2 className="edit-user-story-form__title">
                        {isCreating ? 'Create User Story' : 'Edit User Story'}
                    </h2>
                    <button className="edit-user-story-form__close" onClick={onCancel}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="edit-user-story-form__body">
                    {/* Project Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Project</label>
                        <select
                            name="project"
                            value={editedUserStory.project}
                            onChange={handleChange}
                            className="edit-user-story-form__select"
                            required
                            disabled={loading}
                        >
                            <option value="">Select a project</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Title Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editedUserStory.title}
                            onChange={handleChange}
                            className="edit-user-story-form__input"
                            placeholder="Enter user story title"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Description</label>
                        <textarea
                            name="description"
                            value={editedUserStory.description}
                            onChange={handleChange}
                            className="edit-user-story-form__textarea"
                            placeholder={userStoryTemplate}
                            rows="3"
                            disabled={loading}
                        ></textarea>
                    </div>

                    {/* Epic Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Epic</label>
                        <select
                            name="epic"
                            value={editedUserStory.epic}
                            onChange={handleChange}
                            className="edit-user-story-form__select"
                            disabled={loading || !editedUserStory.project}
                        >
                            <option value="">Select an epic</option>
                            {epics.map(epic => (
                                <option key={epic.id} value={epic.id}>{epic.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sprint Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Sprint</label>
                        <select
                            name="sprint"
                            value={editedUserStory.sprint}
                            onChange={handleChange}
                            className="edit-user-story-form__select"
                            disabled={loading || !editedUserStory.project}
                        >
                            <option value="">Select a sprint</option>
                            {sprints.map(sprint => (
                                <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Story Points Field - Updated to match backend model */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">
                            Story Points
                            <span className="edit-user-story-form__help-text"> (Fibonacci: 0,1,2,3,5,8,13,21)</span>
                        </label>
                        <select
                            name="story_points"
                            value={editedUserStory.story_points}
                            onChange={handleChange}
                            className="edit-user-story-form__select"
                            disabled={loading}
                        >
                            {fibonacciPoints.map(point => (
                                <option key={point} value={point}>{point}</option>
                            ))}
                        </select>
                    </div>

                    {/* Priority Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Priority</label>
                        <select
                            name="priority"
                            value={editedUserStory.priority}
                            onChange={handleChange}
                            className="edit-user-story-form__select"
                            disabled={loading}
                        >
                            {priorities.length > 0 ? (
                                priorities.map(priority => (
                                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                                ))
                            ) : (
                                <>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </>
                            )}
                        </select>
                    </div>

                    {/* Status Field - Updated to match backend model */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Status</label>
                        <select
                            name="status"
                            value={editedUserStory.status}
                            onChange={handleChange}
                            className="edit-user-story-form__select"
                            disabled={loading}
                        >
                            <option value="backlog">Backlog</option>
                            <option value="sprint_backlog">Sprint Backlog</option>
                            <option value="in_progress">In Progress</option>
                            <option value="testing">Testing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* Acceptance Criteria Field */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Acceptance Criteria</label>
                        <textarea
                            name="acceptance_criteria"
                            value={editedUserStory.acceptance_criteria}
                            onChange={handleChange}
                            className="edit-user-story-form__textarea"
                            placeholder="Enter acceptance criteria"
                            rows="3"
                            disabled={loading}
                        ></textarea>
                    </div>

                    {/* Assignees as email tags */}
                    <div className="edit-user-story-form__group" ref={assigneesRef}>
                        <label className="edit-user-story-form__label">Assignees (Email)</label>
                        <div className="edit-user-story-form__tags-input-container">
                            <div className="edit-user-story-form__tags-area">
                                {editedUserStory.assignees.map(email => (
                                    <span key={email} className="edit-user-story-form__tag">
                                        {email}
                                        <button
                                            type="button"
                                            className="edit-user-story-form__tag-remove"
                                            onClick={() => removeEmail('assignees', email)}
                                            disabled={loading}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    name="assigneeInput"
                                    value={assigneeInput}
                                    onChange={handleEmailInputChange}
                                    onFocus={() => setShowRecentAssignees(true)}
                                    className="edit-user-story-form__tag-input"
                                    placeholder={editedUserStory.assignees.length > 0 ? "" : "Type email and press Enter to add"}
                                    onKeyDown={(e) => handleEmailKeyDown(e, 'assignees')}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {showRecentAssignees && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={assigneeInput}
                                onSelect={(email) => handleEmailSelection('assignees', email)}
                                selectedEmails={editedUserStory.assignees}
                                loading={loading}
                            />
                        )}
                    </div>

                    {/* Creator as email tag */}
                    <div className="edit-user-story-form__group" ref={creatorRef}>
                        <label className="edit-user-story-form__label">Creator (Email)</label>
                        <div className="edit-user-story-form__tags-input-container">
                            <div className="edit-user-story-form__tags-area">
                                {editedUserStory.created_by && (
                                    <span className="edit-user-story-form__tag">
                                        {editedUserStory.created_by}
                                        <button
                                            type="button"
                                            className="edit-user-story-form__tag-remove"
                                            onClick={() => removeEmail('created_by', editedUserStory.created_by)}
                                            disabled={loading}
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {!editedUserStory.created_by && (
                                    <input
                                        type="text"
                                        name="creatorInput"
                                        value={creatorInput}
                                        onChange={handleEmailInputChange}
                                        onFocus={() => setShowRecentCreator(true)}
                                        className="edit-user-story-form__tag-input"
                                        placeholder="Type creator email"
                                        onKeyDown={(e) => handleEmailKeyDown(e, 'created_by')}
                                        disabled={loading}
                                    />
                                )}
                            </div>
                        </div>

                        {showRecentCreator && !editedUserStory.created_by && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={creatorInput}
                                onSelect={(email) => handleEmailSelection('created_by', email)}
                                loading={loading}
                            />
                        )}
                    </div>

                    {/* File Attachment */}
                    <div className="edit-user-story-form__group">
                        <label className="edit-user-story-form__label">Attachments</label>
                        <div className="edit-user-story-form__file-upload">
                            <label>
                                + Attach File
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                            </label>
                            {fileNames.map((name, index) => (
                                <div key={index} className="edit-user-story-form__file-upload-file">
                                    {name}
                                    <button
                                        type="button"
                                        className="edit-user-story-form__file-upload-remove"
                                        onClick={() => removeFile(index)}
                                        disabled={loading}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Validation Error Display */}
                    {validationError && (
                        <div className="edit-user-story-form__error">
                            {validationError}
                        </div>
                    )}

                    <div className="edit-user-story-form__actions">
                        <button
                            type="button"
                            className="edit-user-story-form__cancel"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="edit-user-story-form__submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : isCreating ? 'Create User Story' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserStoryForm;