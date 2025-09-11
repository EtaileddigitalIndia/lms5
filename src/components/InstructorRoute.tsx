import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import ContentCreator from '../pages/instructor/ContentCreator';

const InstructorRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InstructorDashboard />} />
      <Route path="/courses" element={<ContentCreator />} />
      <Route path="/students" element={<div className="p-6"><h1 className="text-2xl font-bold">Student Management</h1></div>} />
      <Route path="/assignments" element={<div className="p-6"><h1 className="text-2xl font-bold">Assignment Reviews</h1></div>} />
    </Routes>
  );
};

export default InstructorRoute;