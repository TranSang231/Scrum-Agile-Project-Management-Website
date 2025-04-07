import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/auth/ForgotPassword.css"; // CSS tùy chỉnh

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetClick = () => {
    if (password === confirmPassword && password !== "") {
      alert("Password reset successful! Redirecting to Login...");
      navigate("/login"); // Điều hướng sang trang Login
    } else {
      alert("Passwords do not match! Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="forgot-password-card">
          <h2 className="text-center fw-bold">Forgot Password?</h2>

          <form>
            <div className="mb-3">
              <label className="form-label">New password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter new password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Confirm new password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>

            <button 
              type="button" 
              className="btn btn-dark w-100"
              onClick={handleResetClick}
            >
              Reset Password
            </button>
          </form>

          <div className="text-center mt-3">
            <a onClick={() => navigate("/login")} className="text-muted text-decoration-none">
              Back to log in.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
