import React, { useState } from "react";
import '../../assets/styles/pages/backlog/backlog.scss';
import CreateSprintModal from "../../pages/backlog/CreateSprintModal.jsx";
import DropDownMenu from "../../components/DropDownMenu.jsx";

// ✅ Thêm component xác nhận xoá vào đây (nếu tách file thì import)
const ConfirmDeleteModal = ({ onClose, onConfirm, sprint }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Xác nhận xóa Sprint</h2>
        <p>Bạn có chắc chắn muốn xóa sprint <strong>{sprint?.name || sprint}</strong> không?</p>
        <div className="modal-actions">
          <button className="button danger-btn" onClick={onConfirm}>Xác nhận</button>
          <button className="button cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

const SprintColumn = ({ activeSprint }) => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [sprints, setSprints] = useState([]);
  const [editingSprint, setEditingSprint] = useState(null);

  const [sprintToDelete, setSprintToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCreateSprint = () => {
    setShowForm(true);
  };

  const handleEditSprint = (sprint) => {
    setEditingSprint(sprint);
    setShowEditForm(true);
  };

  const handleFormSubmit = (sprintData) => {
    setSprints([...sprints, sprintData]);
    setShowForm(false);
  };

  const handleEditSubmit = (updatedSprint) => {
    setSprints(sprints.map(sprint =>
      sprint === editingSprint ? updatedSprint : sprint
    ));
    setShowEditForm(false);
  };

  const handleDeleteClick = (sprint) => {
    setSprintToDelete(sprint);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (sprintToDelete) {
      if (sprintToDelete === activeSprint) {
        console.log("Delete active sprint");
        // Xử lý xoá active sprint nếu cần
      } else {
        setSprints(sprints.filter(s => s !== sprintToDelete));
      }
    }
    setSprintToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="sprint-column">
      <button className="button create-sprint-btn" onClick={handleCreateSprint}>
        Create Sprint
      </button>

      {showForm && (
        <CreateSprintModal
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {showEditForm && (
        <CreateSprintModal
          sprint={editingSprint}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleEditSubmit}
          isEditMode={true}
        />
      )}

      {/* ✅ Modal xác nhận xoá */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          sprint={sprintToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className="sprint-container">
        {activeSprint && (
          <div className="sprint-block">
            <div className="sprint-header">
              <div className="sprint-title">
                <input id="sprint-toggle-active" type="checkbox" />
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span>{activeSprint}</span>
              </div>
              <div className="sprint-actions">
                <button className="button">Active Sprint</button>
                <DropDownMenu 
                  onEdit={() => handleEditSprint(activeSprint)}
                  onDelete={() => handleDeleteClick(activeSprint)}
                  type1={'horizontal'}
                />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
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
              </ul>
            </div>
          </div>
        )}

        {sprints.map((sprint, index) => (
          <div key={index} className="sprint-block">
            <div className="sprint-header">
              <div className="sprint-title">
                <input id={`sprint-toggle-${index}`} type="checkbox" />
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span>{sprint.name}</span>
              </div>
              <div className="sprint-actions">
                <button className="button">Run Sprint</button>
                <DropDownMenu 
                  onEdit={() => handleEditSprint(sprint)}
                  onDelete={() => handleDeleteClick(sprint)}
                  type1={'horizontal'}
                />
              </div>
            </div>

            <div className="sprint-details">
              {sprint.startDate && sprint.endDate && (
                <div className="sprint-dates">
                  <span>Start: {sprint.startDate}</span>
                  <span>End: {sprint.endDate}</span>
                </div>
              )}
              {sprint.goal && (
                <div className="sprint-goal">
                  <p>Goal: {sprint.goal}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SprintColumn;
