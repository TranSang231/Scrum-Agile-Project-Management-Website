import React, { useState } from "react";
import DropdownMenu from "../../components/DropDownMenu"; // Đường dẫn import DropdownMenu tùy chỉnh
import "../../assets/styles/pages/backlog/sprintColumn.scss";

const initialSprints = [
  {
    name: "Sprint 1",
    duration: "May 1 - May 15",
    tasks: [
      {
        title: "Setup project",
        time: "2 days",
        member: "Alice",
        status: "Done",
      },
      {
        title: "Create wireframes",
        time: "3 days",
        member: "Bob",
        status: "In Progress",
      },
    ],
  },
  {
    name: "Sprint 2",
    duration: "May 16 - May 31",
    tasks: [],
  },
];

const SprintColumn = () => {
  const [sprints, setSprints] = useState(initialSprints);
  const [showSprintForm, setShowSprintForm] = useState(false);
  const [newSprint, setNewSprint] = useState({ name: "", duration: "" });

  const [activeTaskFormIndex, setActiveTaskFormIndex] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    member: "",
    status: "In Planning",
  });

  // Thêm sprint mới
  const handleCreateSprint = () => {
    if (!newSprint.name.trim() || !newSprint.duration.trim()) return;
    setSprints([...sprints, { ...newSprint, tasks: [] }]);
    setNewSprint({ name: "", duration: "" });
    setShowSprintForm(false);
  };

  // Thêm task mới cho sprint tại index
  const handleAddTask = (index, task) => {
    if (!task.title.trim()) return;
    const updatedSprints = [...sprints];
    updatedSprints[index].tasks.push(task);
    setSprints(updatedSprints);
  };

  // Xóa sprint
  const handleDeleteSprint = (index) => {
    const updated = sprints.filter((_, i) => i !== index);
    setSprints(updated);
  };

  // Xóa task
  const handleDeleteTask = (sprintIndex, taskIndex) => {
    const updatedSprints = [...sprints];
    updatedSprints[sprintIndex].tasks.splice(taskIndex, 1);
    setSprints(updatedSprints);
  };

  // Sửa sprint (ví dụ sửa tên/duration)
  const handleEditSprint = (index, updatedSprint) => {
    const updatedSprints = [...sprints];
    updatedSprints[index] = { ...updatedSprint, tasks: updatedSprints[index].tasks };
    setSprints(updatedSprints);
  };

  // Sửa task
  const handleEditTask = (sprintIndex, taskIndex, updatedTask) => {
    const updatedSprints = [...sprints];
    updatedSprints[sprintIndex].tasks[taskIndex] = updatedTask;
    setSprints(updatedSprints);
  };

  return (
    <section className="sprint-column">
      <div className="sprint-header">
        <h3>Sprint</h3>
        <button
          className="btn btn-green"
          onClick={() => setShowSprintForm(!showSprintForm)}
        >
          + Create Sprint
        </button>
      </div>

      {showSprintForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Sprint Name"
            value={newSprint.name}
            onChange={(e) =>
              setNewSprint({ ...newSprint, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration (e.g. May 21 - Jun 4)"
            value={newSprint.duration}
            onChange={(e) =>
              setNewSprint({ ...newSprint, duration: e.target.value })
            }
          />
          <button className="btn btn-green" onClick={handleCreateSprint}>
            Save Sprint
          </button>
        </div>
      )}

      {sprints.map((sprint, sIndex) => (
        <div className="sprint" key={sIndex}>
          <div className="sprint-info">
            <div>
              <h4>{sprint.name}</h4>
              <p>{sprint.duration}</p>
            </div>
            <div className="sprint-actions">
              <button className="btn btn-small btn-green">▶ Run Sprint</button>

              {/* DropdownMenu sửa / xóa Sprint */}
              <DropdownMenu
                items={[
                  {
                    label: "Edit Sprint",
                    onClick: () => {
                      const newName = prompt(
                        "Edit Sprint Name:",
                        sprint.name
                      );
                      const newDuration = prompt(
                        "Edit Duration:",
                        sprint.duration
                      );
                      if (newName && newDuration) {
                        handleEditSprint(sIndex, {
                          name: newName,
                          duration: newDuration,
                        });
                      }
                    },
                  },
                  {
                    label: "Delete Sprint",
                    onClick: () => {
                      if (
                        window.confirm(
                          `Are you sure to delete sprint "${sprint.name}"?`
                        )
                      ) {
                        handleDeleteSprint(sIndex);
                      }
                    },
                  },
                ]}
              />
            </div>
          </div>

          <div className="story">
            <div className="story-header">
              <span className="label story-label">STORY</span>
              <button className="link" onClick={() => setActiveTaskFormIndex(sIndex)}>
                + Add Task
              </button>
            </div>

            {sprint.tasks.length > 0 && (
              <div className="task-list">
                {sprint.tasks.map((task, tIndex) => (
                  <div className="task" key={tIndex}>
                    <span className="label task-label">TASK</span>
                    <div>
                      <strong>{task.title}</strong> <br />
                      ⏱ {task.time} | 👤 {task.member}
                    </div>
                    <div className="sprint-actions">
                      <span
                        className={`sprint-status ${
                          task.status === "In Planning" ? "planning" : "not-started"
                        }`}
                      >
                        {task.status}
                      </span>

                      {/* DropdownMenu sửa / xóa Task */}
                      <DropdownMenu
                        items={[
                          {
                            label: "Edit Task",
                            onClick: () => {
                              const newTitle = prompt(
                                "Edit Task Title:",
                                task.title
                              );
                              const newTime = prompt(
                                "Edit Task Time:",
                                task.time
                              );
                              const newMember = prompt(
                                "Edit Member:",
                                task.member
                              );
                              const newStatus = prompt(
                                "Edit Status (In Planning, In Progress, Done):",
                                task.status
                              );

                              if (
                                newTitle &&
                                newTime &&
                                newMember &&
                                newStatus
                              ) {
                                handleEditTask(sIndex, tIndex, {
                                  title: newTitle,
                                  time: newTime,
                                  member: newMember,
                                  status: newStatus,
                                });
                              }
                            },
                          },
                          {
                            label: "Delete Task",
                            onClick: () => {
                              if (
                                window.confirm(
                                  `Delete task "${task.title}"?`
                                )
                              ) {
                                handleDeleteTask(sIndex, tIndex);
                              }
                            },
                          },
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTaskFormIndex === sIndex && (
              <div className="form">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 3 days)"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Member"
                  value={newTask.member}
                  onChange={(e) => setNewTask({ ...newTask, member: e.target.value })}
                />
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option>In Planning</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <button
                  className="btn btn-small btn-green"
                  onClick={() => {
                    handleAddTask(sIndex, newTask);
                    setNewTask({ title: "", time: "", member: "", status: "In Planning" });
                    setActiveTaskFormIndex(null);
                  }}
                >
                  Save Task
                </button>
                <button
                  className="btn btn-small"
                  onClick={() => setActiveTaskFormIndex(null)}
                  style={{ backgroundColor: "#ccc", marginTop: 5 }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SprintColumn;
