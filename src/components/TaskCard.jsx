
import React, { useState } from 'react';
import DropdownMenu from './DropDownMenu';
import EditTaskForm from './EditTaskForm';

// Component TaskCard để hiển thị thông tin của một task
function TaskCard({ task, onEditSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false); // Trạng thái để xác định có đang ở chế độ chỉnh sửa hay không

    // Hàm xử lý khi nhấn nút xóa
    const handleDeleteClick = () => {
        onDelete(task.id); // Gọi hàm xóa với id của task hiện tại
        setIsEditing(false); // Đặt lại trạng thái chỉnh sửa
    }

    // Hàm xử lý khi lưu chỉnh sửa
    const handleSaveEdit = (editedTask) => {
        onEditSave(editedTask); // Gọi hàm lưu chỉnh sửa với task đã chỉnh sửa
        setIsEditing(false);
    };

    // Hàm xử lý khi hủy chỉnh sửa
    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    // Hàm xử lý khi nhấn nút chỉnh sửa
    // Chuyển sang chế độ chỉnh sửa
    const handleEditClick = () => {
        setIsEditing(true);
    }

    return (
        <div className="task-card" key={task.id}>
            <div className="task-header">
                <div className={`task-type task-type-${task.type}`}>
                    {task.typeLabel}
                </div>

                <DropdownMenu
                    onEdit={handleEditClick} // Chuyển sang chế độ chỉnh sửa khi nhấn nút chỉnh sửa
                    onDelete={handleDeleteClick} // Gọi hàm xóa khi nhấn nút xóa
                />

            </div>

            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>

            <div className="task-footer">
                <div className="task-assignees">
                    {task.assignees.map((user, index) => (
                        <div
                            key={user.id}
                            className="task-assignee"
                            style={{
                                backgroundColor: user.color,
                                zIndex: task.assignees.length - index,
                                marginLeft: index > 0 ? '-8px' : '0',
                            }}
                        >
                            {user.initials}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hiển thị form chỉnh sửa nếu đang ở chế độ chỉnh sửa */}
            {isEditing && (
                <EditTaskForm
                    task={task}  // Truyền task hiện tại vào form chỉnh sửa
                    onSave={handleSaveEdit}  // Gửi dữ liệu đã chỉnh sửa
                    onCancel={handleCancelEdit}  // Hủy bỏ chỉnh sửa
                />
            )}
        </div>
    );
}

export default TaskCard;
