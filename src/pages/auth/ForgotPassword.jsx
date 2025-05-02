import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/styles/pages/auth/ForgotPassword.scss';

import { useTimer } from '../../hooks/useTimer';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { useMessage } from '../../hooks/useMessage';
import { useVisibility } from '../../hooks/useVisibility';

import { EmailForm } from '../../components/EmailForm';
import { OtpForm } from '../../components/OTPForm';
import { PasswordForm } from '../../components/PasswordForm';

function ForgotPassword() {
  // Navigation
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Custom hook for password validation
  const { isPasswordValid, passwordConditions } = usePasswordValidation(password);
  const { message, messageType, setSuccessMessage, setErrorMessage } = useMessage();
  const { countdown, isTimerActive, startTimer, stopTimer } = useTimer(60); // Start with 60 seconds countdown
  const { isVisible: passwordVisible, toggleVisibility: togglePasswordVisibility } = useVisibility();
  const { isVisible: passwordConfirmVisible, toggleVisibility: togglePasswordConfirmVisibility } = useVisibility();

  // Step 1: Submit email and request OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/forgot-password/request-otp/", { email });
      setSuccessMessage("OTP sent to your email");
      startTimer(); // Start the countdown timer
      setStep(2); // Move to OTP step
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and move to password step
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otpCode.includes('')) {
      setErrorMessage("Please enter all OTP digits");
      return;
    }

    const combinedOtp = otpCode.join('');

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/forgot-password/verify-otp/", {
        email,
        otpCode: combinedOtp
      });
      setSuccessMessage("OTP verified successfully");
      setStep(3); // Move to password reset step
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage(error.response?.data?.error || "Invalid OTP");
    }
  };

  // Step 3: Reset password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/forgot-password/reset/", {
        email,
        password,
      });
      setSuccessMessage("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error resetting password:", err);
      setErrorMessage(err.response?.data?.error || "Failed to reset password");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/forgot-password/request-otp/", { email });
      setSuccessMessage(response.data.message || "OTP resent to your email");
      startTimer(); // Restart the countdown timer
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrorMessage(error.response?.data?.error || "Failed to resend OTP");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  return (
    <div className="forgot-password-container">

      <div className="left-section">
        <div className="forgot-password-card">

          {step === 1 && <EmailForm {...{
            headingTitle: "Forgot Password?",
            headingSubTitle: "Enter your email to receive a verification code",
            email,
            setEmail,
            handleEmailSubmit,
            message,
            messageType,
            isLoading
          }} />}
          {step === 2 && <OtpForm {...{
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
          }} />}
          {step === 3 && <PasswordForm {...{
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
          }} />}

        </div>
      </div>
      <div className="right-section">
        <div className="header-links">
          <div></div>
          <div className="auth-links">
            <span>Already have an account? <a className="Login" href="/login">Log in</a></span>
            <div>
              <a href="/">Create your account?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;