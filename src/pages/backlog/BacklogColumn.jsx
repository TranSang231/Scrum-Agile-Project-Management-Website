import React, { useState } from "react";
import '../../assets/styles/pages/backlog/backlogColumn.scss';
import TaskCard from "../../components/TaskCard.jsx";
import EditTaskForm from "../../components/backlog/EditTaskForm.jsx";
import EditEpicForm from "../../components/backlog/EditEpicForm.jsx";
import EditUserStoryForm from "../../components/backlog/EditUserStoryForm.jsx";

// Dữ liệu mẫu
const sampleProjects = [
    { id: 'proj1', name: 'Website Redesign' },
    { id: 'proj2', name: 'Mobile App Development' },
    { id: 'proj3', name: 'CRM Integration' },
];

const sampleUsers = [
    { id: 'user1', name: 'John Doe', username: 'johndoe' },
    { id: 'user2', name: 'Jane Smith', username: 'janesmith' },
    { id: 'user3', name: 'Mike Johnson', username: 'mikejohnson' },
];

const BacklogColumn = () => {
    const [isCreatingEpic, setCreatingEpic] = useState(false);
    const [isCreatingUserStory, setCreatingUserStory] = useState(false);
    const [selectedColumnId, setSelectedColumnId] = useState(null);

    const currentUser = sampleUsers[0]; // Giả định người dùng đầu tiên là người dùng hiện tại

    const handleCreateEpic = (columnId) => {
        setSelectedColumnId(columnId);
        setCreatingEpic(true);
    }

    const handleCreateUserStory = (columnId) => {
        setSelectedColumnId(columnId);
        setCreatingUserStory(true);
    }

    const [columns, setColumns] = useState([
        {
            id: 'backlog',
            title: 'Backlog',
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
        }
    ]);

    return (
        <div className="backlog__column">
            <div className="backlog__column-content">
                <div className="backlog__column-header">
                    <h2 className="backlog__column-title">Product Backlog</h2>
                    <div className="backlog__column-actions">
                        <button className="backlog__column-button backlog__column-button--icon">
                            <svg className="backlog__column-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        <button className="backlog__column-button backlog__column-button--icon">
                            <svg className="backlog__column-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="backlog__task-list">
                    {columns[0].tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEditSave={(updatedTask) => {
                                setColumns(columns.map(col =>
                                    col.id === columns[0].id
                                        ? { ...col, tasks: col.tasks.map(t => t.id === task.id ? updatedTask : t) }
                                        : col
                                ));
                            }}
                            onDelete={(taskId) => {
                                setColumns(columns.map(col =>
                                    col.id === columns[0].id
                                        ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
                                        : col
                                ));
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="backlog__column-buttons">
                <button
                    className="backlog__column-button backlog__column-button--create backlog__column-button--epic"
                    onClick={() => handleCreateEpic(columns[0].id)}
                >
                    Create Epic
                </button>
                <button
                    className="backlog__column-button backlog__column-button--create backlog__column-button--story"
                    onClick={() => handleCreateUserStory(columns[0].id)}
                >
                    Create User Story
                </button>
            </div>

            {isCreatingEpic && (
                <EditEpicForm
                    isCreating={true}
                    projects={sampleProjects}
                    users={sampleUsers}
                    currentUser={currentUser}
                    onSave={(newEpic) => {
                        setColumns(columns.map(col =>
                            col.id === selectedColumnId
                                ? { ...col, tasks: [...col.tasks, newEpic] }
                                : col
                        ));
                        setCreatingEpic(false);
                    }}
                    onCancel={() => setCreatingEpic(false)}
                />
            )}

            {isCreatingUserStory && (
                <EditUserStoryForm
                    isCreating={true}
                    projects={sampleProjects}
                    users={sampleUsers}
                    priorities={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                    ]}
                    onSave={(newTask) => {
                        const userStory = {
                            ...newTask,
                            type: 'user-story',
                            typeLabel: 'USER STORY'
                        };
                        setColumns(columns.map(col =>
                            col.id === selectedColumnId
                                ? { ...col, tasks: [...col.tasks, userStory] }
                                : col
                        ));
                        setCreatingUserStory(false);
                    }}
                    onCancel={() => setCreatingUserStory(false)}
                />
            )}
        </div>
    );
};

export default BacklogColumn;