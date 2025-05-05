import React, { useState } from 'react';
import "../../assets/styles/pages/project/project.scss";

import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';


const Project = () => {
    const [activeView, setActiveView] = useState('project');
    const [timeFilter, setTimeFilter] = useState('This week');

    return (
        <div className="project-wrapper">
            <NavLeft activeView={activeView} setActiveView={setActiveView} />
            <div className="project-main">
                <NavTop />
                <div className="project-container">
                    <div className="project-header">
                        <h1>Project</h1>

                        <div className="time-filter">
                            <span>{timeFilter}</span>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;