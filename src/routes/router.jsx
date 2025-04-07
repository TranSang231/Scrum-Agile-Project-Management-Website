import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Auth Pages
import Login from "../pages/auth/Login.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPassword.jsx";
import EmailPasswordPage from "../pages/auth/EmailPassword.jsx";
import OTPPage from "../pages/auth/OtpPage.jsx";
import Registration from '../pages/auth/Registration.jsx';
import Kanban from '../pages/kanban/kanban.jsx';

function AppRouter() {
  return (
    <Router>
        <Routes>
            {/* Routes không dùng layout (auth) */}
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-password" element={<EmailPasswordPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/reset-password" element={<ForgotPasswordPage />} />
            <Route path="/kanban" element={<Kanban />} />
          
        </Routes>
    </Router>
  );
}

export default AppRouter;