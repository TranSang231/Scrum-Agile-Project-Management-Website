import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import "../../assets/styles/pages/project/project.scss";

import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';
import CreateProjectForm from '../../components/project/CreateProjectForm.jsx';
import ProjectDetail from '../../components/project/DetailProjectForm.jsx';

const API_URL = "http://localhost:8000/api/projects/"; // Đổi lại nếu backend chạy port khác

// Tạm thời tạo một đối tượng toast giả
const toast = {
    success: (message) => console.log('SUCCESS:', message),
    error: (message) => console.error('ERROR:', message),
    warning: (message) => console.warn('WARNING:', message),
    info: (message) => console.info('INFO:', message)
};

// Time filter dropdown component
const TimeFilterDropdown = ({ value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="project__time-filter" ref={dropdownRef}>
            <div className="project__time-filter-selected" onClick={toggleDropdown}>
                <span className="project__time-filter-text">{value}</span>
                <svg
                    className={`project__time-filter-icon ${isOpen ? 'project__time-filter-icon--open' : ''}`}
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>

            {isOpen && (
                <div className="project__time-filter-options">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`project__time-filter-option ${option === value ? 'project__time-filter-option--active' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const Project = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('project');
    const [timeFilter, setTimeFilter] = useState('This week');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Time filter options
    const timeFilterOptions = [
        'Today',
        'This week',
        'This month',
        'This quarter',
        'This year',
        'All time'
    ];

    // Thêm state để quản lý việc hiển thị chi tiết dự án
    const [selectedProject, setSelectedProject] = useState(null);
    const [showProjectDetail, setShowProjectDetail] = useState(false);

    const fetchProjects = async () => {
        try {
            // const mockdata = [
            //     {
            //         budget: 120000,
            //         client: "sang159875321@gmail.com",
            //         created_at: "2025-05-12T08:47:12.305393Z",
            //         created_by: null,
            //         description: "Website nghe nhạc trực tuyến với các tính năng phát nhạc, tạo playlist và chia sẻ.",
            //         domain: "ENTERTAINMENT",
            //         end_date: "2025-05-22",
            //         goal: "Xây dựng nền tảng nghe nhạc đơn giản, dễ sử dụng và có thể chia sẻ playlist giữa các người dùng.",
            //         id: 1,
            //         name: "Website VibeMusic",
            //         notes: "Ưu tiên phát triển tính năng upload và phát nhạc trước.",
            //         priority: "medium",
            //         product_owner_email: "product@example.com",
            //         product_owner: null,
            //         project_type: "web",
            //         scrum_master_email: "scrum@example.com",
            //         scrum_master: null,
            //         start_date: "2025-05-10",
            //         status: "active",
            //         team_members: [],
            //         team_members_emails: ["dev1@example.com", "dev2@example.com", "designer@example.com"],
            //         team_size: 7,
            //         updated_at: "2025-05-12T08:47:12.305393Z"
            //     },
            //     {
            //         budget: 75000,
            //         client: "university@edu.com",
            //         created_at: "2025-05-12T08:47:12.305393Z",
            //         created_by: null,
            //         description: "App quản lý lịch học, deadlines và thời khóa biểu cho sinh viên đại học.",
            //         domain: "education",
            //         end_date: "2025-06-15",
            //         goal: "Xây dựng ứng dụng lịch học cho sinh viên với tính năng nhắc nhở deadline và đồng bộ hóa với lịch Google.",
            //         id: 2,
            //         name: "Schedule App",
            //         notes: "Đặc biệt quan tâm đến việc hỗ trợ nhập lịch học tự động qua mã QR hoặc file Excel.",
            //         priority: "high",
            //         product_owner_email: "dean@university.edu",
            //         product_owner: null,
            //         project_type: "mobile",
            //         scrum_master_email: "lead@example.com",
            //         scrum_master: null,
            //         start_date: "2025-05-15",
            //         status: "active",
            //         team_members: [],
            //         team_members_emails: ["mobile@example.com", "ui@example.com", "backend@example.com", "qa@example.com"],
            //         team_size: 5,
            //         updated_at: "2025-05-12T08:47:12.305393Z"
            //     },
            // ];

            // // Sử dụng mockdata trong quá trình phát triển
            // setProjects(mockdata);
            // setLoading(false);

            // Phần code gọi API thực tế - đang comment để sử dụng mockdata

            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }

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

    // Xử lý khi người dùng click vào một project card
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowProjectDetail(true);
    };

    // Xử lý đóng modal chi tiết dự án
    const handleCloseDetail = () => {
        setShowProjectDetail(false);
        setSelectedProject(null);
    };

    // Xử lý tạo dự án mới
    const handleCreateProject = async (projectData) => {
        try {
            // Trong quá trình phát triển, thêm trực tiếp vào state
            // const newProject = {
            //     ...projectData,
            //     id: Date.now(), // Tạo ID giả
            //     created_at: new Date().toISOString(),
            //     updated_at: new Date().toISOString()
            // };
            // setProjects(prevProjects => [...prevProjects, newProject]);
            // setShowCreateForm(false);
            // toast.success('Project created successfully!');

            // Phần code gọi API thực tế - đang comment để sử dụng mockdata

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
            toast.success('Project created successfully!');


            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error creating project:', err);
            setError(err.message || 'Failed to create project');
            toast.error(`Failed to create project: ${err.message}`);
        }
    };

    // Xử lý cập nhật dự án
    const handleUpdateProject = async (updatedProject) => {
        try {
            // Mock update - cập nhật trực tiếp trong state
            setProjects(prev =>
                prev.map(project => project.id === updatedProject.id ? updatedProject : project)
            );

            // Cập nhật selected project để hiển thị thông tin mới nhất
            setSelectedProject(updatedProject);

            toast.success('Project updated successfully!');

            // Phần code gọi API thực tế - đang comment để sử dụng mockdata

            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_URL}${updatedProject.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProject)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.detail || 'Failed to update project');
            }

            const resultProject = await response.json();

            // Cập nhật danh sách dự án
            setProjects(prev =>
                prev.map(project => project.id === resultProject.id ? resultProject : project)
            );

            // Cập nhật selected project để hiển thị thông tin mới nhất
            setSelectedProject(resultProject);

            toast.success('Project updated successfully!');

        } catch (err) {
            console.error('Error updating project:', err);
            toast.error(`Failed to update project: ${err.message}`);
        }
    };

    // Handler for time filter changes
    const handleTimeFilterChange = (selectedFilter) => {
        setTimeFilter(selectedFilter);
        // You can add additional logic here to filter projects by time if needed
    };

    return (
        <div className="project">
            <NavLeft activeView={activeView} setActiveView={setActiveView} />
            <div className="project__main">
                <NavTop />
                <div className="project__container">
                    <div className="project__header">
                        <h1 className="project__title">Projects</h1>
                        {/* Replace static time filter with dropdown component */}
                        <TimeFilterDropdown
                            value={timeFilter}
                            options={timeFilterOptions}
                            onChange={handleTimeFilterChange}
                        />
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
                                        <div
                                            key={project.id}
                                            className="project__card"
                                            onClick={() => handleProjectClick(project)}
                                        >
                                            <div className="project__card-header">
                                                <h3 className="project__card-title">{project.name}</h3>
                                                <span className={`project__card-status project__card-status--${project.status}`}>
                                                    {project.status === 'active' ? 'Active' :
                                                        project.status === 'completed' ? 'Completed' :
                                                            project.status === 'on hold' ? 'On Hold' : 'Cancelled'}
                                                </span>
                                            </div>
                                            <div className="project__card-details">
                                                <div className="project__card-detail">
                                                    <svg className="project__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
                                                </div>
                                                <div className="project__card-detail">
                                                    <svg className="project__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    {project.team_size ? `${project.team_size} team members` : 'No team members'}
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

            {showProjectDetail && selectedProject && (
                <ProjectDetail
                    project={selectedProject}
                    onClose={handleCloseDetail}
                    onUpdate={handleUpdateProject}
                />
            )}
        </div>
    );
}

export default Project;