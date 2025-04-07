import React, { useState } from 'react';
import "../../assets/styles/kanban/kanban.css";
import NavbarLeft from './Navbar-left.jsx';
import Navtop from './Navtop.jsx';

const Kanban = () => {
  const [timeFilter, setTimeFilter] = useState('This week');

  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To do',
      tasks: [
        {
          id: 'task1',
          title: 'Hero section',
          type: 'design-system',
          typeLabel: 'DESIGN SYSTEM',
          description: 'Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.',
          assignees: [
            { id: 'user1', initials: 'VH', color: '#3b82f6' },
            { id: 'user2', initials: 'JD', color: '#f97316' },
          ]
        },
        {
          id: 'task2',
          title: 'Typography change',
          type: 'typography',
          typeLabel: 'TYPOGRAPHY',
          description: 'Modify typography and styling of text placed on 6 screens of the website design. Prepare a documentation.',
          assignees: [
            { id: 'user3', initials: 'ML', color: '#ec4899' },
          ]
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In progress',
      tasks: [
        {
          id: 'task3',
          title: 'Implement design screens',
          type: 'development',
          typeLabel: 'DEVELOPMENT',
          description: 'Our designers created 6 screens for a website that needs to be implemented by our dev team.',
          assignees: [
            { id: 'user1', initials: 'VH', color: '#3b82f6' },
            { id: 'user4', initials: 'JK', color: '#10b981' },
          ]
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 'task4',
          title: 'Fix bugs in the CSS code',
          type: 'development',
          typeLabel: 'DEVELOPMENT',
          description: 'Fix small bugs that are essential to prepare for the next release that will happen this quarter.',
          assignees: [
            { id: 'user5', initials: 'RV', color: '#ef4444' },
            { id: 'user2', initials: 'JD', color: '#f97316' },
          ]
        },
        {
          id: 'task5',
          title: 'Proofread final text',
          type: 'typography',
          typeLabel: 'TYPOGRAPHY',
          description: 'The text provided by marketing department needs to be proofread so that we make sure that it fits into our design.',
          assignees: [
            { id: 'user2', initials: 'JD', color: '#f97316' },
          ]
        },
        {
          id: 'task6',
          title: 'Responsive design',
          type: 'design-system',
          typeLabel: 'DESIGN SYSTEM',
          description: 'All designs need to be responsive. The requirement is that it fits all web and mobile screens.',
          assignees: [
            { id: 'user1', initials: 'VH', color: '#3b82f6' },
            { id: 'user2', initials: 'JD', color: '#f97316' },
          ]
        }
      ]
    }
  ]);

  const renderTaskCard = (task) => (
    <div className="task-card" key={task.id}>
      <div className="task-header">
        <div className={`task-type task-type-${task.type}`}>
          {task.typeLabel}
        </div>
        <button className="icon-button">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <div className="task-assignees">
          {task.assignees.map((user, index) => (
            <div
              key={user.id}
              className="task-assignee"
              style={{
                backgroundColor: user.color,
                zIndex: task.assignees.length - index,
                marginLeft: index > 0 ? '-8px' : '0'
              }}
            >
              {user.initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="kanban-wrapper">
      <NavbarLeft />
      <div className="kanban-main">
        <Navtop />
        <div className="kanban-container">
          <div className="kanban-header">
            <h1>Kanban</h1>
            <div className="time-filter">
              <span>{timeFilter}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
          <div className="kanban-board">
            {columns.map(column => (
              <div className="task-column" key={column.id}>
                <div className="column-header">
                  <div className="column-title">{column.title}</div>
                  <div className="column-actions">
                    <button className="icon-button">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <button className="icon-button">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="column-content">
                  {column.tasks.map(task => renderTaskCard(task))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
