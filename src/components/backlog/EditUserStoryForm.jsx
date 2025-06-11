import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/components/editUserStoryForm.scss';

function EditUserStoryForm({ userStory, onSave, onCancel, isCreating = false, projectId, epicId = null }) {
    const API_URL = 'http://localhost:8000/api';
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        acceptance_criteria: '',
        story_points: 0,
        priority: 'medium',
        project: projectId,
        epic: epicId,
        created_by: null
    });

    useEffect(() => {
        if (userStory) {
            setFormData({
                title: userStory.title || '',
                description: userStory.description || '',
                acceptance_criteria: userStory.acceptance_criteria || '',
                story_points: userStory.story_points || 0,
                priority: userStory.priority || 'medium',
                project: userStory.project || projectId,
                epic: userStory.epic || epicId
            });
        }
    }, [userStory, projectId, epicId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            // Get user ID from JWT token
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const userId = payload.user_id;

            const userStoryData = {
                ...formData,
                project: projectId,
                epic: epicId,
                created_by: userId
            };

            console.log(userStoryData);

            if (isCreating) {
                const response = await axios.post(`${API_URL}/user-stories/`, userStoryData, { headers });
                onSave(response.data);
            } else {
                const response = await axios.put(`${API_URL}/user-stories/${userStory.id}/`, userStoryData, { headers });
                onSave(response.data);
            }
        } catch (error) {
            console.error('Error saving user story:', error);
            if (error.response?.data) {
                console.error('Error details:', error.response.data);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="edit-user-story-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="As a [role], I want [feature], so that [benefit]"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="acceptance_criteria">Acceptance Criteria</label>
                    <textarea
                        id="acceptance_criteria"
                        name="acceptance_criteria"
                        value={formData.acceptance_criteria}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="story_points">Story Points</label>
                    <input
                        type="number"
                        id="story_points"
                        name="story_points"
                        value={formData.story_points}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">
                        {isCreating ? 'Create User Story' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUserStoryForm;