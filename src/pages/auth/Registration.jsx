import { useState } from 'react';
import axios from "axios";

import { useTimer } from '../../hooks/useTimer';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { useMessage } from '../../hooks/useMessage';
import { useVisibility } from '../../hooks/useVisibility';

import { EmailForm} from '../../components/EmailForm';
import { OtpForm } from '../../components/OTPForm';
import { PasswordForm } from '../../components/PasswordForm';

import '../../assets/styles/pages/auth/Registration.scss';

function Registration() {
  // State variables
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
    setSuccessMessage(''); // Clear any previous messages

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/request-otp/", { 
        email: email 
      });

      if (response.status === 200) {
        setSuccessMessage("OTP sent to your email");
        startTimer();
        setStep(2);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.response) {
        // Server responded with error status
        setErrorMessage(error.response.data.error || "Failed to send OTP");
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("No response from server. Please try again.");
      } else {
        // Something else happened
        setErrorMessage("An error occurred. Please try again.");
      }
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

    const combinedOtp = otpCode.join(''); // Combine OTP digits into a single string

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/verify-otp/", { email, otpCode: combinedOtp});
      setSuccessMessage("OTP verified successfully");
      setStep(3); // Move to password step
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage(error.response?.data?.error || "Invalid OTP");
    }
  };

  // Step 3: Complete registration with password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/complete/", { email, password, confirmPassword, otpCode });
      alert("Registration successful!");
      // Redirect to login page or dashboard
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.error || "Registration failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/request-otp/", { email });
      setSuccessMessage(response.data.message || "OTP resent to your email");
      startTimer(); // Restart the countdown timer
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage(error.response?.data?.error || "Failed to resend OTP");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  return (
    <div className="registration-container">
      <div className="header-links">
        <div></div>
        <div className="auth-links">
          <span>Already have an account? <a className="Login" href="/login">Log in</a></span>
          <div>
            <a href="/forgot-password">Forget your user ID or password?</a>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="avatar-placeholder"></div>

        <div className="registration-form">
          {step === 1 && <EmailForm {...{ 
            headingTitle: "Create an account",
            headingSubTitle:"Enter your email address to get started",
            email, 
            setEmail, 
            handleEmailSubmit, 
            message, 
            messageType, 
            isLoading }} />}
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
    </div>
  );
} 

export default Registration;