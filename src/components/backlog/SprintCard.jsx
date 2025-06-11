import React, { useState } from 'react';
import '../../assets/styles/components/backlog/sprintCard.scss';
import DropdownMenu from '../DropDownMenu';
import UserStoryCard from './UserStoryCard';

const SprintCard = ({ sprint, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = () => {
    if (sprint.is_completed) {
      return { text: 'Completed', class: 'status--completed' };
    }
    if (sprint.is_active) {
      return { text: 'Active', class: 'status--active' };
    }
    return { text: 'Planned', class: 'status--planned' };
  };

  const status = getStatusBadge();

  return (
    <div className="sprint-card">
      <div className="sprint-card__header">
        <div className="sprint-card__title">
          <input 
            type="checkbox" 
            id={`sprint-toggle-${sprint.id}`}
            className="sprint-card__toggle"
            checked={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
          />
          <label 
            htmlFor={`sprint-toggle-${sprint.id}`}
            className="sprint-card__toggle-label"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </label>
          <h3 className="sprint-card__name">{sprint.name}</h3>
          <span className={`sprint-card__status ${status.class}`}>
            {status.text}
          </span>
        </div>

        <div className="sprint-card__actions">
          {!sprint.is_completed && (
            <button className="sprint-card__button sprint-card__button--run">
              {sprint.is_active ? 'Complete Sprint' : 'Start Sprint'}
            </button>
          )}
          <DropdownMenu
            onEdit={() => onEdit(sprint)}
            onDelete={() => onDelete(sprint.id)}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="sprint-card__content">
          <div className="sprint-card__info">
            <div className="sprint-card__dates">
              <div className="sprint-card__date">
                <span className="sprint-card__date-label">Start:</span>
                <span className="sprint-card__date-value">{formatDate(sprint.start_date)}</span>
              </div>
              <div className="sprint-card__date">
                <span className="sprint-card__date-label">End:</span>
                <span className="sprint-card__date-value">{formatDate(sprint.end_date)}</span>
              </div>
            </div>

            {sprint.goal && (
              <div className="sprint-card__goal">
                <h4 className="sprint-card__goal-title">Sprint Goal</h4>
                <p className="sprint-card__goal-text">{sprint.goal}</p>
              </div>
            )}
          </div>

          <div className="sprint-card__user-stories">
            <div className="sprint-card__section-header">
              <h4 className="sprint-card__section-title">User Stories</h4>
              <button className="sprint-card__button sprint-card__button--add">
                + Add User Story
              </button>
            </div>
            <div className="sprint-card__user-stories-list">
              {sprint.user_stories?.map(userStory => (
                <UserStoryCard
                  key={userStory.id}
                  userStory={userStory}
                  isInSprint={true}
                />
              ))}
            </div>
          </div>

          <div className="sprint-card__tasks">
            <div className="sprint-card__section-header">
              <h4 className="sprint-card__section-title">Tasks</h4>
              <button className="sprint-card__button sprint-card__button--add">
                + Add Task
              </button>
            </div>
            <div className="sprint-card__tasks-list">
              {sprint.tasks?.map(task => (
                <div key={task.id} className="sprint-card__task">
                  <div className="sprint-card__task-info">
                    <input type="checkbox" checked={task.is_completed} />
                    <span className="sprint-card__task-title">{task.title}</span>
                  </div>
                  <div className="sprint-card__task-meta">
                    <span className={`sprint-card__task-status status--${task.status}`}>
                      {task.status}
                    </span>
                    {task.assignee && (
                      <div className="sprint-card__task-assignee">
                        {task.assignee.username}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintCard; 