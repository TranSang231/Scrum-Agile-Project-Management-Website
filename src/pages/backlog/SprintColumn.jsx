import '../../assets/styles/pages/backlog/backlog.scss';
import React from "react";

const SprintColumn = ({ activeSprint }) => {
  return (
    <div className="sprint-column">
      <button className="button create-sprint-btn">Create Sprint</button>

      <div className="sprint-container">
        <div className="sprint-header">
          <div className="sprint-title">
            <input id="sprint-toggle" type="checkbox" />
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <span>{activeSprint}</span>
          </div>

          <div className="sprint-actions">
            <button className="button">Run Sprint</button>
            <button className="button--icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 212 0z" />
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
              <button className="button--icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 212 0zm7 0a1 1 0 11-2 0 1 1 0 212 0zm7 0a1 1 0 11-2 0 1 1 0 212 0z" />
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
      </div>
    </div>
  );
};

export default SprintColumn;
