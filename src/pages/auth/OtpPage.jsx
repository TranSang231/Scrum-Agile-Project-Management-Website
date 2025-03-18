import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/auth/OtpPage.css"; // Import CSS

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Chỉ lấy ký tự cuối nếu nhập nhiều ký tự
    setOtp(newOtp);

    // Tự động chuyển focus sang ô tiếp theo nếu nhập xong
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOTP = () => {
    if (otp.includes("")) {
      setError("Please enter all OTP digits!");
    } else {
      setError("");
      navigate("/reset-password"); // Chuyển hướng đến đặt lại mật khẩu
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        {/* Ảnh avatar */}
        <div className="otp-avatar"></div>

        {/* Tiêu đề */}
        <h2>Forgot Password?</h2>
        <p>Enter the OTP code sent to your email to reset your password.</p>

        {/* Form nhập OTP hàng ngang */}
        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              className="otp-input"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength="1"
            />
          ))}
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}

        {/* Nút Verify OTP */}
        <button type="button" className="otp-btn" onClick={handleVerifyOTP}>
          Verify OTP
        </button>

        {/* Link quay về login */}
        <p className="mt-3">
          <a href="/login">Back to log in</a>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
