import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ComprehensiveStudentDashboard from '../pages/student/ComprehensiveStudentDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';
import CourseViewer from '../pages/student/CourseViewer';
import CertificatePage from '../pages/student/CertificatePage';
import ModuleCertificates from '../pages/student/ModuleCertificates';

const StudentRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ComprehensiveStudentDashboard />} />
      <Route path="/basic" element={<StudentDashboard />} />
      <Route path="/course/:courseId" element={<CourseViewer />} />
      <Route path="/certificate/:courseId" element={<CertificatePage />} />
      <Route path="/certificates" element={<ModuleCertificates />} />
      <Route path="/courses" element={<div className="p-6"><h1 className="text-2xl font-bold">My Courses</h1></div>} />
      <Route path="/continue" element={<div className="p-6"><h1 className="text-2xl font-bold">Continue Learning</h1></div>} />
    </Routes>
  );
};

export default StudentRoute;