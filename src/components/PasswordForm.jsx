// PasswordForm.js
import React from 'react';
import { Message } from './Message';  // Giả sử bạn đã tạo Message component từ trước
import EyeClose from '../assets/images/eye_close.png';
import EyeOpen from '../assets/images/eye_open.png';
import { FormHeader } from './FormHeader';
import '../assets/styles/components/passwordForm.scss';

export const PasswordForm = ({
  password,
  setPassword,
  confirmPassword,
  passwordMatch,
  handleConfirmPasswordChange,
  handlePasswordSubmit,
  passwordVisible,
  togglePasswordVisibility,
  passwordConfirmVisible,
  togglePasswordConfirmVisibility,
  passwordConditions,
  isPasswordValid,
  message,
  messageType
}) => (
  <form onSubmit={handlePasswordSubmit}>
    <FormHeader title="Create password" subtitle="Choose a strong password for your account" />
    
    <div className="form-group">
      <div className="password-label">
        <label htmlFor="password">Password</label>
        <button 
          type="button" 
          className="toggle-password"
          onClick={togglePasswordVisibility}
        >
          <span className="eye-icon">
            <img 
              src={passwordVisible ? EyeOpen : EyeClose} 
              className="eye" 
              alt="eye icon" 
              style={{cursor: "pointer"}}
            />
          </span> 
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>
      <input 
        type={passwordVisible ? "text" : "password"} 
        id="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <ul className="password-requirements">
        {passwordConditions.map((condition, index) => (
          <li key={index} className={condition.isValid ? "valid" : "invalid"}>
            {condition.isValid ? "✅" : "❌"} {condition.text}
          </li>
        ))}
      </ul>
    </div>

    <div className="form-group">
      <div className="password-label">
        <label htmlFor="confirm-password">Confirm Password</label>
        <button 
            type="button" 
            className="toggle-password"
            onClick={togglePasswordConfirmVisibility}
          >
            <span className="eye-icon">
              <img 
                src={passwordConfirmVisible ? EyeOpen : EyeClose} 
                className="eye" 
                alt="eye icon" 
                style={{cursor: "pointer"}}
              />
            </span> 
            {passwordConfirmVisible ? "Hide" : "Show"}
          </button>
      </div>

      <input 
        type={passwordConfirmVisible ? "text" : "password"} 
        id="confirm-password" 
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />
      {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>}
    </div>

    <Message message={message} messageType={messageType} />

    <div className="button-group">
      <button type="button" className="back-button" onClick={() => setStep(2)}>
        Back
      </button>
      <button type="submit" className="button" disabled={!isPasswordValid}>
        Complete Registration
      </button>
    </div>
  </form>
);
