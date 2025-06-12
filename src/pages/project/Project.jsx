import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import "../../assets/styles/pages/project/project.scss";

import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';
import CreateProjectForm from '../../components/project/CreateProjectForm.jsx';
import ProjectDetail from '../../components/project/DetailProjectForm.jsx';

const API_URL = "http://localhost:8000/api/projects/";

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
    const [allProjects, setAllProjects] = useState([]); // Lưu toàn bộ project để filter client-side
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
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.');
                navigate('/login');
                return;
            }

            // Get current user ID from token
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const currentUserId = payload.user_id;

            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
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
                setError('Không thể tải danh sách dự án.');
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();

            // Filter projects based on user's role
            const filteredProjects = data.filter(project => {
                // User is the creator
                if (project.created_by === currentUserId) return true;

                // User is the product owner
                if (project.product_owner === currentUserId) return true;

                // User is the scrum master
                if (project.scrum_master === currentUserId) return true;

                // User is a team member
                if (project.team_members && project.team_members.includes(currentUserId)) return true;

                return false;
            });

            setAllProjects(filteredProjects); // Lưu tất cả project hợp lệ
            setProjects(filteredProjects); // Hiển thị mặc định
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi tải dự án.');
            setLoading(false);
            console.error('Error fetching projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.');
                throw new Error('No authentication token found');
            }
            if (!projectData.name || projectData.name.trim() === '') {
                setError('Tên dự án không được để trống.');
                throw new Error('Tên dự án không được để trống.');
            }
            if (!projectData.start_date || !projectData.end_date) {
                setError('Vui lòng nhập ngày bắt đầu và ngày kết thúc.');
                throw new Error('Vui lòng nhập ngày bắt đầu và ngày kết thúc.');
            }
            if (new Date(projectData.start_date) > new Date(projectData.end_date)) {
                setError('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
                throw new Error('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
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
                setError(errorData.detail || 'Không thể tạo dự án mới.');
                throw new Error(errorData.detail || 'Failed to create project');
            }

            const newProject = await response.json();

            // Update the projects list with the new project
            setProjects(prevProjects => [...prevProjects, newProject]);
            setShowCreateForm(false);
            toast.success('Project created successfully!');
            setError(''); // Clear any previous errors

        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi tạo dự án.');
            toast.error(`Failed to create project: ${err.message}`);
        }
    };

    // Xử lý cập nhật dự án
    const handleUpdateProject = async (updatedProject) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.');
                throw new Error('No authentication token found');
            }
            if (!updatedProject.id) {
                setError('Thiếu ID dự án để cập nhật.');
                throw new Error('Project ID is required for update');
            }
            if (!updatedProject.name || updatedProject.name.trim() === '') {
                setError('Tên dự án không được để trống.');
                throw new Error('Tên dự án không được để trống.');
            }
            if (!updatedProject.start_date || !updatedProject.end_date) {
                setError('Vui lòng nhập ngày bắt đầu và ngày kết thúc.');
                throw new Error('Vui lòng nhập ngày bắt đầu và ngày kết thúc.');
            }
            if (new Date(updatedProject.start_date) > new Date(updatedProject.end_date)) {
                setError('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
                throw new Error('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
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
                setError(errorData.detail || 'Không thể cập nhật dự án.');
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
            // Do NOT close the detail modal here; let it show updated info

        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi cập nhật dự án.');
            toast.error(`Failed to update project: ${err.message}`);
        }
    };

    // Thêm hàm xử lý xóa dự án
    const handleDeleteProject = async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.');
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_URL}${projectId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setError('Không thể xóa dự án.');
                throw new Error('Failed to delete project');
            }

            // Cập nhật danh sách dự án sau khi xóa
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
            toast.success('Project deleted successfully!');

        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi xóa dự án.');
            toast.error(`Failed to delete project: ${err.message}`);
        }
    };

    // Handler for time filter changes
    const handleTimeFilterChange = (selectedFilter) => {
        setTimeFilter(selectedFilter);
        // Lọc dự án theo filter thời gian
        if (selectedFilter === 'All time') {
            setProjects(allProjects);
            return;
        }
        const now = new Date();
        let start, end;
        switch (selectedFilter) {
            case 'Today':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                end = new Date(start);
                end.setDate(end.getDate() + 1);
                break;
            case 'This week':
                start = new Date(now);
                start.setDate(now.getDate() - now.getDay());
                end = new Date(start);
                end.setDate(start.getDate() + 7);
                break;
            case 'This month':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                break;
            case 'This quarter': {
                const quarter = Math.floor(now.getMonth() / 3);
                start = new Date(now.getFullYear(), quarter * 3, 1);
                end = new Date(now.getFullYear(), quarter * 3 + 3, 1);
                break;
            }
            case 'This year':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear() + 1, 0, 1);
                break;
            default:
                setProjects(allProjects);
                return;
        }
        setProjects(
            allProjects.filter(project => {
                const projectStart = new Date(project.start_date);
                const projectEnd = new Date(project.end_date);
                // Dự án có thời gian nằm trong khoảng filter
                return (
                    (projectStart >= start && projectStart < end) ||
                    (projectEnd >= start && projectEnd < end) ||
                    (projectStart <= start && projectEnd >= end)
                );
            })
        );
    };

    // Thêm hàm xử lý chọn project
    const handleSelectProject = (project) => {
        // Lưu project hiện tại vào localStorage
        localStorage.setItem('currentProject', JSON.stringify(project));
        // Chuyển hướng đến trang backlog của project
        navigate(`/backlog/${project.id}`);
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
                                <div className="project__error-message" role="alert" style={{
                                    background: '#fee2e2',
                                    color: '#b91c1c',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '6px',
                                    padding: '12px',
                                    marginBottom: '16px',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    boxShadow: '0 2px 8px rgba(220,38,38,0.08)'
                                }}>{error}</div>
                            ) : projects.length === 0 ? (
                                <div>No projects found</div>
                            ) : (
                                <div className="project__list">
                                    {projects.map(project => (
                                        <div
                                            key={project.id}
                                            className="project__card"
                                            onClick={() => handleSelectProject(project)}
                                        >
                                            <div className="project__card-header">
                                                <h3 className="project__card-title">{project.name}</h3>
                                                <div className="project__card-actions">
                                                    <span className={`project__card-status project__card-status--${project.status}`}>
                                                        {project.status === 'active' ? 'Active' :
                                                            project.status === 'completed' ? 'Completed' :
                                                                project.status === 'cancelled' ? 'Cancelled' : project.status}
                                                    </span>
                                                    <div className="project__card-action-buttons">
                                                        <button
                                                            className="project__card-action"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleProjectClick(project);
                                                            }}
                                                            title="View project details"
                                                        >
                                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            className="project__card-action project__card-action--delete"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteProject(project.id);
                                                            }}
                                                            title="Delete project"
                                                        >
                                                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
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