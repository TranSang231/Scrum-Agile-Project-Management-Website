import { Message } from './Message';
import React, { useState, useRef, useEffect } from 'react';
import { FormHeader } from './FormHeader';
import '../assets/styles/components/otpForm.scss'; 

const OTPInput = ({ otpCode, handleOtpChange }) => {
  const inputRefs = useRef([]);

  // Tự động focus ô đầu tiên khi mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Chỉ xử lý nếu giá trị nhập vào là số hoặc rỗng
    if (value === '' || /^[0-9]$/.test(value)) {
      // Cập nhật giá trị OTP
      const newOtpCode = [...otpCode];
      newOtpCode[index] = value;
      
      // Cập nhật toàn bộ state OTP một lần duy nhất
      handleOtpChange(newOtpCode);
      
      // Nếu là số và không phải ô cuối cùng, chuyển focus tới ô tiếp theo
      if (value !== '' && index < otpCode.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Xử lý navigation bằng arrow keys
    if (e.key === 'ArrowRight' && index < otpCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Xử lý phím Backspace
    if (e.key === 'Backspace') {
      const newOtpCode = [...otpCode];
      
      if (otpCode[index] === '' && index > 0) {
        // Nếu ô hiện tại trống và không phải ô đầu tiên, focus vào ô trước đó
        inputRefs.current[index - 1]?.focus();
      } else {
        // Xóa nội dung ô hiện tại
        newOtpCode[index] = '';
        handleOtpChange(newOtpCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    // Lấy dữ liệu paste và lọc chỉ giữ lại các ký tự số
    const pastedData = e.clipboardData
      .getData('text/plain')
      .replace(/[^0-9]/g, '')
      .slice(0, otpCode.length);
      
    if (pastedData) {
      // Tạo mảng OTP mới với giá trị mặc định là rỗng
      const newOtpCode = Array(otpCode.length).fill('');
      
      // Điền dữ liệu paste vào mảng OTP mới
      pastedData.split('').forEach((char, i) => {
        if (i < otpCode.length) {
          newOtpCode[i] = char;
        }
      });
      
      // Cập nhật state OTP một lần duy nhất
      handleOtpChange(newOtpCode);
      
      // Focus vào ô tiếp theo sau dữ liệu paste hoặc ô cuối cùng
      const focusIndex = Math.min(pastedData.length, otpCode.length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
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
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(e)}
          maxLength={1}
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          aria-label={`OTP digit ${index + 1}`}
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
  isLoading,
  setStep
}) => {
  // Hàm cập nhật OTP với mảng mới
  const handleOtpChange = (newOtpCode) => {
    setOtpCode(newOtpCode);
  };

  return (
    <form onSubmit={handleOtpSubmit}>
      <FormHeader title="Verify your email" subtitle={`Enter the verification code sent to ${email}`} />

      <div className="form-group">
        <div className="otp-header">
          <label htmlFor="otpCode">OTP Code</label>
          <div className="resend-container">
            <button 
              type="button" 
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

        <Message message={message} messageType={messageType} />
      </div>

      <div className="button-group">
        <button type="button" className="back-button" onClick={() => setStep(1)}>
          Back
        </button>
        <button 
          type="submit" 
          className="button button--form" 
          disabled={isLoading || otpCode.join('').length !== otpCode.length}
        >
          {isLoading ? <span className="spinner"></span> : "Verify"}
        </button>
      </div>
    </form>
  );
};