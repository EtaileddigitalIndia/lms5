import React from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  Award,
  Clock,
  UserCheck,
  BarChart3
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      icon: Users,
      title: 'Total Students',
      value: '2,547',
      change: '+12%',
      changeType: 'positive' as const,
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Active Courses',
      value: '1',
      change: '0%',
      changeType: 'neutral' as const,
      color: 'bg-green-500'
    },
    {
      icon: DollarSign,
      title: 'Total Revenue',
      value: '₹3,00,54,600',
      change: '+18%',
      changeType: 'positive' as const,
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      title: 'Certificates Issued',
      value: '1,823',
      change: '+25%',
      changeType: 'positive' as const,
      color: 'bg-orange-500'
    }
  ];

  const recentEnrollments = [
    { name: 'Rahul Sharma', email: 'rahul@example.com', course: 'E-Commerce Pro', date: '2 hours ago' },
    { name: 'Priya Patel', email: 'priya@example.com', course: 'E-Commerce Pro', date: '4 hours ago' },
    { name: 'Amit Kumar', email: 'amit@example.com', course: 'E-Commerce Pro', date: '6 hours ago' },
    { name: 'Sneha Singh', email: 'sneha@example.com', course: 'E-Commerce Pro', date: '8 hours ago' },
    { name: 'Vikash Gupta', email: 'vikash@example.com', course: 'E-Commerce Pro', date: '1 day ago' }
  ];

  const topPerformers = [
    { name: 'Arjun Mehta', progress: 95, modules: 10, score: 'A+' },
    { name: 'Kavya Reddy', progress: 92, modules: 10, score: 'A+' },
    { name: 'Rohit Jain', progress: 88, modules: 9, score: 'A' },
    { name: 'Anita Desai', progress: 85, modules: 9, score: 'A' },
    { name: 'Suresh Nair', progress: 82, modules: 8, score: 'B+' }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Overview of your learning management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Enrollments</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentEnrollments.map((enrollment, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {enrollment.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{enrollment.name}</h4>
                      <p className="text-sm text-gray-600">{enrollment.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{enrollment.course}</p>
                      <p className="text-xs text-gray-500">{enrollment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
            </div>
            <div className="p-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Revenue chart would be displayed here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{performer.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-600 h-1.5 rounded-full"
                            style={{ width: `${performer.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{performer.progress}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{performer.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-700">Avg. Completion Time</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">45 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">Completion Rate</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-700">Job Placement Rate</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-700">Avg. Course Rating</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">4.8/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">System Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Status</span>
                <span className="font-medium">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Database</span>
                <span className="font-medium">Healthy</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CDN</span>
                <span className="font-medium">Active</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm opacity-90">
                All systems operational
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;