import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../assets/styles/pages/dashboard/AdminDashboard.scss';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard-container">
            <nav className="navbar">
                <div className="navbar-brand">Scrum Agile Project Management</div>
                <div className="navbar-right">
                    <div className="user-info">
                        {user?.email} ({user?.role})
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="dashboard-content">
                <div className="sidebar">
                    <div className="menu-item" onClick={() => navigate('/projects')}>
                        Projects
                    </div>
                    <div className="menu-item" onClick={() => navigate('/teams')}>
                        Teams
                    </div>
                    <div className="menu-item" onClick={() => navigate('/users')}>
                        Users
                    </div>
                    <div className="menu-item" onClick={() => navigate('/sprints')}>
                        Sprints
                    </div>
                    <div className="menu-item" onClick={() => navigate('/reports')}>
                        Reports
                    </div>
                    <div className="menu-item" onClick={() => navigate('/settings')}>
                        Settings
                    </div>
                </div>

                <div className="main-content">
                    <div className="welcome-section">
                        <h1>Welcome, {user?.email}!</h1>
                        <p>Manage your projects and teams efficiently.</p>
                    </div>

                    <div className="stats-cards">
                        <div className="stat-card">
                            <h3>Active Projects</h3>
                            <div className="number">5</div>
                        </div>
                        <div className="stat-card">
                            <h3>Total Teams</h3>
                            <div className="number">8</div>
                        </div>
                        <div className="stat-card">
                            <h3>Active Users</h3>
                            <div className="number">24</div>
                        </div>
                        <div className="stat-card">
                            <h3>Current Sprint</h3>
                            <div className="number">Sprint 3</div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="action-buttons">
                            <button className="action-btn" onClick={() => navigate('/projects/new')}>
                                Create New Project
                            </button>
                            <button className="action-btn" onClick={() => navigate('/teams/new')}>
                                Create New Team
                            </button>
                            <button className="action-btn" onClick={() => navigate('/users/invite')}>
                                Invite Users
                            </button>
                        </div>
                    </div>

                    <div className="recent-activities">
                        <h2>Recent Activities</h2>
                        <div className="activity-list">
                            <div className="activity-item">
                                <span className="time">2 hours ago</span>
                                <span className="description">Created new project "E-commerce Platform"</span>
                            </div>
                            <div className="activity-item">
                                <span className="time">4 hours ago</span>
                                <span className="description">Updated team "Frontend Developers"</span>
                            </div>
                            <div className="activity-item">
                                <span className="time">1 day ago</span>
                                <span className="description">Started new sprint "Sprint 3"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 