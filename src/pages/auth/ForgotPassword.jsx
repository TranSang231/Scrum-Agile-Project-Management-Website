import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetClick = () => {
    if (password === confirmPassword && password !== "") {
      navigate("/");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="d-flex vh-100" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Phần bên trái màu trắng chiếm 1/4 màn hình */}
      <div className="col-md-3 d-none d-md-block bg-white" style={{ minHeight: "100vh" }}></div>
      
      {/* Phần bên phải màu #EDF0F4 */}
      <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EDF0F4" }}>
        <div className="w-100 d-flex flex-column align-items-center">
          <h2 className="text-center mb-4 text-dark">Forgot Password?</h2>
          <form className="w-100" style={{ maxWidth: "400px" }}>
            <div className="mb-4">
              <label className="form-label text-dark">New password</label>
              <input 
                type="password" 
                className="form-control border-2 border-dark bg-transparent py-2" 
                placeholder="New password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-dark">Confirm password</label>
              <input 
                type="password" 
                className="form-control border-2 border-dark bg-transparent py-2" 
                placeholder="Confirm password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            <button type="button" className="btn btn-dark w-100 rounded-pill py-2" onClick={handleResetClick}>
              Reset Password
            </button>
            <p className="text-center mt-4">
              <a href="/" className="text-dark">Back to log in.</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;