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
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setSuccessMessage(''); // Clear any previous messages
    setErrorMessage(''); // Clear any previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/request-otp/", { 
        email: email 
      });

      if (response.status === 200) {
        setSuccessMessage("OTP has been sent to your email. Please check your inbox.");
        startTimer();
        setStep(2);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        
        // Check specifically for existing email error
        if (errorData.error === 'Email already registered') {
          setErrorMessage(
            <div>
              <p>This email is already registered.</p>
              <p className="mt-2">
                Would you like to{' '}
                <a href="/login" className="text-primary">log in</a>
                {' '}or use a different email?
              </p>
            </div>
          );
        } else if (typeof errorData === 'object') {
          // Handle validation errors
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          setErrorMessage(errorMessages);
        } else {
          setErrorMessage(errorData.error || "Failed to send OTP");
        }
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("Unable to connect to server. Please check your internet connection.");
      } else {
        // Something else happened
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and move to password step
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validate OTP input
    if (otpCode.includes('')) {
      setErrorMessage("Please enter all OTP digits");
      setIsLoading(false);
      return;
    }

    const combinedOtp = otpCode.join(''); // Combine OTP digits into a single string

    // Validate OTP format
    if (!/^\d{6}$/.test(combinedOtp)) {
      setErrorMessage("OTP must be 6 digits");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/verify-otp/", {
        email,
        otpCode: combinedOtp
      });

      if (response.data.message === 'OTP verified successfully') {
        setSuccessMessage("OTP verified successfully. Please set your password.");
        // Clear OTP input
        setOtpCode(['', '', '', '', '', '']);
        // Move to password step after a short delay
        setTimeout(() => {
          setStep(3);
        }, 1500);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      
      if (error.response?.data?.details) {
        // Handle detailed error messages
        const errorDetails = error.response.data.details;
        if (errorDetails.otpCode) {
          setErrorMessage(errorDetails.otpCode);
        } else if (errorDetails.email) {
          setErrorMessage(errorDetails.email);
        } else {
          setErrorMessage(error.response.data.error);
        }
      } else if (error.response?.data?.error) {
        // Handle general error message
        setErrorMessage(error.response.data.error);
      } else if (error.request) {
        // Network error
        setErrorMessage("Unable to connect to server. Please check your internet connection.");
      } else {
        // Other errors
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      // If OTP is expired or invalid, allow resending
      if (error.response?.data?.error === 'OTP has expired' || 
          error.response?.data?.error === 'Invalid OTP') {
        stopTimer();
      }
    } finally {
      setIsLoading(false);
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
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        email,
        password,
        confirm_password: confirmPassword  // Đổi tên trường để khớp với backend
      });

      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        // Server trả về lỗi
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          // Xử lý lỗi validation
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          setErrorMessage(errorMessages);
        } else {
          setErrorMessage(errorData || "Registration failed");
        }
      } else if (err.request) {
        // Không nhận được response
        setErrorMessage("No response from server. Please try again.");
      } else {
        // Lỗi khác
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/request-otp/", { email });
      setSuccessMessage("OTP resent to your email");
      startTimer(); // Restart the countdown timer

      setTimeout(() => {
        setSuccessMessage("");
      }, 30000);
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
            isLoading,
            setStep
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
            messageType,
            setStep
          }} />}
        </div>
      </div>
    </div>
  );
} 

export default Registration;