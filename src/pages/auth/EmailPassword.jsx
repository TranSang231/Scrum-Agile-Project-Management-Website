import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const handleResetClick = () => {
    navigate("/otp"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <div className="d-flex vh-100">
      <div className="container-fluid d-flex flex-column flex-md-row">
        {/* Phần trắng bên trái */}
        <div className="col-md-3 d-none d-md-block bg-white" style={{ minHeight: "100vh" }}></div>

        {/* Phần bên phải */}
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EDF0F4" }}>
          <div className="w-100 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4 text-dark">Forgot Password ?</h2>
            <form style={{ width: "100%", maxWidth: "350px" }}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <button type="button" className="btn btn-dark w-100 rounded-pill" onClick={handleResetClick}>
                Verify Email
              </button>
              <p className="text-center mt-3">
                <a href="/" className="text-dark">Back to log in.</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
