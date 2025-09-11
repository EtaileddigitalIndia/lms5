import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { ComprehensiveCourseProvider } from './context/ComprehensiveCourseContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';
import InstructorRoute from './components/InstructorRoute';
import StudentRoute from './components/StudentRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <ComprehensiveCourseProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                
                {/* Protected Routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Layout>
                      <AdminRoute />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/instructor/*" element={
                  <ProtectedRoute allowedRoles={['instructor']}>
                    <Layout>
                      <InstructorRoute />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/student/*" element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <Layout>
                      <StudentRoute />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </ComprehensiveCourseProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;