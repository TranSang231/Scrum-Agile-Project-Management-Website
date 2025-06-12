import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/components/editEpicForm.scss';

function EditEpicForm({ epic, onSave, onCancel, isCreating = false, projectId }) {
    const API_URL = 'http://localhost:8000/api';
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'not_started',
        project: projectId,
        created_by: null
    });

    useEffect(() => {
        if (epic) {
            setFormData({
                name: epic.name || '',
                description: epic.description || '',
                status: epic.status || 'not_started',
                project: epic.project || projectId,
                created_by: epic.created_by
            });
        }
    }, [epic, projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log('0');
            const token = localStorage.getItem('access_token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            // console.log('1');
            // Get user ID from JWT token
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const userId = payload.user_id;

            // console.log('2');
            const epicData = {
                ...formData,
                created_by: userId
            };

            // console.log('3');
            if (isCreating) {
                // console.log('4');
                const response = await axios.post(`${API_URL}/epics/`, epicData, { headers });
                onSave(response.data);
            } else {
                // console.log('5');
                const response = await axios.put(`${API_URL}/epics/${epic.id}/`, epicData, { headers });
                console.log(response.data);
                onSave(response.data);
            }
        } catch (error) {
            console.error('Error saving epic:', error);
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
    }; return (
        <div className="edit-epic-form">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>{isCreating ? 'Create New Epic' : 'Edit Epic'}</h2>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">
                        {isCreating ? 'Create Epic' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEpicForm;