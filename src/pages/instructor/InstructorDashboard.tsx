import React from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText
} from 'lucide-react';

const InstructorDashboard: React.FC = () => {
  const stats = [
    {
      icon: BookOpen,
      title: 'My Courses',
      value: '1',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Total Students',
      value: '2,547',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'Certificates Issued',
      value: '1,823',
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Course Rating',
      value: '4.8/5',
      color: 'bg-orange-500'
    }
  ];

  const recentStudents = [
    { name: 'Rahul Sharma', progress: 85, lastActive: '2 hours ago', status: 'active' },
    { name: 'Priya Patel', progress: 92, lastActive: '4 hours ago', status: 'active' },
    { name: 'Amit Kumar', progress: 67, lastActive: '1 day ago', status: 'inactive' },
    { name: 'Sneha Singh', progress: 78, lastActive: '6 hours ago', status: 'active' },
    { name: 'Vikash Gupta', progress: 45, lastActive: '3 days ago', status: 'inactive' }
  ];

  const pendingAssignments = [
    { student: 'Arjun Mehta', assignment: 'Market Research Project', submitted: '2 hours ago' },
    { student: 'Kavya Reddy', assignment: 'Capstone Project', submitted: '4 hours ago' },
    { student: 'Rohit Jain', assignment: 'Market Research Project', submitted: '1 day ago' },
    { student: 'Anita Desai', assignment: 'Capstone Project', submitted: '2 days ago' }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
        <p className="text-gray-600">
          Manage your courses and track student progress
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
        {/* Course Overview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Course Overview</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Course thumbnail"
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Certified E-Commerce & Digital Marketing Professional
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Complete professional certification program with job guarantee
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Students:</span>
                      <span className="ml-1 text-gray-900">2,547</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Modules:</span>
                      <span className="ml-1 text-gray-900">10</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Duration:</span>
                      <span className="ml-1 text-gray-900">20+ hours</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Rating:</span>
                      <span className="ml-1 text-gray-900">4.8/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Student Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Student Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentStudents.map((student, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-24 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{student.progress}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{student.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Assignments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Pending Reviews
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingAssignments.map((assignment, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-medium text-gray-900 text-sm">{assignment.student}</h4>
                    <p className="text-sm text-gray-600">{assignment.assignment}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {assignment.submitted}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Review All
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Add New Lesson</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Create Assignment</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">Send Announcement</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Award className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Issue Certificates</span>
                </button>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm opacity-90">New Enrollments</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm opacity-90">Completions</span>
                <span className="font-semibold">189</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm opacity-90">Avg. Rating</span>
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm opacity-90">Response Time</span>
                <span className="font-semibold">2.3 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;