import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Auth Pages
import Login from "../pages/auth/Login.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPassword.jsx";
import Registration from '../pages/auth/Registration.jsx';
import Kanban from '../pages/kanban/Kanban.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;