import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOTP = () => {
    if (!otp) {
      setError("Please enter OTP!");
    } else {
      setError("");
      navigate("/reset-password"); // Chuyển hướng đến đặt lại mật khẩu
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-md-6 bg-white shadow-lg rounded p-4">
        {/* Ảnh avatar */}
        <div className="d-flex justify-content-center mb-3">
          <div className="bg-secondary rounded-circle" style={{ width: "80px", height: "80px" }}></div>
        </div>

        {/* Tiêu đề */}
        <h2 className="text-center my-3 text-dark">Forgot Password?</h2>
        <p className="text-center text-muted">
          Enter the OTP code sent to your email to reset your password.
        </p>

        {/* Form nhập OTP */}
        <form>
          <div className="mb-3">
            <label className="form-label fw-bold">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Nút Verify OTP */}
          <button
            type="button"
            className="btn btn-dark w-100 rounded-pill"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>

          {/* Link quay về login */}
          <p className="text-center mt-3">
            <a href="/" className="text-dark text-decoration-none">Back to log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
