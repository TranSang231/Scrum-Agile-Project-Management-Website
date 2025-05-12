import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/components/project/createProjectForm.scss';
import RecentEmails from './RecentEmail';

// Sample user accounts for testing
const sampleUsers = [
    { id: 1, username: 'alice', email: 'alice@example.com' },
    { id: 2, username: 'bob', email: 'bob@example.com' },
    { id: 3, username: 'charlie', email: 'charlie@example.com' }
];

const CreateProjectForm = ({ onClose, onSubmit, users = sampleUsers }) => {
    
    const [showRecentOwner, setShowRecentOwner] = useState(false);
    const [showRecentScrum, setShowRecentScrum] = useState(false);
    const [showRecentTeam, setShowRecentTeam] = useState(false);
    const ownerRef = useRef(null);
    const scrumRef = useRef(null);
    const teamRef = useRef(null);

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
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        project_type: 'web',
        goal: '',
        client: '',
        product_owner_email: '',
        scrum_master_email: '',
        team_members_input: '',
        team_members: [],
        start_date: '',
        end_date: '',
        team_size: 1,
        status: 'active',
        priority: 'medium',
        domain: 'other',
        budget: '',
        notes: ''
    });

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
        { value: 'on hold', label: 'On Hold' },
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

    const handleMemberSelect = () => {
        const email = formData.team_members_input.trim();
        if (email) {
            const exists = users.find(u => u.email === email);
            if (exists && !formData.team_members.includes(email)) {
                setFormData(prev => ({
                    ...prev,
                    team_members: [...prev.team_members, email],
                    team_members_input: ''
                }));
            } else {
                setFormData(prev => ({ ...prev, team_members_input: '' }));
            }
        }
    };

    const removeMember = (email) => {
        setFormData(prev => ({
            ...prev,
            team_members: prev.team_members.filter(e => e !== email)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner = users.find(u => u.email === formData.product_owner_email);
        const scrum = users.find(u => u.email === formData.scrum_master_email);
        const memberIds = formData.team_members
            .map(email => users.find(u => u.email === email))
            .filter(u => u)
            .map(u => u.id);

        const payload = {
            name: formData.name,
            description: formData.description,
            project_type: formData.project_type,
            goal: formData.goal,
            client: formData.client,
            product_owner: owner ? owner.id : null,
            scrum_master: scrum ? scrum.id : null,
            team_members: memberIds,
            start_date: formData.start_date,
            end_date: formData.end_date,
            team_size: formData.team_size,
            status: formData.status,
            priority: formData.priority,
            domain: formData.domain,
            budget: formData.budget,
            notes: formData.notes,
            id: Date.now()
        };

        onSubmit(payload);
        onClose();
    };

    const handleRecentEmailSelect = (field, email) => {
        if (field === 'team_members_input') {
            // Khi chọn email từ gợi ý, thêm trực tiếp vào danh sách team_members
            if (!formData.team_members.includes(email)) {
                setFormData(prev => ({
                    ...prev,
                    team_members: [...prev.team_members, email],
                    team_members_input: '' // Xóa input sau khi thêm
                }));
            }
            setShowRecentTeam(false); // Ẩn dropdown sau khi chọn
        } else {
            // Xử lý cho product_owner và scrum_master vẫn giữ nguyên
            setFormData(prev => ({ ...prev, [field]: email }));
            if (field === 'product_owner_email') setShowRecentOwner(false);
            if (field === 'scrum_master_email') setShowRecentScrum(false);
        }
    };

    return (
        <div className="create-project-form">
            <div className="create-project-form__overlay" onClick={onClose}></div>
            <div className="create-project-form__content">
                <div className="create-project-form__header">
                    <h2 className="create-project-form__title">Create New Project</h2>
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

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Project Type</label>
                        <select name="project_type" value={formData.project_type} onChange={handleChange} className="create-project-form__input">
                            {PROJECT_TYPE_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Goal</label>
                        <textarea name="goal" value={formData.goal} onChange={handleChange} className="create-project-form__textarea" rows="3" />
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__label">Client</label>
                        <input type="text" name="client" value={formData.client} onChange={handleChange} className="create-project-form__input" />
                    </div>

                    {/* Product Owner */}
                    <div className="create-project-form__group" ref={ownerRef}>
                        <label className="create-project-form__label">Product Owner (email)</label>
                        <input
                            type="text"
                            name="product_owner_email"
                            value={formData.product_owner_email}
                            onChange={handleChange}
                            onFocus={() => setShowRecentOwner(true)}
                            className="create-project-form__input"
                            placeholder="Type email"
                        />
                        {showRecentOwner && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.product_owner_email}
                                onSelect={email => handleRecentEmailSelect('product_owner_email', email)}
                            />
                        )}
                    </div>

                    {/* Scrum Master */}
                    <div className="create-project-form__group" ref={scrumRef}>
                        <label className="create-project-form__label">Scrum Master (email)</label>
                        <input
                            type="text"
                            name="scrum_master_email"
                            value={formData.scrum_master_email}
                            onChange={handleChange}
                            onFocus={() => setShowRecentScrum(true)}
                            className="create-project-form__input"
                            placeholder="Type email"
                        />
                        {showRecentScrum && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.scrum_master_email}
                                onSelect={email => handleRecentEmailSelect('scrum_master_email', email)}
                            />
                        )}
                    </div>

                    {/* Team Members */}
                    <div className="create-project-form__group" ref={teamRef}>
                        <label className="create-project-form__label">Team Members (email)</label>
                        
                        <div className="create-project-form__tags-input-container">
                            <div className="create-project-form__tags-area">
                                {formData.team_members.map(email => (
                                    <span key={email} className="create-project-form__tag">
                                        {email}
                                        <button 
                                            type="button" 
                                            className="create-project-form__tag-remove"
                                            onClick={() => removeMember(email)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    name="team_members_input"
                                    value={formData.team_members_input}
                                    onChange={handleChange}
                                    onFocus={() => setShowRecentTeam(true)}
                                    className="create-project-form__tag-input"
                                    placeholder={formData.team_members.length > 0 ? "" : "Type email and press Enter to add"}
                                    onKeyDown={e => {
                                        // Thêm email khi nhấn Enter hoặc dấu phẩy
                                        if (e.key === 'Enter' || e.key === ',') {
                                            e.preventDefault();
                                            const email = formData.team_members_input.trim();
                                            if (email && !formData.team_members.includes(email)) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    team_members: [...prev.team_members, email],
                                                    team_members_input: ''
                                                }));
                                            } else {
                                                setFormData(prev => ({ ...prev, team_members_input: '' }));
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        
                        {showRecentTeam && (
                            <RecentEmails
                                emails={recentEmails}
                                searchInput={formData.team_members_input}
                                onSelect={email => handleRecentEmailSelect('team_members_input', email)}
                                selectedEmails={formData.team_members} // Truyền danh sách email đã chọn
                            />
                        )}
                    </div>

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
                            <label className="create-project-form__/label">Priority</label>
                            <select name="priority" value={formData.priority} onChange={handleChange} className="create-project-form__input">
                                {PRIORITY_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="create-project-form__group">
                            <label className="create-project-form__/label">Domain</label>
                            <select name="domain" value={formData.domain} onChange={handleChange} className="create-project-form__input">
                                {DOMAIN_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="create-project-form__group">
                        <label className="create-project-form__/label">Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} className="create-project-form__textarea" rows="3" />
                    </div>

                    <div className="create-project-form__actions">
                        <button type="button" className="create-project-form__cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="create-project-form__submit">Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectForm;
