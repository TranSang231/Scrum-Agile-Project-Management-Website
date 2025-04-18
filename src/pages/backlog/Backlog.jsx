import React, { useState } from 'react';
import '../../assets/styles/pages/backlog/backlog.scss';
import NavTop from '../../components/layouts/NavTop';
import NavLeft from '../../components/layouts/NavLeft';
import BacklogColumn from './BacklogColumn';
import SprintColumn from './SprintColumn';

const Backlog = () => {
  const [activeView, setActiveView] = useState('backlog');
  const [timeFilter, setTimeFilter] = useState('This week');
  const [activeSprint] = useState('Sprint 1');
  const [currentView] = useState('This week');

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <NavLeft activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <NavTop />

        <div className="backlog-container">

          <div className="backlog-header">
            <h1>Backlog</h1>
            <div className="time-filter">
              <span>{timeFilter}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div class="backlog-content">

            {/* Backlog Column */}
            <BacklogColumn />

            {/* Sprint Column */}
            <SprintColumn activeSprint="Sprint 1" />

          </div>
        </div>
      </div>
      
      {/* Create Sprint Button for Mobile */}
      <button className="create-sprint-btn-mobile">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default Backlog;