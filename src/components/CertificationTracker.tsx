import React from 'react';
import { Award, Calendar, Download, Star } from 'lucide-react';
import { useComprehensiveCourse } from '../context/ComprehensiveCourseContext';
import { useAuth } from '../context/AuthContext';

const CertificationTracker: React.FC = () => {
  const { course, studentProgress, certificationsEarned, monthsCompleted, internshipStipend } = useComprehensiveCourse();
  const { user } = useAuth();

  const totalModules = course.modules.length;
  const completedModules = studentProgress?.completedModules.length || 0;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  const downloadCertificate = (moduleTitle: string) => {
    // In a real implementation, this would generate and download a PDF certificate
    const certificateData = {
      studentName: user?.name,
      moduleTitle,
      completionDate: new Date().toLocaleDateString(),
      certificateId: `CERT-${moduleTitle.replace(/\s+/g, '-').toUpperCase()}-${user?.id}`
    };
    
    console.log('Downloading certificate:', certificateData);
    // Here you would integrate with a PDF generation service
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Award className="h-6 w-6 text-yellow-500 mr-2" />
          Certification Progress
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{certificationsEarned.length}/25+</div>
          <div className="text-sm text-gray-500">Certifications Earned</div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Program Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Internship Stipend Tracker */}
      {monthsCompleted >= 4 && (
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">Internship Stipend Earned</h4>
              <p className="text-sm text-green-600">Month {monthsCompleted} - Active</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700">₹{internshipStipend.toLocaleString()}</div>
              <div className="text-sm text-green-600">Total Earned</div>
            </div>
          </div>
        </div>
      )}

      {/* Certifications List */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 mb-3">Earned Certifications</h4>
        
        {certificationsEarned.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Award className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Complete modules to earn your first certification</p>
          </div>
        ) : (
          <div className="space-y-2">
            {certificationsEarned.map((certification, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{certification}</h5>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Earned: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadCertificate(certification)}
                  className="flex items-center space-x-1 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Certifications */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Next Certifications</h4>
        <div className="space-y-2">
          {course.modules.slice(completedModules, completedModules + 3).map((module, index) => (
            <div key={module.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{completedModules + index + 1}</span>
              </div>
              <span className="text-sm text-gray-700">{module.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Diploma */}
      {progressPercentage === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">🎓 University Diploma</h4>
              <p className="text-sm opacity-90">Certified E-Commerce & Digital Marketing Professional</p>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
              Download Diploma
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationTracker;