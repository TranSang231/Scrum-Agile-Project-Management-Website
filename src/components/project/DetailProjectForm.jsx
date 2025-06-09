import React, { useState } from 'react';
import CreateProjectForm from './CreateProjectForm';
import '../../assets/styles/components/project/detailProjectForm.scss';

const ProjectDetail = ({ project, onClose, onUpdate }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    if (!project) return null; // Không render nếu không có dữ liệu dự án

    // Nếu đang ở chế độ Edit, hiển thị form chỉnh sửa
    if (isEditMode) {
        return (
            <CreateProjectForm
                project={project}
                onClose={() => setIsEditMode(false)}
                onSubmit={onUpdate}
            />
        );
    }

    // Format dates
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    // Format status
    const getStatusLabel = (status) => {
        const statusMap = {
            'active': 'Active',
            'completed': 'Completed',
            'on hold': 'On Hold',
            'cancelled': 'Cancelled'
        };
        return statusMap[status] || status;
    };

    // Format priority
    const getPriorityLabel = (priority) => {
        const priorityMap = {
            'low': 'Low',
            'medium': 'Medium',
            'high': 'High',
            'critical': 'Critical'
        };
        return priorityMap[priority] || priority;
    };

    // Format project type
    const getProjectTypeLabel = (type) => {
        if (!type) return 'Not specified';

        const typeMap = {
            'enterprise': 'Enterprise Software',
            'web': 'Web Application',
            'mobile': 'Mobile Application',
            'ai ml': 'AI / Machine Learning Software',
            'system': 'System Software',
            'security': 'Security Software',
            'game': 'Game Software',
            'embedded': 'Embedded Software',
            'data_analysis': 'Data Analysis Software',
            'other': 'Other'
        };
        // Xử lý nếu project type chứa "other:"
        if (type && type.startsWith('other:')) {
            return type.replace('other:', '').trim();
        }
        return typeMap[type] || type;
    };

    // Format domain với định dạng chữ cái đầu viết hoa, chữ cái còn lại viết thường
    const getDomainLabel = (domain) => {
        if (!domain) return 'Not specified';

        // Hàm để chuyển đổi chuỗi sang dạng Capitalize (viết hoa chữ cái đầu tiên)
        const capitalize = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        const domainMap = {
            'education': 'Education',
            'health': 'Health',
            'finance': 'Finance',
            'ecommerce': 'E-commerce',
            'recommerce': 'E-commerce',
            'other': 'Other'
        };

        // Xử lý nếu domain chứa "other:"
        if (domain.toLowerCase().startsWith('other:')) {
            // Lấy phần sau other: và chuyển sang Capitalize
            const customDomain = domain.substring(6).trim();
            return customDomain ? capitalize(customDomain) : 'Other';
        }

        // Xử lý các domain thông thường từ domainMap
        return domainMap[domain.toLowerCase()] || capitalize(domain);
    };

    // Format role
    const getRoleLabel = (role) => {
        if (!role) return 'Not specified';

        const roleMap = {
            'developer': 'Developer',
            'designer': 'Designer',
            'tester': 'QA Tester',
            'analyst': 'Business Analyst',
            'devops': 'DevOps',
            'other': 'Other'
        };
        return roleMap[role.toLowerCase()] || role;
    };

    // Xử lý clients - có thể có nhiều clients
    const getClientList = () => {
        if (!project.client) return [];
        return project.client.split(',').map(client => client.trim()).filter(Boolean);
    };

    // Xử lý team members với roles
    const getTeamMembersWithRoles = () => {
        if (!project.team_members_emails || !project.team_members_emails.length) return [];

        // Kết hợp emails với roles nếu có
        if (project.team_members && project.team_members.length) {
            return project.team_members_emails.map((email, index) => {
                const memberInfo = project.team_members.find(m => m.email === email) ||
                    (project.team_members[index] ? { role: project.team_members[index].role } : null);
                return {
                    email,
                    role: memberInfo ? memberInfo.role : 'developer' // Mặc định là developer nếu không có role
                };
            });
        }

        // Nếu không có thông tin role, gán mặc định là developer
        return project.team_members_emails.map(email => ({
            email,
            role: 'developer'
        }));
    };

    const clients = getClientList();
    const teamMembers = getTeamMembersWithRoles();

    return (
        <div className="project-detail">
            <div className="project-detail__overlay" onClick={onClose}></div>
            <div className="project-detail__content">
                <div className="project-detail__header">
                    <h2 className="project-detail__title">Project Details</h2>
                    <button className="project-detail__close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="project-detail__body">
                    <div className="project-detail__section">
                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Project Name</label>
                                <div className="project-detail__value">{project.name}</div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Description</label>
                                <div className="project-detail__value project-detail__value--multiline">
                                    {project.description || 'No description provided'}
                                </div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Project Type</label>
                                <div className="project-detail__value">
                                    {getProjectTypeLabel(project.project_type)}
                                </div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Goal</label>
                                <div className="project-detail__value project-detail__value--multiline">
                                    {project.goal || 'No goal specified'}
                                </div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Client</label>
                                <div className="project-detail__value project-detail__value--tag-container">
                                    {clients.length > 0 ? (
                                        <div className="project-detail__tags">
                                            {clients.map((client, index) => (
                                                <span key={index} className="project-detail__email-tag">
                                                    {client}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        'No client specified'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project-detail__section">
                        <h3 className="project-detail__section-title">Team Members</h3>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Product Owner</label>
                                <div className="project-detail__value project-detail__value--tag-container">
                                    {project.product_owner_email ? (
                                        <span className="project-detail__email-tag">
                                            {project.product_owner_email}
                                        </span>
                                    ) : (
                                        'Not assigned'
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Scrum Master</label>
                                <div className="project-detail__value project-detail__value--tag-container">
                                    {project.scrum_master_email ? (
                                        <span className="project-detail__email-tag">
                                            {project.scrum_master_email}
                                        </span>
                                    ) : (
                                        'Not assigned'
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Team Members</label>
                                <div className="project-detail__value project-detail__value--tag-container">
                                    {teamMembers.length > 0 ? (
                                        <div className="project-detail__tags">
                                            {teamMembers.map((member, index) => (
                                                <div key={index} className="project-detail__member-tag">
                                                    <span className="project-detail__member-email">
                                                        {member.email}
                                                    </span>
                                                    <span className="project-detail__member-role">
                                                        {getRoleLabel(member.role)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        'No team members assigned'
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Team Size</label>
                                <div className="project-detail__value">{project.team_size} member(s)</div>
                            </div>
                        </div>
                    </div>

                    <div className="project-detail__section">
                        <h3 className="project-detail__section-title">Schedule & Status</h3>

                        <div className="project-detail__row project-detail__row--two-column">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Start Date</label>
                                <div className="project-detail__value">{formatDate(project.start_date)}</div>
                            </div>

                            <div className="project-detail__field">
                                <label className="project-detail__label">End Date</label>
                                <div className="project-detail__value">{formatDate(project.end_date)}</div>
                            </div>
                        </div>

                        <div className="project-detail__row project-detail__row--three-column">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Status</label>
                                <div className={`project-detail__status project-detail__status--${project.status}`}>
                                    {getStatusLabel(project.status)}
                                </div>
                            </div>

                            <div className="project-detail__field">
                                <label className="project-detail__label">Priority</label>
                                <div className={`project-detail__priority project-detail__priority--${project.priority}`}>
                                    {getPriorityLabel(project.priority)}
                                </div>
                            </div>

                            <div className="project-detail__field">
                                <label className="project-detail__label">Domain</label>
                                <div className="project-detail__value">{getDomainLabel(project.domain)}</div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Budget</label>
                                <div className="project-detail__value">
                                    {project.budget ? `$${project.budget.toLocaleString()}` : 'Not specified'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project-detail__section">
                        <h3 className="project-detail__section-title">Additional Notes</h3>
                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <div className="project-detail__value project-detail__value--multiline">
                                    {project.notes || 'No additional notes'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-detail__footer">
                    <button className="project-detail__button project-detail__button--secondary" onClick={onClose}>
                        Close
                    </button>
                    <button className="project-detail__button project-detail__button--primary" onClick={() => setIsEditMode(true)}>
                        Edit Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;