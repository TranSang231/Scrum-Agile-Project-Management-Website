import React, { useState, useEffect } from "react";
import "../../assets/styles/pages/backlog/backlog.scss";

const CreateSprintModal = ({ onClose, onSubmit, sprint, isEditMode = false }) => {
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sprintGoal, setSprintGoal] = useState("");

  useEffect(() => {
    if (isEditMode && sprint) {
      setSprintName(sprint.name || "");
      setStartDate(sprint.startDate || "");
      setEndDate(sprint.endDate || "");
      setStartTime(sprint.startTime || "");
      setEndTime(sprint.endTime || "");
      setSprintGoal(sprint.goal || "");
    }
  }, [isEditMode, sprint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSprint = {
      ...sprint,
      name: sprintName,
      startDate,
      endDate,
      startTime,
      endTime,
      goal: sprintGoal
    };
    onSubmit(updatedSprint);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditMode ? 'Edit Sprint' : 'Create Sprint'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sprint-name">Sprint name *</label>
            <input
              id="sprint-name"
              type="text"
              value={sprintName}
              onChange={(e) => setSprintName(e.target.value)}
              required
              placeholder="Enter sprint name"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <div className="date-time-inputs">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="time-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>End Time</label>
            <div className="date-time-inputs">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="time-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Sprint Goal</label>
            <textarea
              value={sprintGoal}
              onChange={(e) => setSprintGoal(e.target.value)}
              className="form-control"
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="button primary-btn">
              {isEditMode ? 'Save Changes' : 'Start'}
            </button>
            <button type="button" className="button cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSprintModal;
