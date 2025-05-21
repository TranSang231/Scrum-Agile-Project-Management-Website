import React, { useState } from "react";
import DropdownMenu from "../../components/DropDownMenu";
import "../../assets/styles/pages/backlog/backlogColumn.scss";

const BacklogColumn = () => {
  const [epics, setEpics] = useState([
    {
      id: 1,
      title: "User Authentication System",
      stories: [
        { title: "User Registration Flow", description: "Register with email and password." },
        { title: "Password Reset Feature", description: "Send reset link via email." },
      ],
      showForm: false,
      newStoryTitle: "",
      newStoryDescription: ""
    },
    {
      id: 2,
      title: "Payment Integration",
      stories: [],
      showForm: false,
      newStoryTitle: "",
      newStoryDescription: ""
    }
  ]);

  // State mới để hiển thị form tạo Epic mới
  const [showCreateEpicForm, setShowCreateEpicForm] = useState(false);
  // State mới lưu tiêu đề Epic mới đang nhập
  const [newEpicTitle, setNewEpicTitle] = useState("");

  // Các state và hàm hiện có giữ nguyên
  const [independentStories, setIndependentStories] = useState([]);
  const [showIndependentForm, setShowIndependentForm] = useState(false);
  const [newStory, setNewStory] = useState({ title: "", description: "" });

  // Hàm mở form tạo Epic mới
  const handleOpenCreateEpicForm = () => {
    setShowCreateEpicForm(true);
  };

  // Hàm hủy tạo Epic mới
  const handleCancelCreateEpic = () => {
    setNewEpicTitle("");
    setShowCreateEpicForm(false);
  };

  // Hàm lưu Epic mới khi bấm Save
  const handleSaveNewEpic = () => {
    if (newEpicTitle.trim() === "") {
      alert("Tiêu đề Epic không được để trống.");
      return;
    }
    const newEpic = {
      id: Date.now(),
      title: newEpicTitle.trim(),
      stories: [],
      showForm: false,
      newStoryTitle: "",
      newStoryDescription: ""
    };
    setEpics([...epics, newEpic]);
    setNewEpicTitle("");
    setShowCreateEpicForm(false);
  };

  // Các hàm khác giữ nguyên
  const handleAddStoryClick = (epicId) => {
    setEpics((prev) =>
      prev.map((epic) =>
        epic.id === epicId ? { ...epic, showForm: true } : epic
      )
    );
  };

  const handleInputChange = (epicId, field, value) => {
    setEpics((prev) =>
      prev.map((epic) =>
        epic.id === epicId ? { ...epic, [field]: value } : epic
      )
    );
  };

  const handleSaveStory = (epicId) => {
    setEpics((prev) =>
      prev.map((epic) => {
        if (epic.id === epicId) {
          const newStory = {
            title: epic.newStoryTitle,
            description: epic.newStoryDescription,
          };
          return {
            ...epic,
            stories: [...epic.stories, newStory],
            showForm: false,
            newStoryTitle: "",
            newStoryDescription: ""
          };
        }
        return epic;
      })
    );
  };

  const handleCreateIndependentStory = () => {
    setShowIndependentForm(true);
  };

  const handleSaveIndependentStory = () => {
    setIndependentStories([...independentStories, newStory]);
    setNewStory({ title: "", description: "" });
    setShowIndependentForm(false);
  };

  const handleEditEpic = (epicId) => {
    const newTitle = prompt("Chỉnh sửa tiêu đề EPIC:");
    if (newTitle) {
      setEpics((prev) =>
        prev.map((epic) =>
          epic.id === epicId ? { ...epic, title: newTitle } : epic
        )
      );
    }
  };

  const handleDeleteEpic = (epicId) => {
    setEpics((prev) => prev.filter((epic) => epic.id !== epicId));
  };

  const handleEditIndependentStory = (index) => {
    const newTitle = prompt("Chỉnh sửa tiêu đề:");
    const newDescription = prompt("Chỉnh sửa mô tả:");
    if (newTitle && newDescription) {
      const updated = [...independentStories];
      updated[index] = { title: newTitle, description: newDescription };
      setIndependentStories(updated);
    }
  };

  const handleDeleteIndependentStory = (index) => {
    const updated = [...independentStories];
    updated.splice(index, 1);
    setIndependentStories(updated);
  };

  return (
    <section className="backlog-column">
      <div className="backlog-header">
        <h3>Product Backlog</h3>
      </div>

      {epics.map((epic) => (
        <div className="epic" key={epic.id}>
          <div className="epic-header">
            <div className="epic-header-main">
              <h4>{epic.title}</h4>
              <button className="link" onClick={() => handleAddStoryClick(epic.id)}>
                + Add Story
              </button>
              <DropdownMenu
                onEdit={() => handleEditEpic(epic.id)}
                onDelete={() => handleDeleteEpic(epic.id)}
              />
            </div>
            <span className="label epic-label">EPIC</span>
          </div>

          {epic.stories.map((story, index) => (
            <div className="story" key={index}>
              <p className="story-title">{story.title}</p>
              <p className="story-desc">{story.description}</p>
              <span className="label story-label">STORY</span>
            </div>
          ))}

          {epic.showForm && (
            <div className="story-form">
              <input
                type="text"
                placeholder="Story title"
                value={epic.newStoryTitle}
                onChange={(e) =>
                  handleInputChange(epic.id, "newStoryTitle", e.target.value)
                }
              />
              <textarea
                placeholder="Story description"
                value={epic.newStoryDescription}
                onChange={(e) =>
                  handleInputChange(epic.id, "newStoryDescription", e.target.value)
                }
              />
              <button className="btn btn-purple" onClick={() => handleSaveStory(epic.id)}>
                Save
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Independent Stories */}
      {independentStories.map((story, index) => (
        <div className="story" key={index}>
          <p className="story-title">{story.title}</p>
          <p className="story-desc">{story.description}</p>
          <span className="label story-label">STORY</span>
          <DropdownMenu
            onEdit={() => handleEditIndependentStory(index)}
            onDelete={() => handleDeleteIndependentStory(index)}
          />
        </div>
      ))}

      {showIndependentForm && (
        <div className="story-form">
          <input
            type="text"
            placeholder="Story title"
            value={newStory.title}
            onChange={(e) =>
              setNewStory({ ...newStory, title: e.target.value })
            }
          />
          <textarea
            placeholder="Story description"
            value={newStory.description}
            onChange={(e) =>
              setNewStory({ ...newStory, description: e.target.value })
            }
          />
          <button className="btn btn-purple" onClick={handleSaveIndependentStory}>
            Save
          </button>
        </div>
      )}

      {/* Nút + Create Epic giờ thay bằng hiển thị form nhập tiêu đề Epic mới */}
      <div className="backlog-actions">
        {showCreateEpicForm ? (
          <div className="story-form" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              placeholder="Nhập tiêu đề Epic mới"
              value={newEpicTitle}
              onChange={(e) => setNewEpicTitle(e.target.value)}
              className="epic-title-input"
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-purple" onClick={handleSaveNewEpic}>
                Save
              </button>
              <button className="btn" onClick={handleCancelCreateEpic}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="btn" onClick={handleOpenCreateEpicForm}>
            + Create Epic
          </button>
        )}

        <button className="btn btn-purple" onClick={handleCreateIndependentStory}>
          + Create User Story
        </button>
      </div>
    </section>
  );
};

export default BacklogColumn;
