import React from "react"; 
import "../../assets/styles/pages/backlog/sprintColumn.scss";

const SprintColumn = () => {
  return (
    <section className="sprint-column">
      <div className="sprint-header">
        <h3>Sprint</h3>
        <button className="btn btn-green">+ Create Sprint</button>
      </div>

      <div className="sprint">
        <div className="sprint-info">
          <div>
            <h4>Sprint 1</h4>
            <p>May 1 - May 14, 2025</p>
          </div>
          <div className="sprint-actions">
            <button className="btn btn-small btn-green">▶ Run Sprint</button>
            <span className="sprint-status planning">In Planning</span>
          </div>
        </div>

        <div className="story">
          <div className="story-header">
            <span className="label story-label">STORY</span>
            <button className="link">+ Add Task</button>
          </div>
          <p>User Registration Flow</p>
          <div className="task-list">
            <div className="task">
              <span className="label task-label">TASK</span>
              Design Registration Form
            </div>
            <div className="task">
              <span className="label task-label">TASK</span>
              Implement Form Validation
            </div>
          </div>
        </div>
      </div>

      <div className="sprint">
        <div className="sprint-info">
          <div>
            <h4>Sprint 2</h4>
            <p>May 15 - May 28, 2025</p>
          </div>
          <div className="sprint-actions">
            <button className="btn btn-small btn-green">▶ Run Sprint</button>
            <span className="sprint-status not-started">Not Started</span>
          </div>
        </div>

        <div className="story">
          <div className="story-header">
            <span className="label story-label">STORY</span>
            <button className="link">+ Add Task</button>
          </div>
          <p>[Story Title Here]</p>
        </div>
      </div>
    </section>
  );
};

export default SprintColumn;
