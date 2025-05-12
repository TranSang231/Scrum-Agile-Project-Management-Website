import '../../assets/styles/pages/backlog/sprintColumn.scss';
import React from "react";

const SprintColumn = ({ activeSprint }) => {
  return (
    <div className="sprint__column">
      <button className="sprint__button sprint__button--create">Create Sprint</button>

      <div className="sprint__container">
        <div className="sprint__header">
          <div className="sprint__title">
            <input id="sprint-toggle" type="checkbox" />
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <span>{activeSprint}</span>
          </div>

          <div className="sprint__actions">
            <button className="button">Run Sprint</button>
            <button className="button--icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 212 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sprint__card">
          <div className="sprint__task-header">
            <div className="sprint__task-info">
              <input type="checkbox" />
              <h3>Hero section</h3>
              <span className="sprint__badge sprint__badge--in-progress">In progress</span>
            </div>
            <div className="sprint__task-actions">
              <div className="avatar">AS</div>
              <button className="button--icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 212 0zm7 0a1 1 0 11-2 0 1 1 0 212 0zm7 0a1 1 0 11-2 0 1 1 0 212 0z" />
                </svg>
              </button>
            </div>
          </div>

          <ul className="sprint__subtask-list">
            <li className="sprint__subtask-item">
              <div className="sprint__subtask-info">
                <input type="checkbox" />
                <div>
                  <p className="sprint__subtask-title">Typography change</p>
                  <p className="sprint__subtask-status">To do</p>
                </div>
              </div>
              <div className="sprint__subtask-assignees">
                <div className="avatar violet">VH</div>
                <div className="avatar orange">AS</div>
              </div>
            </li>

            <li className="sprint__subtask-item">
              <div className="sprint__subtask-info">
                <input type="checkbox" />
                <div>
                  <p className="sprint__subtask-title">Implement design screens</p>
                  <p className="sprint__subtask-status">
                    <span className="sprint__badge sprint__badge--done">Done</span>
                  </p>
                </div>
              </div>
              <div className="sprint__subtask-assignees">
                <div className="avatar orange">AS</div>
              </div>
            </li>

            <li className="sprint__subtask-item">
              <div className="sprint__subtask-info">
                <input type="checkbox" />
                <div>
                  <p className="sprint__subtask-title">Proofread final text</p>
                  <p className="sprint__subtask-status">
                    <span className="sprint__badge sprint__badge--done">Done</span>
                  </p>
                </div>
              </div>
              <div className="sprint__subtask-assignees">
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
