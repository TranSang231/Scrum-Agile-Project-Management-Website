import React, { useState } from 'react';
import '../../assets/styles/components/backlog/sprintCard.scss';
import DropdownMenu from '../DropDownMenu';
import axios from 'axios';

const SprintCard = ({ sprint, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const API_URL = 'http://localhost:8000/api';

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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    try {
      const userStoryData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      // Update the user story with the sprint ID
      const response = await axios.put(
        `${API_URL}/user-stories/${userStoryData.id}/`,
        {
          ...userStoryData,
          sprint: sprint.id
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Add the user story to the sprint's list
      setUserStories([...userStories, response.data]);
    } catch (error) {
      console.error('Error adding user story to sprint:', error);
    }
  };

  const status = getStatusBadge();

  return (
    <div 
      className="sprint-card"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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

            <div className="sprint-card__user-stories">
              <h4 className="sprint-card__user-stories-title">User Stories</h4>
              {userStories.length > 0 ? (
                <ul className="sprint-card__user-stories-list">
                  {userStories.map(story => (
                    <li key={story.id} className="sprint-card__user-story">
                      {story.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="sprint-card__no-stories">No user stories in this sprint</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintCard; 