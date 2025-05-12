// Message.js
import React from 'react';

export const Message = ({ message, messageType }) => {
  if (!message) return null; // Không hiển thị nếu không có message

  return (
    <div 
      style={{
        color: messageType === "success" ? "green" : "red",
        fontWeight: "bold",
        marginTop: "10px",
      }}
    >
      {message}
    </div>
  );
};
