import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/auth/EmailPassword.css"; // Import CSS mới

const EmailPasswordPage = () => {
  const navigate = useNavigate();

  const handleResetClick = () => {
    navigate("/otp"); // Chuyển hướng đến trang OTP
  };

  return (
    <div className="reset-password-container">
      {/* Phần trắng bên trái */}
      <div className="left-section"></div>

      {/* Phần bên phải */}
      <div className="right-section">
        <div className="reset-password-card">
          <h2>Forgot Password ?</h2>
          <form>
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <button type="button" className="btn btn-dark" onClick={handleResetClick}>
              Reset Password
            </button>
            <p className="text-center mt-3">
              <a href="/login" className="text-dark">Back to log in.</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailPasswordPage;
