import React from 'react';

const RecentEmails = ({ emails, searchInput, onSelect, selectedEmails = [] }) => {
  // Lọc email dựa trên các ký tự đầu tiên của email và loại bỏ các email đã được chọn
  const filteredEmails = searchInput 
    ? emails
        .filter(email => !selectedEmails.includes(email)) // Loại bỏ các email đã chọn
        .filter(email => email.toLowerCase().startsWith(searchInput.toLowerCase()))
    : emails.filter(email => !selectedEmails.includes(email)); // Loại bỏ các email đã chọn

  return (
    <div className="create-project-form__recent-emails">
      <ul className="create-project-form__recent-emails-list">
        {filteredEmails.length > 0 ? (
          filteredEmails.map(email => (
            <li key={email}>
              <button
                type="button"
                className="create-project-form__recent-email-item"
                onClick={() => onSelect(email)}
              >
                <div className="create-project-form__email-content">
                  <span className="create-project-form__email-primary">
                    {email}
                  </span>
                </div>
              </button>
            </li>
          ))
        ) : (
          <li className="create-project-form__no-results">No matching emails</li>
        )}
      </ul>
    </div>
  );
};

export default RecentEmails;