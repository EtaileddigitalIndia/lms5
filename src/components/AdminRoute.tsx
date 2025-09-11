import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CourseManagement from '../pages/admin/CourseManagement';
import ModuleCreator from '../pages/admin/ModuleCreator';
import AssessmentCreator from '../pages/admin/AssessmentCreator';

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/courses" element={<CourseManagement />} />
      <Route path="/modules" element={<ModuleCreator />} />
      <Route path="/assessments" element={<AssessmentCreator />} />
      <Route path="/users" element={<div className="p-6"><h1 className="text-2xl font-bold">User Management</h1></div>} />
      <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1></div>} />
      <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
    </Routes>
  );
};

export default AdminRoute;