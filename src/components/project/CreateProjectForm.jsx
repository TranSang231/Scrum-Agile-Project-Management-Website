import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/components/project/createProjectForm.scss';
import RecentEmails from './RecentEmail';

// Remove: const sampleUsers = [ ... ];

const CreateProjectForm = ({ onClose, onSubmit, project = null }) => {
    // Xác định xem đang là Edit hay Create mode
    const isEditMode = !!project;

    const [showRecentOwner, setShowRecentOwner] = useState(false);
    const [showRecentScrum, setShowRecentScrum] = useState(false);
    const [showRecentTeam, setShowRecentTeam] = useState(false);
    const [showRecentClient, setShowRecentClient] = useState(false);

    const ownerRef = useRef(null);
    const scrumRef = useRef(null);
    const teamRef = useRef(null);
    const clientRef = useRef(null);

    // Thêm options cho roles
    const MEMBER_ROLES = [
        { value: 'developer', label: 'Developer' },
        { value: 'designer', label: 'Designer' },
        { value: 'tester', label: 'QA Tester' },
        { value: 'analyst', label: 'Business Analyst' },
        { value: 'devops', label: 'DevOps' },
        { value: 'other', label: 'Other' }
    ];

    // Init formData với giá trị mặc định
    const getInitialFormData = () => ({
        name: '',
        description: '',
        project_type: 'web',
        project_type_other: '',
        goal: '',
        client_input: '',
        clients: [],
        product_owner_input: '',
        product_owner_email: '',
        scrum_master_input: '',
        scrum_master_email: '',
        team_members_input: '',
        team_members: [],
        start_date: '',
        end_date: '',
        team_size: 1,
        status: 'active',
        priority: 'medium',
        domain: 'education',
        domain_other: '',
        budget: '',
        notes: '',
        id: null
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [error, setError] = useState('');

    // Khởi tạo formData từ project khi component được mount hoặc project thay đổi
    useEffect(() => {
        if (project) {
            // Extract project_type_other if needed
            let projectType = project.project_type || 'web';
            let projectTypeOther = '';
            if (projectType.startsWith('other:')) {
                projectTypeOther = projectType.substring(6).trim();
                projectType = 'other';
            }

            // Extract domain_other if needed
            let domain = project.domain || 'other';
            let domainOther = '';
            if (domain.startsWith('other:')) {
                domainOther = domain.substring(6).trim();
                domain = 'other';
            }

            // Extract clients from comma-separated string
            const clients = project.client ?
                project.client.split(',').map(client => client.trim()).filter(Boolean) : [];

            // Process team members
            let teamMembers = [];
            if (project.team_members_emails && project.team_members_emails.length > 0) {
                teamMembers = project.team_members_emails.map(email => {
                    const memberInfo = project.team_members && project.team_members.find(m => m.email === email);
                    return {
                        email,
                        role: memberInfo ? memberInfo.role : 'developer'
                    };
                });
            }

            // Format dates for input fields
            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            setFormData({
                name: project.name || '',
                description: project.description || '',
                project_type: projectType,
                project_type_other: projectTypeOther,
                goal: project.goal || '',
                client_input: '',
                clients: clients,
                product_owner_input: '',
                product_owner_email: project.product_owner_email || '',
                scrum_master_input: '',
                scrum_master_email: project.scrum_master_email || '',
                team_members_input: '',
                team_members: teamMembers,
                start_date: formatDateForInput(project.start_date) || '',
                end_date: formatDateForInput(project.end_date) || '',
                team_size: project.team_size || 1,
                status: project.status || 'active',
                priority: project.priority || 'medium',
                domain: domain,
                domain_other: domainOther,
                budget: project.budget || '',
                notes: project.notes || '',
                id: project.id || null
            });
        } else {
            // Reset form data if no project is provided
            setFormData(getInitialFormData());
        }
    }, [project]);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ownerRef.current && !ownerRef.current.contains(e.target)) {
                setShowRecentOwner(false);
            }
            if (scrumRef.current && !scrumRef.current.contains(e.target)) {
                setShowRecentScrum(false);
            }
            if (teamRef.current && !teamRef.current.contains(e.target)) {
                setShowRecentTeam(false);
            }
            if (clientRef.current && !clientRef.current.contains(e.target)) {
                setShowRecentClient(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [recentEmails] = useState([
        'user@gmail.com',
        'admin@gmail.com',
        'support@gmail.com',
        'info@company.com',
        'sales@business.com',
        'contact@domain.com',
        'john.doe@example.com',
        'jane.smith@example.com',
        'david.miller@gmail.com',
        'sarah.johnson@company.com'
    ]);

    // Các options giữ nguyên...
    const PROJECT_TYPE_OPTIONS = [
        { value: 'enterprise', label: 'Enterprise Software' },
        { value: 'web', label: 'Web Application' },
        { value: 'mobile', label: 'Mobile Application' },
        { value: 'ai ml', label: 'AI / Machine Learning Software' },
        { value: 'system', label: 'System Software' },
        { value: 'security', label: 'Security Software' },
        { value: 'game', label: 'Game Software' },
        { value: 'embedded', label: 'Embedded Software' },
        { value: 'data_analysis', label: 'Data Analysis Software' },
        { value: 'other', label: 'Other' }
    ];

    const STATUS_OPTIONS = [
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const PRIORITY_OPTIONS = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
    ];

    const DOMAIN_OPTIONS = [
        { value: 'education', label: 'Education' },
        { value: 'health', label: 'Health' },
        { value: 'finance', label: 'Finance' },
        { value: 'recommerce', label: 'E-commerce' },
        { value: 'other', label: 'Other' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Hàm cập nhật role cho member
    const updateMemberRole = (email, role) => {
        setFormData(prev => ({
            ...prev,
            team_members: prev.team_members.map(member =>
                member.email === email ? { ...member, role } : member
            )
        }));
    };

    // Các hàm xử lý xóa cho product owner và scrum master
    const removeProductOwner = () => {
        setFormData(prev => ({
            ...prev,
            product_owner_email: '',
        }));
    };

    const removeScrumMaster = () => {
        setFormData(prev => ({
            ...prev,
            scrum_master_email: '',
        }));
    };

    // Cập nhật hàm removeMember để xử lý đối tượng member
    const removeMember = (email) => {
        setFormData(prev => ({
            ...prev,
            team_members: prev.team_members.filter(member => member.email !== email)
        }));
    };

    const removeClient = (client) => {
        setFormData(prev => ({
            ...prev,
            clients: prev.clients.filter(c => c !== client)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!formData.name || formData.name.trim() === '') {
            setError('Tên dự án không được để trống.');
            return;
        }
        if (!formData.start_date || !formData.end_date) {
            setError('Vui lòng nhập ngày bắt đầu và ngày kết thúc.');
            return;
        }
        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setError('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
            return;
        }
        setError('');
        // Validate required fields
        if (!formData.name || !formData.start_date || !formData.end_date) {
            setError('Vui lòng điền đầy đủ các trường bắt buộc.');
            return;
        }
        // Validate dates
        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);
        if (endDate < startDate) {
            setError('Ngày kết thúc phải sau ngày bắt đầu.');
            return;
        }

        // Get current user ID from token
        const token = localStorage.getItem('access_token');
        const tokenParts = token.split('.');
        const tokenPayload = JSON.parse(atob(tokenParts[1]));
        const currentUserId = tokenPayload.user_id;
        console.log(currentUserId)
        // Format project type and domain
        const finalProjectType = formData.project_type === 'other'
            ? `other: ${formData.project_type_other}`
            : formData.project_type;

        const finalDomain = formData.domain === 'other'
            ? `other: ${formData.domain_other}`
            : formData.domain;

        // Format team members according to ProjectMember model
        const formattedTeamMembers = formData.team_members.map(member => ({
            user_email: member.email,
            role: member.role
        }));

        // Format clients according to ProjectClient model
        const formattedClients = formData.clients.map(clientEmail => ({
            client_email: clientEmail
        }));

        const projectPayload = {
            ...formData, // Include all form data including id if it exists
            name: formData.name,
            description: formData.description,
            project_type: finalProjectType,
            goal: formData.goal,
            clients: formattedClients,
            product_owner_email: formData.product_owner_email,
            scrum_master_email: formData.scrum_master_email,
            team_members: formattedTeamMembers,
            start_date: formData.start_date,
            end_date: formData.end_date,
            team_size: formData.team_size,
            status: formData.status,
            priority: formData.priority,
            domain: finalDomain,
            budget: formData.budget,
            notes: formData.notes,
            created_by: currentUserId // Add created_by field
        };

        // Remove null or undefined values
        Object.keys(projectPayload).forEach(key => {
            if (projectPayload[key] === null || projectPayload[key] === undefined) {
                delete projectPayload[key];
            }
        });

        try {
            onSubmit(projectPayload);
            onClose();
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi gửi dữ liệu dự án.');
        }
    };

    // Cập nhật handleRecentEmailSelect để thêm role cho team members
    const handleRecentEmailSelect = (field, email) => {
        if (field === 'team_members_input') {
            // Khi chọn email từ gợi ý, thêm với role mặc định là developer
            if (!formData.team_members.some(member => member.email === email)) {
                setFormData(prev => ({
                    ...prev,
                    team_members: [...prev.team_members, { email, role: 'developer' }],
                    team_members_input: '' // Xóa input sau khi thêm
                }));
            }
            setShowRecentTeam(false); // Ẩn dropdown sau khi chọn
        } else if (field === 'client_input') {
            // Khi chọn client từ gợi ý, thêm vào danh sách clients
            if (!formData.clients.includes(email)) {
                setFormData(prev => ({
                    ...prev,
                    clients: [...prev.clients, email],
                    client_input: '' // Xóa input sau khi thêm
                }));
            }
            setShowRecentClient(false); // Ẩn dropdown sau khi chọn
        } else if (field === 'product_owner_input') {
            // Cập nhật cho product owner
            setFormData(prev => ({
                ...prev,
                product_owner_email: email,
                product_owner_input: ''  // Xóa input sau khi thêm
            }));
            setShowRecentOwner(false);
        } else if (field === 'scrum_master_input') {
            // Cập nhật cho scrum master
            setFormData(prev => ({
                ...prev,
                scrum_master_email: email,
                scrum_master_input: ''  // Xóa input sau khi thêm
            }));
            setShowRecentScrum(false);
        }
    };

    // Hàm xử lý thêm team member với Enter hoặc dấu phẩy
    const handleTeamMemberKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const email = formData.team_members_input.trim();
            if (email && !formData.team_members.some(member => member.email === email)) {
                setFormData(prev => ({
                    ...prev,
                    team_members: [...prev.team_members, { email, role: 'developer' }], // Role mặc định
                    team_members_input: ''
                }));
            } else {
                setFormData(prev => ({ ...prev, team_members_input: '' }));
            }
        }
    };

    return (
        <div className="create-project-form">
            <div className="create-project-form__overlay" onClick={onClose}></div>
            <div className="create-project-form__content">
                <div className="create-project-form__header">
                    <h2 className="create-project-form__title">
                        {isEditMode ? 'Edit Project' : 'Create New Project'}
                    </h2>
                    <button className="create-project-form__close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="create-project-form__body">
                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Project Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="create-project-form__input" required />
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="create-project-form__textarea" rows="4" />
                    </div>

                    {/* Project Type với tùy chọn nhập "Other" */}
                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Project Type</label>
                        <select name="project_type" value={formData.project_type} onChange={handleChange} className="create-project-form__input">
                            {PROJECT_TYPE_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>

                        {formData.project_type === 'other' && (
                            <input
                                type="text"
                                name="project_type_other"
                                value={formData.project_type_other}
                                onChange={handleChange}
                                className="create-project-form__input create-project-form__input--nested"
                                placeholder="Please specify project type"
                                required
                                style={{ marginTop: '10px' }}
                            />
                        )}
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Goal</label>
                        <textarea name="goal" value={formData.goal} onChange={handleChange} className="create-project-form__textarea" rows="3" />
                    </div>

                    {/* Client giữ nguyên */}
                    <div className="create-project-form__group" ref={clientRef}>
                        <label className="create-project-form__label">Client (email)</label>

                        <div className="create-project-form__tags-input-container">
                            <div className="create-project-form__tags-area">
                                {formData.clients.map(client => (
                                    <span key={client} className="create-project-form__tag">
                                        {client}
                                        <button
                                            type="button"
                                            className="create-project-form__tag-remove"
                                            onClick={() => removeClient(client)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    name="client_input"
                                    value={formData.client_input}
                                    onChange={handleChange}
                                    onFocus={() => setShowRecentClient(true)}
                                    className="create-project-form__tag-input"
                                    placeholder={formData.clients.length > 0 ? "" : "Type client email and press Enter to add"}
                                    onKeyDown={e => {
                                        // Thêm email khi nhấn Enter hoặc dấu phẩy
                                        if (e.key === 'Enter' || e.key === ',') {
                                            e.preventDefault();
                                            const email = formData.client_input.trim();
                                            if (email && !formData.clients.includes(email)) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    clients: [...prev.clients, email],
                                                    client_input: ''
                                                }));
                                            } else {
                                                setFormData(prev => ({ ...prev, client_input: '' }));
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {showRecentClient && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.client_input}
                                onSelect={email => handleRecentEmailSelect('client_input', email)}
                                selectedEmails={formData.clients}
                            />
                        )}
                    </div>

                    {/* Product Owner - giữ nguyên */}
                    <div className="create-project-form__group" ref={ownerRef}>
                        <label className="create-project-form__label">Product Owner (email)</label>

                        <div className="create-project-form__tags-input-container">
                            <div className="create-project-form__tags-area">
                                {formData.product_owner_email && (
                                    <span className="create-project-form__tag">
                                        {formData.product_owner_email}
                                        <button
                                            type="button"
                                            className="create-project-form__tag-remove"
                                            onClick={removeProductOwner}
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {!formData.product_owner_email && (
                                    <input
                                        type="text"
                                        name="product_owner_input"
                                        value={formData.product_owner_input}
                                        onChange={handleChange}
                                        onFocus={() => setShowRecentOwner(true)}
                                        className="create-project-form__tag-input"
                                        placeholder="Type product owner email"
                                        onKeyDown={e => {
                                            // Khi nhấn Enter hoặc dấu phẩy
                                            if (e.key === 'Enter' || e.key === ',') {
                                                e.preventDefault();
                                                const email = formData.product_owner_input.trim();
                                                if (email) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        product_owner_email: email,
                                                        product_owner_input: ''
                                                    }));
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {showRecentOwner && !formData.product_owner_email && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.product_owner_input}
                                onSelect={email => handleRecentEmailSelect('product_owner_input', email)}
                            />
                        )}
                    </div>

                    {/* Scrum Master - giữ nguyên */}
                    <div className="create-project-form__group" ref={scrumRef}>
                        <label className="create-project-form__label">Scrum Master (email)</label>

                        <div className="create-project-form__tags-input-container">
                            <div className="create-project-form__tags-area">
                                {formData.scrum_master_email && (
                                    <span className="create-project-form__tag">
                                        {formData.scrum_master_email}
                                        <button
                                            type="button"
                                            className="create-project-form__tag-remove"
                                            onClick={removeScrumMaster}
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {!formData.scrum_master_email && (
                                    <input
                                        type="text"
                                        name="scrum_master_input"
                                        value={formData.scrum_master_input}
                                        onChange={handleChange}
                                        onFocus={() => setShowRecentScrum(true)}
                                        className="create-project-form__tag-input"
                                        placeholder="Type scrum master email"
                                        onKeyDown={e => {
                                            // Khi nhấn Enter hoặc dấu phẩy
                                            if (e.key === 'Enter' || e.key === ',') {
                                                e.preventDefault();
                                                const email = formData.scrum_master_input.trim();
                                                if (email) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        scrum_master_email: email,
                                                        scrum_master_input: ''
                                                    }));
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {showRecentScrum && !formData.scrum_master_email && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.scrum_master_input}
                                onSelect={email => handleRecentEmailSelect('scrum_master_input', email)}
                            />
                        )}
                    </div>

                    {/* Team Members - cập nhật để thêm role */}
                    <div className="create-project-form__group" ref={teamRef}>
                        <label className="create-project-form__label">Team Members (email)</label>

                        <div className="create-project-form__tags-input-container">
                            <div className="create-project-form__tags-area">
                                {formData.team_members.map(member => (
                                    <div key={member.email} className="create-project-form__member-tag">
                                        <span className="create-project-form__tag">
                                            {member.email}
                                            <button
                                                type="button"
                                                className="create-project-form__tag-remove"
                                                onClick={() => removeMember(member.email)}
                                            >
                                                ×
                                            </button>
                                        </span>
                                        <select
                                            value={member.role}
                                            onChange={(e) => updateMemberRole(member.email, e.target.value)}
                                            className="create-project-form__role-select"
                                        >
                                            {MEMBER_ROLES.map(role => (
                                                <option key={role.value} value={role.value}>
                                                    {role.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    name="team_members_input"
                                    value={formData.team_members_input}
                                    onChange={handleChange}
                                    onFocus={() => setShowRecentTeam(true)}
                                    className="create-project-form__tag-input"
                                    placeholder={formData.team_members.length > 0 ? "" : "Type email and press Enter to add"}
                                    onKeyDown={handleTeamMemberKeyDown}
                                />
                            </div>
                        </div>

                        {showRecentTeam && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.team_members_input}
                                onSelect={email => handleRecentEmailSelect('team_members_input', email)}
                                selectedEmails={formData.team_members.map(m => m.email)}
                            />
                        )}
                    </div>

                    {/* Các phần khác giữ nguyên */}
                    <div className="create-project-form__row">
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Start Date</label>
                            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="create-project-form__input" required />
                        </div>
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">End Date</label>
                            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="create-project-form__input" required />
                        </div>
                    </div>

                    <div className="create-project-form__row">
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Team Size</label>
                            <input type="number" name="team_size" value={formData.team_size} onChange={handleChange} className="create-project-form__input" min="1" required />
                        </div>
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Budget</label>
                            <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="create-project-form__input" step="0.01" />
                        </div>
                    </div>

                    <div className="create-project-form__row">
                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="create-project-form__input">
                                {STATUS_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Priority</label>
                            <select name="priority" value={formData.priority} onChange={handleChange} className="create-project-form__input">
                                {PRIORITY_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="create-project-form__group">
                            <label className="create-project-form__label">Domain</label>
                            <select name="domain" value={formData.domain} onChange={handleChange} className="create-project-form__input">
                                {DOMAIN_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {formData.domain === 'other' && (
                                <input
                                    type="text"
                                    name="domain_other"
                                    value={formData.domain_other}
                                    onChange={handleChange}
                                    className="create-project-form__input create-project-form__input--nested"
                                    placeholder="Please specify domain"
                                    required
                                    style={{ marginTop: '10px' }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} className="create-project-form__textarea" rows="3" />
                    </div>

                    {error && (
                        <div className="create-project-form__error-message" role="alert" style={{
                            background: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid #fca5a5',
                            borderRadius: '6px',
                            padding: '12px',
                            marginBottom: '16px',
                            fontWeight: 500,
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(220,38,38,0.08)'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="create-project-form__actions">
                        <button type="button" className="create-project-form__cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="create-project-form__submit">
                            {isEditMode ? 'Update Project' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectForm;