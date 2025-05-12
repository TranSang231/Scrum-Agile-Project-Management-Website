import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

// Auth Pages
import Login from "../pages/auth/Login.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPassword.jsx";
import Registration from '../pages/auth/Registration.jsx';
import Unauthorized from '../pages/auth/Unauthorized.jsx';

// Dashboard Pages
import LandingPage from '../pages/landingPage/landingPage.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import AdminDashboard from '../pages/dashboard/AdminDashboard.jsx';
import Kanban from '../pages/kanban/Kanban.jsx';
import Backlog from '../pages/backlog/Backlog.jsx';
import Project from '../pages/project/Project.jsx';

function AppRouter() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Project Manager']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Developer', 'Tester']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kanban"
            element={
              <ProtectedRoute allowedRoles={['Developer', 'Tester', 'Project Manager']}>
                <Kanban />
              </ProtectedRoute>
            }
          />
          <Route
            path="/backlog"
            element={
              <ProtectedRoute allowedRoles={['Developer', 'Tester', 'Project Manager']}>
                <Backlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project"
            element={
              <ProtectedRoute allowedRoles={['Developer', 'Tester', 'Project Manager']}>
                <Project />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;