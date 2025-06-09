import React, { useState } from 'react';
import "../../assets/styles/pages/kanban/kanban.scss";

import NavLeft from '../../components/layouts/NavLeft.jsx';
import NavTop from '../../components/layouts/NavTop.jsx';
import EditTaskForm from '../../components/backlog/EditTaskForm.jsx';
import KanbanColumn from './KanbanColumn.jsx';

const Kanban = () => {
  const [activeView, setActiveView] = useState('kanban');
  const [timeFilter, setTimeFilter] = useState('This week');
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [createTask, setCreateTask] = useState(false);

  const [listOfProjects, setListOfProjects] = useState([
    { id: 'project1', name: 'Project A' },
    { id: 'project2', name: 'Project B' },
    { id: 'project3', name: 'Project C' },
  ]);

  const [listOfUsers, setListOfUsers] = useState([
    { id: 'user1', name: 'Vinh Hoang' },
    { id: 'user2', name: 'John Doe' },
    { id: 'user3', name: 'Mary Lee' },
  ]);

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

  // Mở form thêm task
  const handleAddTask = (columnId) => {
    setSelectedColumnId(columnId);
    setCreateTask(true);
  };

  const handleEditSave = (taskId, updatedTask) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      }))
    );
  };

  return (
    <div className="kanban">
      <NavLeft activeView={activeView} setActiveView={setActiveView} />
      <div className="kanban__main">
        <NavTop />
        <div className="kanban__container">
          <div className="kanban__header">
            <h1 className="kanban__title">Kanban</h1>
            <div className="kanban__time-filter">
              <span className="kanban__time-filter-text">{timeFilter}</span>
              <svg className="kanban__time-filter-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Sử dụng KanbanColumn để quản lý cột */}
          <KanbanColumn
            columns={columns}
            setColumns={setColumns}
            onAddTask={handleAddTask}
          />

          {/* Hiển thị form thêm task */}
          {
            createTask && (
              <EditTaskForm
                isCreating={true}
                onSave={(newTask) => {
                  setColumns(columns.map(col =>
                    col.id === selectedColumnId
                      ? { ...col, tasks: [...col.tasks, newTask] }
                      : col
                  ));
                  setCreateTask(false);
                }}
                onCancel={() => setCreateTask(false)}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Kanban;
