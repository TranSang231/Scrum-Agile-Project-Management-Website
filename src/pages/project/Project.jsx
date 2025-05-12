import React, { useState, useEffect } from 'react';
import "../../assets/styles/pages/project/project.scss";

import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';
import CreateProjectForm from "../../pages/project/CreateProjectForm.jsx";
import ProjectCard from "../../pages/project/ProjectCard.jsx";



const Project = () => {
    const [activeView, setActiveView] = useState('project');
    const [timeFilter, setTimeFilter] = useState('This week');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ⚠️ Dùng mock data thay vì gọi API
    const fetchProjects = () => {
        const mockProjects = [
            {
                id: 101,
                name: "Documentation Writing",
                status: "In Progress",
                start_date: "2025-01-19",
                end_date: "2025-06-30",
                client: "Rapid Software Inc",
                thumbnail: "/src/assets/images/image.webp",
                members: [
                    { name: "John Doe", avatar: "/src/assets/images/UserAvatar.png" },
                    { name: "Jane Smith", avatar: "/src/assets/images/UserAvatar.png" }
                ]
            },
            {
                id: 102,
                name: "Documentation Writing",
                status: "In Progress",
                start_date: "2024-11-19",
                end_date: "2025-01-31",
                client: "Rapid Software Inc",
                thumbnail: "/src/assets/images/image.webp",
                members: [
                    { name: "Robert Chen", avatar: "/src/assets/images/UserAvatar.png" },
                    { name: "Emily Wong", avatar: "/src/assets/images/UserAvatar.png" }
                ]
            },
            {
                id: 103,
                name: "Packaging Design",
                status: "On Hold",
                start_date: "2024-10-15",
                end_date: "2025-01-20",
                client: "Pure Products Inc",
                thumbnail: "/src/assets/images/image.webp",
                members: [
                    { name: "David Kim", avatar: "/src/assets/images/UserAvatar.png" },
                    { name: "Sarah Johnson", avatar: "/src/assets/images/UserAvatar.png" }
                ]
            },
            {
                id: 104,
                name: "Develop a business facebook",
                status: "Cancelled",
                start_date: "2024-09-07",
                end_date: "2024-10-30",
                client: "Tasty Juice Company Inc",
                thumbnail: "/src/assets/images/image.webp",
                members: [
                    { name: "Michael Brown", avatar: "/src/assets/images/UserAvatar.png" },
                    { name: "Lisa Chen", avatar: "/src/assets/images/UserAvatar.png" },
                    { name: "Tom Wilson", avatar: "/src/assets/images/UserAvatar.png" }
                ]
            }
        ];
        setProjects(mockProjects);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Xử lý khi tạo project mới (bao gồm ảnh thumbnail)
    const handleCreateProject = (projectData) => {
        // Tạo project mới với dữ liệu từ form, bao gồm thumbnail
        const newProject = {
            ...projectData,
            id: Date.now(),
            // Nếu không có thumbnail, sử dụng placeholder
            thumbnail: projectData.thumbnail || "/src/assets/images/image.webp",
            members: [] // Thêm members trống (có thể thêm chức năng chọn thành viên sau)
        };
        
        // Cập nhật danh sách project
        setProjects(prev => [...prev, newProject]);
        setShowCreateForm(false);
        setError('');
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
                                <div className="project__grid">
                                    {projects.map(project => (
                                        <ProjectCard key={project.id} project={project} />
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