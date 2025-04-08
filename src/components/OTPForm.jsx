import { Message } from './Message';  // Giả sử bạn đã tạo Message component từ trước
import React, { useState, useRef, useEffect } from 'react';
import { FormHeader } from './FormHeader';
import '../assets/styles/components/otpForm.scss'; 

const OTPInput = ({ otpCode, handleOtpChange }) => {
  const inputRefs = useRef([]);

  // Tự động focus ô đầu tiên khi mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue) {
      handleOtpChange(index, numericValue);
      
      // Tự động chuyển focus sang ô tiếp theo
      if (index < otpCode.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    const currentValue = otpCode[index];
    
    // Xử lý navigation bằng arrow keys
    if (e.key === 'ArrowRight' && index < otpCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Xử lý phím Backspace/Delete
    if (e.key === 'Backspace') {
      if (!currentValue && index > 0) {
        // Nếu ô hiện tại trống, xóa ô trước đó
        handleOtpChange(index - 1, '');
        inputRefs.current[index - 1]?.focus();
      } else {
        // Xóa nội dung ô hiện tại
        handleOtpChange(index, '');
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData('text/plain')
      .replace(/[^0-9]/g, '')
      .slice(0, otpCode.length);
    
    pasteData.split('').forEach((char, i) => {
      handleOtpChange(i, char);
    });
    
    // Focus vào ô cuối cùng được paste
    const lastPasteIndex = Math.min(pasteData.length - 1, otpCode.length - 1);
    inputRefs.current[lastPasteIndex]?.focus();
  };

  return (
    <div className="otp-input-group">
      {otpCode.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          className="otp-input"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          maxLength="1"
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

export const OtpForm = ({
  email,
  otpCode,
  setOtpCode,
  handleOtpSubmit,
  isTimerActive,
  countdown,
  handleResendOtp,
  message,
  messageType,
  isLoading
}) => {
  // Handle OTP change for OTP input (array of digits)
  const handleOtpChange = (index, value) => {
    const updatedOtpCode = [...otpCode];
    updatedOtpCode[index] = value;
    setOtpCode(updatedOtpCode);
  };

  return (
    <form onSubmit={handleOtpSubmit}>
      <FormHeader title="Verify your email" subtitle={`Enter the verification code sent to ${email}`} />

      <div className="form-group">
        <div className="otp-header">
          <label htmlFor="otpCode">OTP Code</label>
          <div className="resend-container">
            <button 
              type="button button--form" 
              className="resend-button"
              onClick={handleResendOtp}
              disabled={isTimerActive}
            >
              Resend OTP
            </button>
            {isTimerActive && <span className="countdown-timer">({countdown}s)</span>}
          </div>
        </div>

        {/* Use OTPInput component */}
        <OTPInput otpCode={otpCode} handleOtpChange={handleOtpChange} />

        <p className="otp-info">
          Check your email for the OTP code. If you don't see it, check your spam folder.
        </p>

        <Message message={message} messageType={messageType} />
      </div>

      <div className="button-group">
        <button type="button" className="back-button" onClick={() => setStep(1)}>
          Back
        </button>
        <button type="submit" className="button button--form" disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Verify"}
        </button>
      </div>
    </form>
  );
};
