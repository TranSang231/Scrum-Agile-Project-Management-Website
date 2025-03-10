import { useState, useEffect } from 'react';
import '../../assets/styles/auth/Registration.css';
import EyeClose from '../../assets/images/eye_close.png'; // Corrected path
import EyeOpen from '../../assets/images/eye_open.png'; // Corrected path

function Registration() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  // const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(seconds => seconds - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, countdown]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, otpCode });
  };

  const handleResend = () => {
    console.log('Resend OTP requested');
    // Start countdown timer
    setCountdown(60);
    setIsTimerActive(true);
  };
  
  return (
    <div className="registration-container">
      <div className="header-links">
        <div></div>
        <div className="auth-links">
          <span>Already have an account? <a className ="Login" href="/login">Log in</a></span>
          <div>
            <a href="#forgot">Forget your user ID or password?</a>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="avatar-placeholder"></div>

        <div className="registration-form">
          <h1>Create an account</h1>
          <p className="form-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

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
                  </span> {passwordVisible ? "Show" : "Hide"}
                </button>
              </div>
              <input 
                type={passwordVisible ? "text" : "password"} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="password-requirements">
              <div className="requirement">
                <span className="bullet">•</span> Use 8 or more characters
              </div>
              <div className="requirement">
                <span className="bullet">•</span> Use upper and lower case letters (e.g. Aa)
              </div>
              <div className="requirement">
                <span className="bullet">•</span> Use a number (e.g. 1234)
              </div>
              <div className="requirement">
                <span className="bullet">•</span> Use a symbol (e.g. !@#$)
              </div>
            </div>

            <div className="form-group">
              <div className="otp-header">
                <label htmlFor="otpCode">OTP Code</label>
                <div className="resend-container">
                  <button 
                    type="button" 
                    className="resend-button"
                    onClick={handleResend}
                    disabled={isTimerActive}
                  >
                    Send OTP?
                  </button>
                  {isTimerActive && <span className="countdown-timer">({countdown}s)</span>}
                </div>
              </div>
              {/* <input type="text" id="otpCode" className="otp-input" /> */}
              <input 
                type="text" 
                id="otpCode" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
              <p className="otp-info">
              Click "Send OTP" to receive the OTP code in your Gmail.
              </p>
            </div>

            <button type="submit" className="register-button">Register</button>

            <p className="terms-text">
              By creating an account, you agree to the <a href="#terms">Terms of use</a> and <a href="#privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;