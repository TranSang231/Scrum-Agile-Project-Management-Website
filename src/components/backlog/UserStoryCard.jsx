import React, { useState } from 'react';
import '../../assets/styles/components/userStoryCard.scss';
import DropdownMenu from '../DropDownMenu';
import EditUserStoryForm from './EditUserStoryForm';

function UserStoryCard({ userStory, onEditSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleDeleteClick = () => {
        onDelete(userStory.id);
        setIsEditing(false);
    }

    const handleSaveEdit = (editedUserStory) => {
        onEditSave(editedUserStory);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    }

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="user-story-card">
            <div className="user-story-header">
                <div className="user-story-type">USER STORY</div>
                <p className="user-story-title">{userStory.title}</p>
                <div className="user-story-dropdown">
                    <DropdownMenu
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>

            <p className="user-story-description">{userStory.description}</p>
            <p className="user-story-acceptance-criteria">{userStory.acceptance_criteria}</p>

            <div className="user-story-footer">
                <div className="user-story-meta">
                    <span className="user-story-priority">Priority: {userStory.priority}</span>
                    <span className="user-story-points">Points: {userStory.story_points}</span>
                    {/* {userStory.epic && (
                        <span className="user-story-epic">Epic: {userStory.epic.name}</span>
                    )} */}
                    <span className="user-story-date">
                        Created: {formatDate(userStory.created_at)}
                    </span>
                </div>
                {/* <div className="user-story-creator">
                    {userStory.created_by && (
                        <div className="user-story-creator-info">
                            <span>Created by: {userStory.created_by.username}</span>
                        </div>
                    )}
                </div> */}
            </div>

            {isEditing && (
                <EditUserStoryForm
                    userStory={userStory}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}

export default UserStoryCard; 