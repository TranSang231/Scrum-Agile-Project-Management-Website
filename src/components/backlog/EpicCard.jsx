import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import '../../assets/styles/components/epicCard.scss';
import DropdownMenu from '../DropDownMenu';
import EditEpicForm from './EditEpicForm';
import EditUserStoryForm from './EditUserStoryForm';
import UserStoryCard from './UserStoryCard';

// function EpicCard({ epic, onEditSave, onDelete, onSaveUserStory, onDeleteUserStory }) {
function EpicCard({ epic, index, onEditSave, onDelete, showAddTaskButton }) {
    const [isEditing, setIsEditing] = useState(false);
    // const [isCreatingUserStory, setIsCreatingUserStory] = useState(false);
    // const [userStories, setUserStories] = useState(epic.user_stories || []);

    const handleDeleteClick = () => {
        onDelete(epic.id);
        setIsEditing(false);
    }

    const handleSaveEdit_EpicCard = (editedEpic) => {
        onEditSave(editedEpic);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    }

    // const handleCreateUserStory = () => {
    //     setIsCreatingUserStory(true);
    // };

    // const handleSaveUserStory = (userStoryData) => {
    //     const newUserStory = {
    //         ...userStoryData,
    //         epic: epic.id
    //     };
    //     onSaveUserStory(newUserStory);
    //     setUserStories([...userStories, newUserStory]);
    //     setIsCreatingUserStory(false);
    // };

    // const handleDeleteUserStory = (userStoryId) => {
    //     onDeleteUserStory(userStoryId);
    //     setUserStories(userStories.filter(story => story.id !== userStoryId));
    // };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderEpicContent = (provided, snapshot) => (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`epic-card ${snapshot.isDragging ? 'epic-card--dragging' : ''}`}
        >
            <div className="epic-header">
                <div className="epic-type">EPIC</div>
                <p className="epic-title">{epic.name}</p>
                <div className="epic-dropdown">
                    <DropdownMenu
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>

            <p className="epic-description">{epic.description}</p>

            <div className="epic-footer">
                <div className="epic-meta">
                    <span className="epic-status">{epic.status}</span>
                    <span className="epic-project">{epic.project?.name}</span>
                    <span className="epic-date">
                        Created: {formatDate(epic.created_at)}
                    </span>
                </div>
                {/* <div className="epic-creator">
                    {epic.created_by && (
                        <div className="epic-creator-info">
                            <span>Created by: {epic.created_by.username}</span>
                        </div>
                    )}
                </div> */}
            </div>

            {isEditing && (
                <EditEpicForm
                    epic={epic}
                    onSave={handleSaveEdit_EpicCard}
                    onCancel={handleCancelEdit}
                />
            )}

            <div className="epic-card__section-header">
                {showAddTaskButton && (
                <button className="epic-card__button sprint-card__button--add">
                    + Add Task
                </button>
                )}
            </div>

            {/* <div className="epic-user-stories">
                <div className="epic-user-stories-header">
                    <h3>User Stories</h3>
                    <button 
                        className="create-user-story-btn"
                        onClick={handleCreateUserStory}
                    >
                        + Add User Story
                    </button>
                </div>

                {isCreatingUserStory && (
                    <EditUserStoryForm
                        isCreating={true}
                        onSave={handleSaveUserStory}
                        onCancel={() => setIsCreatingUserStory(false)}
                        projectId={epic.project}
                        epicId={epic.id}
                    />
                )}

                <div className="epic-user-stories-list">
                    {userStories.map(userStory => (
                        <UserStoryCard
                            key={userStory.id}
                            userStory={userStory}
                            onEditSave={handleSaveUserStory}
                            onDelete={handleDeleteUserStory}
                        />
                    ))}
                </div>
            </div> */}
        </div>
    );

    return (
        <Draggable draggableId={epic.id.toString()} index={index}>
            {renderEpicContent}
        </Draggable>
    );
}

export default EpicCard;