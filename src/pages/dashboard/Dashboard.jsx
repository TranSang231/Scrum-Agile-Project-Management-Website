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
        <div className="dashboard">
            <NavLeft activeView={activeView} setActiveView={setActiveView} />
            <div className="dashboard__main">
                <NavTop />
                <div className="dashboard__container">
                    <div className="dashboard__header">
                        <h1 className="dashboard__title">Dashboard</h1>
                        <div className="dashboard__welcome">
                            Welcome back, {user?.email}!
                        </div>
                    </div>

                    <div className="dashboard__content">
                        <div className="dashboard__stats">
                            <div className="dashboard__stat-card">
                                <h3 className="dashboard__stat-title">Active Tasks</h3>
                                <div className="dashboard__stat-value">12</div>
                            </div>
                            <div className="dashboard__stat-card">
                                <h3 className="dashboard__stat-title">Completed Tasks</h3>
                                <div className="dashboard__stat-value">24</div>
                            </div>
                            <div className="dashboard__stat-card">
                                <h3 className="dashboard__stat-title">In Progress</h3>
                                <div className="dashboard__stat-value">8</div>
                            </div>
                        </div>

                        <div className="dashboard__activities">
                            <h2 className="dashboard__activities-title">Recent Activities</h2>
                            <div className="dashboard__activity-list">
                                <div className="dashboard__activity-item">
                                    <span className="dashboard__activity-time">2 hours ago</span>
                                    <span className="dashboard__activity-desc">Updated task "Implement login functionality"</span>
                                </div>
                                <div className="dashboard__activity-item">
                                    <span className="dashboard__activity-time">4 hours ago</span>
                                    <span className="dashboard__activity-desc">Completed task "Design database schema"</span>
                                </div>
                                <div className="dashboard__activity-item">
                                    <span className="dashboard__activity-time">1 day ago</span>
                                    <span className="dashboard__activity-desc">Assigned to new task "Fix UI bugs"</span>
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