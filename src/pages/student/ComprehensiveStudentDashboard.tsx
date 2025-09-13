import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComprehensiveCourse } from '../../context/ComprehensiveCourseContext';
import CertificationTracker from '../../components/CertificationTracker';
import StartupTracker from '../../components/StartupTracker';
import ResourceVault from '../../components/ResourceVault';
import ModuleCertificateGenerator from '../../components/ModuleCertificateGenerator';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  PlayCircle,
  CheckCircle,
  Calendar,
  Target,
  DollarSign,
  Users,
  MessageSquare,
  FileText,
  Folder,
  Star
} from 'lucide-react';

const ComprehensiveStudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    course, 
    studentProgress, 
    internshipStipend, 
    monthsCompleted, 
    certificationsEarned 
  } = useComprehensiveCourse();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'certifications' | 'startup' | 'resources'>('overview');
  const [showCertificate, setShowCertificate] = useState<{ moduleId: string; moduleTitle: string } | null>(null);

  const stats = [
    {
      icon: BookOpen,
      title: 'Modules Completed',
      value: `${studentProgress?.completedModules.length || 0}/25`,
      color: 'bg-blue-500'
    },
    {
      icon: Award,
      title: 'Certifications Earned',
      value: `${certificationsEarned.length}/25+`,
      color: 'bg-yellow-500'
    },
    {
      icon: DollarSign,
      title: 'Internship Stipend',
      value: `₹${internshipStipend.toLocaleString()}`,
      color: 'bg-green-500'
    },
    {
      icon: TrendingUp,
      title: 'Overall Progress',
      value: `${studentProgress?.overallProgress || 0}%`,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      action: 'Completed module',
      item: 'Fundamentals of E-Commerce',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      action: 'Earned certification',
      item: 'E-Commerce Business Models',
      time: '1 day ago',
      icon: Award,
      color: 'text-yellow-500'
    },
    {
      action: 'Started module',
      item: 'Shopify Store Setup & Optimization',
      time: '2 days ago',
      icon: PlayCircle,
      color: 'text-blue-500'
    }
  ];

  const upcomingMilestones = [
    { title: 'Complete Shopify Module', progress: 60, dueDate: '3 days' },
    { title: 'Submit Store Setup Assignment', progress: 0, dueDate: '1 week' },
    { title: 'Pass Amazon Selling Quiz', progress: 0, dueDate: '2 weeks' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'certifications':
        return <CertificationTracker />;
      case 'startup':
        return <StartupTracker />;
      case 'resources':
        return <ResourceVault />;
      default:
        return (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Course Progress */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h3>
                
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Overall Progress</span>
                        <span>{studentProgress?.overallProgress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${studentProgress?.overallProgress || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Link
                        to={`/student/course/${course.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>Continue Learning</span>
                      </Link>
                      
                      {studentProgress?.certificateIssued && (
                        <Link
                          to={`/student/certificate/${course.id}`}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Award className="h-4 w-4" />
                          <span>Download Diploma</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Internship Stipend Info */}
                {monthsCompleted >= 4 && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-green-800">Internship Stipend Active</h5>
                        <p className="text-sm text-green-600">
                          You're earning ₹10,000/month starting from month 4
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-700">
                          ₹{internshipStipend.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">Total Earned</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Module Progress */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Module Progress</h3>
                
                <div className="space-y-4">
                  {course.modules.slice(0, 8).map((module, index) => {
                    const totalLessons = module.lessons.length;
                    const completedLessons = studentProgress?.completedLessons.filter(lessonId =>
                      module.lessons.some(lesson => lesson.id === lessonId)
                    ).length || 0;
                    const moduleProgress = Math.round((completedLessons / totalLessons) * 100);
                    const isCompleted = studentProgress?.completedModules.includes(module.id);

                    return (
                      <div key={module.id} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : moduleProgress > 0 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{module.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-40 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${moduleProgress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{moduleProgress}%</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {completedLessons}/{totalLessons} lessons
                        </div>
                        {isCompleted && (
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star className="h-4 w-4" />
                            <button
                              onClick={() => setShowCertificate({ moduleId: module.id, moduleTitle: module.title })}
                              className="text-xs hover:underline"
                            >
                              View Certificate
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.action}</span>{' '}
                            {activity.item}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Milestones */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
                
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-900">{milestone.title}</span>
                        <span className="text-xs text-gray-500">{milestone.dueDate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Join Community Forum</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <FileText className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Submit Assignment</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">Schedule Mentor Call</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Folder className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Access Resource Vault</span>
                  </button>
                </div>
              </div>

              {/* Program Benefits */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Program Benefits</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>25+ Professional Certifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>University Diploma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Job Guarantee Program</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>₹10K/month Internship Stipend</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Startup Building Track</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 🚀
        </h1>
        <p className="text-gray-600">
          Your journey to becoming a Certified E-Commerce & Digital Marketing Professional
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'certifications', label: 'Certifications', icon: Award },
              { id: 'startup', label: 'Startup Tracker', icon: TrendingUp },
              { id: 'resources', label: 'Resource Vault', icon: Folder }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Module Certificate Modal */}
      {showCertificate && (
        <ModuleCertificateGenerator
          module={{
            id: showCertificate.moduleId,
            title: showCertificate.moduleTitle,
            description: '',
            orderIndex: 0,
            duration: 0,
            videos: [],
            courseId: course.id,
            createdAt: new Date(),
            updatedAt: new Date()
          }}
          courseName={course.title}
          onClose={() => setShowCertificate(null)}
        />
      )}
    </div>
  );
};

export default ComprehensiveStudentDashboard;