import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/pages/project/project.scss";

import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';
import CreateProjectForm from '../../components/project/CreateProjectForm.jsx';

const API_URL = "http://localhost:8000/api/projects/"; // Đổi lại nếu backend chạy port khác

const Project = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('project');
    const [timeFilter, setTimeFilter] = useState('This week');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('access_token');
            // if (!token) {
            //     navigate('/login');
            //     return;
            // }

            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                // Token hết hạn, thử refresh token
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });

                    if (refreshResponse.ok) {
                        const { access } = await refreshResponse.json();
                        localStorage.setItem('access_token', access);
                        // Thử lại request ban đầu
                        return fetchProjects();
                    }
                }
                // Nếu refresh token thất bại, chuyển hướng đến trang login
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            setProjects(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load projects');
            setLoading(false);
            console.error('Error fetching projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (projectData) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.detail || 'Failed to create project');
            }

            const newProject = await response.json();
            setProjects(prevProjects => [...prevProjects, newProject]);
            setShowCreateForm(false);
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error creating project:', err);
            setError(err.message || 'Failed to create project');
        }
    };

    return (
        <div className="project">
            <NavLeft activeView={activeView} setActiveView={setActiveView} />
            <div className="project__main">
                <NavTop />
                <div className="project__container">
                    <div className="project__header">
                        <h1 className="project__title">Projects</h1>
                        <div className="project__time-filter">
                            <span className="project__time-filter-text">{timeFilter}</span>
                            <svg className="project__time-filter-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>

                    <div className="project__content">
                        <div className="project__create-section">
                            <button
                                className="project__create-button"
                                onClick={() => setShowCreateForm(true)}
                            >
                                <svg className="project__create-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Create New Project
                            </button>
                        </div>

                        <div className="project__list-section">
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div className="error-message">{error}</div>
                            ) : projects.length === 0 ? (
                                <div>No projects found</div>
                            ) : (
                                <div className="project__list">
                                    {projects.map(project => (
                                        <div key={project.id} className="project__card">
                                            <div className="project__card-header">
                                                <h3 className="project__card-title">{project.name}</h3>
                                                <span className={`project__card-status project__card-status--${project.status}`}>
                                                    {project.status === 'active' ? 'Active' : 'Completed'}
                                                </span>
                                            </div>
                                            <div className="project__card-details">
                                                <div className="project__card-detail">
                                                    <svg className="project__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {project.start_date} - {project.end_date}
                                                </div>
                                                <div className="project__card-detail">
                                                    <svg className="project__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    {project.teamSize ? `${project.teamSize} team members` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showCreateForm && (
                <CreateProjectForm
                    onClose={() => setShowCreateForm(false)}
                    onSubmit={handleCreateProject}
                />
            )}
        </div>
    );
}

export default Project;