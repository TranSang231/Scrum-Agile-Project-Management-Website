import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';
import '../../assets/styles/pages/dashboard/Dashboard.scss';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="dashboard-wrapper">
            <NavLeft activeView={activeView} setActiveView={setActiveView} />
            <div className="dashboard-main">
                <NavTop />
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <h1>Dashboard</h1>
                        <div className="welcome-message">
                            Welcome back, {user?.email}!
                        </div>
                    </div>

                    <div className="dashboard-content">
                        <div className="stats-cards">
                            <div className="stat-card">
                                <h3>Active Tasks</h3>
                                <div className="number">12</div>
                            </div>
                            <div className="stat-card">
                                <h3>Completed Tasks</h3>
                                <div className="number">24</div>
                            </div>
                            <div className="stat-card">
                                <h3>In Progress</h3>
                                <div className="number">8</div>
                            </div>
                        </div>

                        <div className="recent-activities">
                            <h2>Recent Activities</h2>
                            <div className="activity-list">
                                <div className="activity-item">
                                    <span className="time">2 hours ago</span>
                                    <span className="description">Updated task "Implement login functionality"</span>
                                </div>
                                <div className="activity-item">
                                    <span className="time">4 hours ago</span>
                                    <span className="description">Completed task "Design database schema"</span>
                                </div>
                                <div className="activity-item">
                                    <span className="time">1 day ago</span>
                                    <span className="description">Assigned to new task "Fix UI bugs"</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 