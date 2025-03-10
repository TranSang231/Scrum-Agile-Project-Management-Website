import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  return (
    <div className="d-flex vh-100" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#F8F9FA" }}>
      <div className="container-fluid d-flex flex-column flex-md-row">
        {/* Sidebar (3/4 màn hình) */}
        <div 
          className="d-flex flex-column justify-content-center align-items-center col-md-9 col-12 px-4 position-relative"
          style={{ minHeight: "100vh", backgroundColor: "#EDF0F4" }}
        >
          {/* Logo */}
          <div className="position-absolute top-0 start-0 m-3">
            <img 
              src="https://via.placeholder.com/50" 
              alt="Logo" 
              className="rounded-circle" 
              style={{ width: "50px", height: "50px" }} 
            />
          </div>

          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-3">Log In</h2>
            <p className="text-center" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
              By signing up, you agree to the <a href="/terms" style={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }}>Terms of Use</a> and <a href="/privacy" style={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }}>Privacy Policy</a>.
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label" style={{ color: "rgba(0, 0, 0, 0.6)" }}>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  style={{ borderColor: "rgba(0, 0, 0, 0.3)", backgroundColor: "transparent" }} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "rgba(0, 0, 0, 0.6)" }}>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password" 
                  style={{ borderColor: "rgba(0, 0, 0, 0.3)", backgroundColor: "transparent" }} 
                />
              </div>
              <button className="btn btn-dark w-100 rounded-pill">Sign in</button>
            </form>
            <div className="text-center mt-3">
              <a href="/" className="fw-bold" style={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }}>Create an account?</a>
              <br />
              <a href="/email-password" style={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }}>Forget your user ID or password?</a>
            </div>
          </div>
        </div>

        {/* Right Space (1/4 màn hình) */}
        <div className="col-md-3 d-none d-md-block" style={{ minHeight: "100vh", backgroundColor: "#F8F9FA" }}></div>
      </div>
    </div>
  );
};

export default LoginPage;
