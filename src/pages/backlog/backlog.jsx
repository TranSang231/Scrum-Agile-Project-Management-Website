import React, { useState } from 'react';
import '../../assets/styles/backlog/backlog.css';
import NavTop from './Navtop';
import NavbarLeft from './Navbar-left';

const ProjectManagementUI = () => {
  const [activeSprint] = useState('Sprint 1');
  const [currentView] = useState('This week');
  
  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <NavbarLeft />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <NavTop />

        <div className="content-area">
          {/* Backlog Column */}
          <div className="backlog-column">
            <div className="column-header">
              <h1 className="page-title">Backlog</h1>
              <div className="dropdown">
                <span>{currentView}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="backlog-content">
              <div className="section-header">
                <h2 className="section-title">Product Backlog</h2>
                <div className="section-actions">
                  <button className="icon-button">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="icon-button">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="backlog-card green">
                <div className="card-header">
                  <h3 className="card-title">Hero section</h3>
                  <button className="icon-button">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
                <p className="card-description">Create a design system for a hero section in 2 different variants.</p>
              </div>
              
              <div className="backlog-card blue">
                <div className="card-header">
                  <h3 className="card-title">Typography change</h3>
                  <button className="icon-button">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
                <p className="card-description">Create a design system for a hero section in 2 different variants.</p>
              </div>
              
              <button className="create-task-btn">Create Task</button>
            </div>
          </div>
          
          {/* Sprint Column */}
          <div className="sprint-column">

            <button className="create-sprint-btn">Create Sprint</button>

            <div className="sprint-header">
              <div className="sprint-title">
                <input id="sprint-toggle" type="checkbox" />
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span>{activeSprint}</span>
              </div>
              
              <div className="sprint-actions">
                <button className="run-sprint-btn">Run Sprint</button>
                <button className="icon-button">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="sprint-card">
              <div className="task-header">
                <div className="task-info">
                  <input type="checkbox" />
                  <h3>Hero section</h3>
                  <span className="status-badge in-progress">In progress</span>
                </div>
                <div className="task-actions">
                  <div className="avatar">AS</div>
                  <button className="icon-button">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <ul className="subtask-list">
                <li className="subtask-item">
                  <div className="subtask-info">
                    <input type="checkbox" />
                    <div>
                      <p className="subtask-title">Typography change</p>
                      <p className="subtask-status">To do</p>
                    </div>
                  </div>
                  <div className="subtask-assignees">
                    <div className="avatar violet">VH</div>
                    <div className="avatar orange">AS</div>
                  </div>
                </li>
                
                <li className="subtask-item">
                  <div className="subtask-info">
                    <input type="checkbox" />
                    <div>
                      <p className="subtask-title">Implement design screens</p>
                      <p className="subtask-status">
                        <span className="status-badge done">Done</span>
                      </p>
                    </div>
                  </div>
                  <div className="subtask-assignees">
                    <div className="avatar orange">AS</div>
                  </div>
                </li>
                
                <li className="subtask-item">
                  <div className="subtask-info">
                    <input type="checkbox" />
                    <div>
                      <p className="subtask-title">Proofread final text</p>
                      <p className="subtask-status">
                        <span className="status-badge done">Done</span>
                      </p>
                    </div>
                  </div>
                  <div className="subtask-assignees">
                    <div className="avatar orange">AS</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <button className="create-issue-btn">
              <span className="plus-icon">+</span>
              Create issue
            </button>
          </div>
        </div>
      </div>
      
      {/* Create Sprint Button for Desktop */}
      
      
      {/* Create Sprint Button for Mobile */}
      <button className="create-sprint-btn-mobile">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default ProjectManagementUI;