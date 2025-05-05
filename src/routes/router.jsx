import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Auth Pages
import Login from "../pages/auth/Login.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPassword.jsx";
import Registration from '../pages/auth/Registration.jsx';
import Kanban from '../pages/kanban/Kanban.jsx';
import Backlog from '../pages/backlog/Backlog.jsx';
import Project from '../pages/project/Project.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path ="/backlog" element={<Backlog />} />
        <Route path ="/project" element={<Project />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;