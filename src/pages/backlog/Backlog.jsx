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
    <div className="backlog">
      <NavLeft activeView={activeView} setActiveView={setActiveView} />
      
      <div className="backlog__main">
        <NavTop />
        
        <div className="backlog__container">
          <div className="backlog__header">
            <h1 className="backlog__title">Backlog</h1>
            <div className="backlog__time-filter">
              <span className="backlog__time-filter-text">{timeFilter}</span>
              <svg className="backlog__time-filter-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="backlog__content">
            <BacklogColumn />
            <SprintColumn activeSprint="Sprint 1" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Backlog;