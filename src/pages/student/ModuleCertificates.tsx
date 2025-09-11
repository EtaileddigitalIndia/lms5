import React, { useState } from 'react';
import { Award, Download, Calendar, CheckCircle, Lock, Star } from 'lucide-react';
import { useComprehensiveCourse } from '../../context/ComprehensiveCourseContext';
import { useAuth } from '../../context/AuthContext';
import ModuleCertificate from '../../components/ModuleCertificate';

const ModuleCertificates: React.FC = () => {
  const { course, studentProgress, certificationsEarned } = useComprehensiveCourse();
  const { user } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<{
    moduleTitle: string;
    moduleId: string;
    completionDate: Date;
    skills: string[];
  } | null>(null);

  const moduleSkills = {
    'module-1': ['Business Models', 'Market Analysis', 'Digital Transformation'],
    'module-2': ['Shopify Development', 'Theme Customization', 'Store Optimization'],
    'module-3': ['Amazon Selling', 'Flipkart Optimization', 'Marketplace Management'],
    'module-4': ['GST Compliance', 'Business Registration', 'Legal Documentation'],
    'module-5': ['Product Research', 'Pricing Strategy', 'Inventory Management'],
    'module-6': ['SEO Optimization', 'Google Ads', 'Search Marketing'],
    'module-7': ['Facebook Ads', 'Instagram Marketing', 'Meta Advertising'],
    'module-8': ['WhatsApp Marketing', 'Chatbot Development', 'Messaging Strategy'],
    'module-9': ['Email Automation', 'Campaign Management', 'List Building'],
    'module-10': ['Social Media Strategy', 'Content Creation', 'Community Building'],
    'module-11': ['Affiliate Marketing', 'Influencer Partnerships', 'Commission Management'],
    'module-12': ['Copywriting', 'Ad Scripts', 'Persuasive Writing'],
    'module-13': ['UGC Creation', 'Video Marketing', 'Content Strategy'],
    'module-14': ['AI Automation', 'Tool Integration', 'Process Optimization'],
    'module-15': ['Funnel Building', 'Landing Pages', 'Conversion Optimization'],
    'module-16': ['Payment Integration', 'Gateway Setup', 'Transaction Management'],
    'module-17': ['Analytics Setup', 'Data Tracking', 'Performance Measurement'],
    'module-18': ['Retargeting Campaigns', 'Cart Recovery', 'Customer Retention'],
    'module-19': ['Dropshipping', 'Inventory Models', 'Supply Chain'],
    'module-20': ['Budget Planning', 'Ad Scaling', 'ROI Optimization'],
    'module-21': ['Funding Strategy', 'Investor Pitching', 'Financial Planning'],
    'module-22': ['Brand Design', 'Visual Identity', 'Creative Development'],
    'module-23': ['Legal Compliance', 'Policy Creation', 'Risk Management'],
    'module-24': ['Career Preparation', 'Interview Skills', 'Job Search'],
    'module-25': ['Startup Development', 'Business Launch', 'Scaling Strategy']
  };

  const handleViewCertificate = (moduleId: string, moduleTitle: string) => {
    const skills = moduleSkills[moduleId as keyof typeof moduleSkills] || [];
    setSelectedCertificate({
      moduleTitle,
      moduleId,
      completionDate: new Date(),
      skills
    });
  };

  const downloadAllCertificates = () => {
    // Logic to download all certificates as a ZIP file
    console.log('Downloading all certificates...');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certifications</h1>
          <p className="text-gray-600">
            Track your progress and download your professional certificates
          </p>
        </div>
        
        {certificationsEarned.length > 0 && (
          <button
            onClick={downloadAllCertificates}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download All</span>
          </button>
        )}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Certification Progress</h3>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{certificationsEarned.length}/25+</div>
            <div className="text-sm text-gray-500">Certifications Earned</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round((certificationsEarned.length / 25) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(certificationsEarned.length / 25) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{certificationsEarned.length}</div>
            <div className="text-green-700">Completed</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {studentProgress?.completedModules.length || 0}
            </div>
            <div className="text-blue-700">Modules Finished</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {25 - certificationsEarned.length}
            </div>
            <div className="text-purple-700">Remaining</div>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.modules.map((module, index) => {
          const isCompleted = studentProgress?.completedModules.includes(module.id);
          const isEarned = certificationsEarned.includes(module.title);
          const isLocked = !isCompleted && index > 0 && !studentProgress?.completedModules.includes(course.modules[index - 1].id);

          return (
            <div
              key={module.id}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 ${
                isEarned
                  ? 'border-yellow-300 bg-yellow-50'
                  : isCompleted
                  ? 'border-green-300 bg-green-50'
                  : isLocked
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="p-6">
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isEarned
                        ? 'bg-yellow-500 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : isLocked
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {isLocked ? (
                        <Lock className="h-6 w-6" />
                      ) : isEarned ? (
                        <Star className="h-6 w-6" />
                      ) : isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <span className="font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Module {index + 1}
                      </p>
                    </div>
                  </div>

                  {isEarned && (
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Award className="h-4 w-4" />
                      <span className="text-xs font-medium">Certified</span>
                    </div>
                  )}
                </div>

                {/* Module Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Skills Covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {(moduleSkills[module.id as keyof typeof moduleSkills] || []).slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    {isLocked ? (
                      <span className="text-gray-500">Complete previous module</span>
                    ) : isEarned ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Calendar className="h-3 w-3" />
                        <span>Earned: {new Date().toLocaleDateString()}</span>
                      </div>
                    ) : isCompleted ? (
                      <span className="text-green-600">Ready for certificate</span>
                    ) : (
                      <span className="text-blue-600">In progress</span>
                    )}
                  </div>

                  {isEarned ? (
                    <button
                      onClick={() => handleViewCertificate(module.id, module.title)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 transition-colors flex items-center space-x-1"
                    >
                      <Award className="h-3 w-3" />
                      <span>View</span>
                    </button>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleViewCertificate(module.id, module.title)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>Claim</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-500 px-3 py-1 rounded text-xs cursor-not-allowed"
                    >
                      Locked
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Diploma */}
      {studentProgress?.overallProgress === 100 && (
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">🎓 University Diploma</h3>
              <p className="opacity-90">
                Certified E-Commerce & Digital Marketing Professional
              </p>
              <p className="text-sm opacity-75 mt-1">
                Complete program certification with all 25+ modules
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Download Diploma</span>
            </button>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <ModuleCertificate
          moduleTitle={selectedCertificate.moduleTitle}
          moduleId={selectedCertificate.moduleId}
          completionDate={selectedCertificate.completionDate}
          skills={selectedCertificate.skills}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
};

export default ModuleCertificates;