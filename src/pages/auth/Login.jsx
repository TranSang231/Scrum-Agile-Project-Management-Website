import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/styles/pages/auth/Login.scss"; // Đường dẫn đến file CSS riêng

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
        setMessage('');
        setMessageType('');

        try {
            // Gọi API JWT để lấy token
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Invalid credentials');
            }

            const tokenData = await response.json();
            
            // Lưu JWT token vào localStorage
            localStorage.setItem('access_token', tokenData.access);
            localStorage.setItem('refresh_token', tokenData.refresh);

            // Cập nhật trạng thái đăng nhập trong AuthContext
            await login(email, password);
            
            setMessage("Login successful!");
            setMessageType("success");
            
            // Chuyển hướng đến trang chủ
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            setMessage(error.message || "Login failed. Please try again.");
            setMessageType("error");
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

                    <p className="terms-text">
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
                                required
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
                                required
                            />
                        </div>

                        <button 
                          type="submit"
                          className="button button--form"
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
                            <a onClick={() => navigate("/register")} className="create-account-link">
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