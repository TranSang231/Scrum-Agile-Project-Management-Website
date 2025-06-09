import { useState } from 'react';
import '../../assets/styles/components/backlog/editTaskForm.scss';
import { FormHeader } from '../FormHeader';
function EditTaskForm({
    task,
    onSave,
    onCancel,
    isCreating = false,
    projects = [],
    users = [],
    priorities = []
}) {
    const [editedTask, setEditedTask] = useState({
        ...(isCreating ? {
            title: '',
            description: '',
            project: '',
            dueDate: '',
            startTime: '09:00',
            endTime: '17:00',
            lead: '',
            priority: 'medium',
            attachments: [],
            assignees: [],
            creator: '',
            notifications: true
        } : task)
    });

    const [fileNames, setFileNames] = useState([]);
    const [validationError, setValidationError] = useState('');

    // Handle file changes
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setEditedTask(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
        setFileNames([...fileNames, ...files.map(file => file.name)]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!editedTask.title.trim()) {
            setValidationError('Task name is required');
            return;
        }

        onSave(editedTask);
    };

    // Handle time changes
    const handleTimeChange = (type, value) => {
        setEditedTask(prev => ({
            ...prev,
            [type]: value
        }));
    };

    // Handle select changes
    const handleSelectChange = (type, value) => {
        setEditedTask(prev => ({
            ...prev,
            [type]: value
        }));
    };

    return (
        <div className="add-task-container">
            <form onSubmit={handleSubmit}>
                <FormHeader title={isCreating ? 'Add Task' : 'Edit Task'} subtitle="Please fill in the details below." />

                {/* Task Name */}
                <div className="form-group">
                    <label>Name the task</label>
                    <input
                        type="text"
                        placeholder="Enter task name"
                        value={editedTask.title}
                        onChange={(e) => {
                            setEditedTask({ ...editedTask, title: e.target.value });
                            setValidationError('');
                        }}
                    />
                    {validationError && <div className="error-message">{validationError}</div>}
                </div>

                {/* Project Selection */}
                <div className="form-group">
                    <label>Choose Project</label>
                    <select
                        value={editedTask.project}
                        onChange={(e) => handleSelectChange('project', e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Describe the task"
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        rows="4"
                    ></textarea>
                </div>

                {/* Due Date/Time */}
                <div className="form-group">
                    <label>Due Date/Time</label>
                    <div className="time-group">
                        <input
                            type="date"
                            value={editedTask.dueDate}
                            onChange={(e) => handleTimeChange('dueDate', e.target.value)}
                        />
                        <div className="time-inputs">
                            <input
                                type="time"
                                value={editedTask.startTime}
                                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                            />
                            <input
                                type="time"
                                value={editedTask.endTime}
                                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Lead */}
                <div className="form-group">
                    <label>Lead</label>
                    <select
                        value={editedTask.lead}
                        onChange={(e) => handleSelectChange('lead', e.target.value)}
                    >
                        <option value="">Select Lead</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name || user.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Task Priority */}
                <div className="form-group">
                    <label>Task Priority</label>
                    <select
                        value={editedTask.priority}
                        onChange={(e) => handleSelectChange('priority', e.target.value)}
                    >
                        {priorities.map(priority => (
                            <option key={priority.value} value={priority.value}>
                                {priority.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* File Attachment */}
                <div className="form-group">
                    <label>Attached File</label>
                    <div className="attach-file">
                        <label>
                            + Attach File
                            <input
                                type="file"
                                hidden
                                multiple
                                onChange={handleFileChange}
                            />
                        </label>
                        {fileNames.map((name, index) => (
                            <div key={index} className="file-name">
                                {name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assignees */}
                <div className="form-group">
                    <label>Task Assignee</label>
                    <select
                        multiple
                        value={editedTask.assignees}
                        onChange={(e) => handleSelectChange('assignees',
                            Array.from(e.target.selectedOptions, option => option.value)
                        )}
                    >
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name || user.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Creator */}
                <div className="form-group">
                    <label>Task Creator</label>
                    <select
                        value={editedTask.creator}
                        onChange={(e) => handleSelectChange('creator', e.target.value)}
                    >
                        <option value="">Select Creator</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name || user.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Notifications */}
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="notifications"
                        checked={editedTask.notifications}
                        onChange={(e) => handleSelectChange('notifications', e.target.checked)}
                    />
                    <label htmlFor="notifications">Activate Notifications</label>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button
                        type="button"
                        className="button button--cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit"
                        className="button button--save">
                        {isCreating ? 'Create' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTaskForm;