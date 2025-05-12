import React from "react";
import "../../assets/styles/pages/backlog/backlogColumn.scss";

const BacklogColumn = () => {
  return (
    <section className="backlog-column">
      <div className="backlog-header">
        <h3>Product Backlog</h3>
    
      </div>

      <div className="epic">
        <div className="epic-header">
          <span className="label epic-label">EPIC</span>
          <button className="link">+ Add Story</button>
        </div>
        <h4>User Authentication System</h4>

        <div className="story">
          <span className="label story-label">STORY</span>
          <p>User Registration Flow</p>
        </div>

        <div className="story">
          <span className="label story-label">STORY</span>
          <p>Password Reset Feature</p>
        </div>
      </div>

      <div className="epic">
        <span className="label epic-label">EPIC</span>
        <h4>Payment Integration</h4>
        <button className="link">+ Add Story</button>
      </div>
     <div className="backlog-actions">
  <button className="btn btn-blue">+ Create Epic</button>
  <button className="btn btn-purple">+ Create User Story</button>
</div>

    </section>
  );
};

export default BacklogColumn;
