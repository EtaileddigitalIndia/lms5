import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  PlayCircle,
  CheckCircle,
  Calendar,
  Target
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, getCourseProgress } = useCourse();
  
  const enrolledCourse = courses[0]; // For demo, using the default course
  const progress = getCourseProgress(enrolledCourse.id);

  const stats = [
    {
      icon: BookOpen,
      title: 'Enrolled Courses',
      value: '1',
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      title: 'Hours Learned',
      value: progress ? Math.round((progress.completedLessons.length * 60) / 60) : '0',
      color: 'bg-green-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress',
      value: `${progress?.overallProgress || 0}%`,
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      title: 'Certificates',
      value: progress?.certificateIssued ? '1' : '0',
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      action: 'Completed lesson',
      item: 'Introduction to E-Commerce Business Models',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      action: 'Started module',
      item: 'Foundations of E-Commerce & Digital Marketing',
      time: '1 day ago',
      icon: PlayCircle,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Continue your journey to becoming a certified e-commerce professional
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Course */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Current Course</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={enrolledCourse.thumbnail}
                  alt={enrolledCourse.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {enrolledCourse.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {enrolledCourse.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{progress?.overallProgress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress?.overallProgress || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      to={`/student/course/${enrolledCourse.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span>Continue Learning</span>
                    </Link>
                    
                    {progress?.certificateIssued && (
                      <Link
                        to={`/student/certificate/${enrolledCourse.id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Award className="h-4 w-4" />
                        <span>Download Certificate</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Module Progress</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {enrolledCourse.modules.slice(0, 5).map((module, index) => {
                  const totalLessons = module.lessons.length;
                  const completedLessons = progress?.completedLessons.filter(lessonId =>
                    module.lessons.some(lesson => lesson.id === lessonId)
                  ).length || 0;
                  const moduleProgress = Math.round((completedLessons / totalLessons) * 100);

                  return (
                    <div key={module.id} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{module.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${moduleProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{moduleProgress}%</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {completedLessons}/{totalLessons}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
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
          </div>

          {/* Next Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Next Goals</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">Complete Module 1</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Submit first assignment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-700">Pass quiz with 80%+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <p className="text-sm opacity-90 mb-4">
              Get support from our instructors and community
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;