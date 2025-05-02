import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/pages/auth/Login.scss"; // Đường dẫn đến file CSS riêng

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle password input change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post("http://127.0.0.1:8000/api/auth/login/verify/", { email, password });
            setMessage("Login successful!");
            setMessageType("success");
            setTimeout(() => {
                navigate("/home");
              }, 2000);
            }
        catch (error) {
            console.error("Login failed:", error);
            setMessage(error.response?.data?.error || "Login failed. Please try again.");
            setMessageType("error");
            // Xử lý lỗi nếu cần
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="login-container d-flex vh-100">
            {/* Cột bên phải (3/4) có nền xám và chứa form login */}
            <div className="left-section d-flex align-items-center justify-content-center">
                <div className="login-card p-4">
                    <h2 className="text-center fw-bold">Log In</h2>

                    <p class="terms-text">
                        By signing up, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
                    </p>

                    <form className="login-form" onSubmit={handleLoginSubmit}>  
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={handleEmailChange}
                                className="form-control" 
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                            />
                        </div>

                        <button 
                          type="submit"
                          className="button"
                          disabled={isLoading}
                        >
                            {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : ""} 
                            Sign in
                        </button>

                        {message && (
                            <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} mt-3`}>
                            {message}
                            </div>
                        )}
                        
                    </form>

                    <div className="text-center mt-3">
                        <p className="text-center mt-3">
                            <a onClick={() => navigate("/")} className="create-account-link">
                                Create an account?
                            </a>
                        </p>

                        <p className="text-center forgot-password">
                            <a onClick={() => navigate("/forgot-password")} className="">
                                Forgot your user ID or password?
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Cột bên trái (1/4) có nền trắng */}
            <div className="right-section"></div>    
        </div>
    );
};

export default Login;