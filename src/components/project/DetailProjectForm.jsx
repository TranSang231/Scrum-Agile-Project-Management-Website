import React from 'react';
import '../../assets/styles/components/project/DetailProjectForm.scss';

// Mock data cho demo trực tiếp
const mockProject = {
    id: "PROJ-2023-001",
    name: "E-commerce Platform Redesign",
    description: "Dự án này bao gồm việc thiết kế lại toàn bộ giao diện người dùng cho nền tảng thương mại điện tử, cải thiện trải nghiệm mua sắm, tối ưu hóa quy trình thanh toán, và tích hợp các phương thức thanh toán mới. Dự án cũng bao gồm thiết kế responsive cho các thiết bị di động và máy tính bảng.",
    project_type: "web",
    goal: "Tăng tỷ lệ chuyển đổi lên 25% và giảm tỷ lệ bỏ giỏ hàng xuống 15% trong vòng 3 tháng sau khi ra mắt. Tăng thời gian người dùng ở lại trang web và cải thiện tỷ lệ tương tác với sản phẩm.",
    client: "TechRetail Solutions Inc.",

    product_owner_email: "sarah.johnson@techretail.com",
    scrum_master_email: "michael.chen@ourcompany.com",
    team_members: [
        "david.wilson@ourcompany.com",
        "emily.parker@ourcompany.com",
        "alex.rodriguez@ourcompany.com",
        "natalie.kim@ourcompany.com",
        "kevin.nguyen@ourcompany.com"
    ],
    team_size: 7,

    start_date: "2023-09-15",
    end_date: "2024-02-28",
    status: "active",
    priority: "high",
    domain: "recommerce",
    budget: 145000,

    notes: "Dự án này là ưu tiên cao của khách hàng vì họ đang lên kế hoạch cho chiến dịch marketing lớn vào tháng 3/2024. Cần đảm bảo ưu tiên các tính năng giỏ hàng và thanh toán trước khi phát triển các tính năng bổ sung khác. Đã nhận được feedback từ người dùng về các vấn đề UX hiện tại cần được giải quyết."
};

const ProjectDetail = ({ project = mockProject, onClose = () => console.log('Close clicked') }) => {
    // Format dates nếu cần
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
        return typeMap[type] || type;
    };

    // Format domain
    const getDomainLabel = (domain) => {
        const domainMap = {
            'education': 'Education',
            'health': 'Health',
            'finance': 'Finance',
            'recommerce': 'E-commerce',
            'other': 'Other'
        };
        return domainMap[domain] || domain;
    };

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
                                <div className="project-detail__value">{getProjectTypeLabel(project.project_type)}</div>
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
                                <div className="project-detail__value">{project.client || 'No client specified'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="project-detail__section">
                        <h3 className="project-detail__section-title">Team Members</h3>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Product Owner</label>
                                <div className="project-detail__value">{project.product_owner_email || 'Not assigned'}</div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Scrum Master</label>
                                <div className="project-detail__value">{project.scrum_master_email || 'Not assigned'}</div>
                            </div>
                        </div>

                        <div className="project-detail__row">
                            <div className="project-detail__field">
                                <label className="project-detail__label">Team Members</label>
                                <div className="project-detail__value">
                                    {project.team_members && project.team_members.length > 0 ? (
                                        <div className="project-detail__tags">
                                            {project.team_members.map((member, index) => (
                                                <span key={index} className="project-detail__tag">
                                                    {member}
                                                </span>
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
                                <div className={`project-detail__value project-detail__status project-detail__status--${project.status}`}>
                                    {getStatusLabel(project.status)}
                                </div>
                            </div>

                            <div className="project-detail__field">
                                <label className="project-detail__label">Priority</label>
                                <div className={`project-detail__value project-detail__priority project-detail__priority--${project.priority}`}>
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
                    <button className="project-detail__button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;