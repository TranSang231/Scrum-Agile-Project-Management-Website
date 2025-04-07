import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/auth/Login.css"; // Đường dẫn đến file CSS riêng

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-container d-flex vh-100">
            {/* Cột bên trái (1/4) có nền trắng */}
            <div className="left-section"></div>

            {/* Cột bên phải (3/4) có nền xám và chứa form login */}
            <div className="right-section d-flex align-items-center justify-content-center">
                <div className="login-card p-4">
                    <h2 className="text-center fw-bold">Log In</h2>

                    <p class="terms-text">
                        By signing up, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
                        </p>


                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter your password"
                            />
                        </div>

                        <button className="btn btn-dark w-100">
                            Sign in
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <p className="text-center mt-3">
                            <a onClick={() => navigate("/")} className="create-account-link">
                                Create an account?
                            </a>
                        </p>

                        <p className="text-center forgot-password">
                            <a onClick={() => navigate("/email-password")} className="text-muted text-decoration-none">
                                Forgot your user ID or password?
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;