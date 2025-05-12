import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/pages/kanban/kanbanColumn.scss';
import TaskCard from '../../components/TaskCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const KanbanColumn = ({ 
  columns, 
  setColumns, 
  onAddTask 
}) => {

  // State để quản lý tiêu đề cột mới và trạng thái hiển thị form thêm cột
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [editColumnId, setEditColumnId] = useState(null);
  const [editColumnTitle, setEditColumnTitle] = useState('');

  // Thêm cột mới
  const handleAddColumn = () => {
    if (newColumnTitle.trim() === '') return;
    
    const newColumn = {
      id: `column-${Date.now()}`,
      title: newColumnTitle,
      tasks: []
    };
    
    setColumns([...columns, newColumn]);
    setNewColumnTitle('');
    setShowAddColumn(false);
  };

  // Xóa cột
  const handleDeleteColumn = (columnId) => {
    if (window.confirm('Bạn có chắc muốn xóa cột này?')) {
      setColumns(columns.filter(column => column.id !== columnId));
    }
  };

  // Mở form chỉnh sửa tiêu đề cột
  const handleEditColumnStart = (column) => {
    setEditColumnId(column.id);
    setEditColumnTitle(column.title);
  };

  // Lưu tiêu đề cột sau khi chỉnh sửa
  const handleEditColumnSave = () => {
    if (editColumnTitle.trim() === '') return;
    
    setColumns(columns.map(column => 
      column.id === editColumnId 
        ? { ...column, title: editColumnTitle } 
        : column
    ));
    
    setEditColumnId(null);
    setEditColumnTitle('');
  };

  return (
    <div className="kanban-columns">
      <div className="kanban-columns__board">
        {columns.map(column => (
          <div className="kanban-columns__column" key={column.id}>
            <div className="kanban-columns__header">
              {editColumnId === column.id ? (
                <div className="kanban-form__edit-column">
                  <input
                    type="text"
                    value={editColumnTitle}
                    onChange={(e) => setEditColumnTitle(e.target.value)}
                    autoFocus
                  />
                  <button className="button button--save" onClick={handleEditColumnSave}>Lưu</button>
                  <button className="button button--cancel" onClick={() => setEditColumnId(null)}>Hủy</button>
                </div>
              ) : (
                <div className="kanban-columns__title">{column.title}</div>
              )}
              {editColumnId !== column.id ? (
                <div className="kanban-columns__actions">
                  <button 
                    className="kanban-columns__action-button"
                    onClick={() => onAddTask(column.id)}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  
                  <button 
                    className="kanban-columns__action-button"
                    onClick={() => handleEditColumnStart(column)}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>

                  <button 
                    className="kanban-columns__action-button"
                    onClick={() => handleDeleteColumn(column.id)}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>

            <div className="kanban-columns__content">
              {column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEditSave={(updatedTask) => {
                    setColumns(columns.map(col => 
                      col.id === column.id 
                        ? { ...col, tasks: col.tasks.map(t => t.id === task.id ? updatedTask : t) } 
                        : col
                    ));
                  }}
                  onDelete={(taskId) => {
                    setColumns(columns.map(col => 
                      col.id === column.id 
                        ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) } 
                        : col
                    ));
                  }}
                />
              ))}
            </div>
          </div>
        ))}
          
        {!showAddColumn ? (
          <div className="kanban-form__add-column">
            <button className="button button--primary" onClick={() => setShowAddColumn(true)}>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="kanban-form__add-column-form">
            <input
              className="kanban-form__input"
              type="text"
              placeholder="Tiêu đề cột"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              autoFocus
            />
            <div className="kanban-form__actions">
              <button 
                className="button button--save"
                onClick={handleAddColumn}>Thêm cột</button>
              <button 
                className="button button--cancel"
                onClick={() => setShowAddColumn(false)}>Hủy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

KanbanColumn.propTypes = {
  columns: PropTypes.array.isRequired,
  setColumns: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired
};

export default KanbanColumn;