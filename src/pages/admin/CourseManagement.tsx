import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Filter,
  Search
} from 'lucide-react';
import { comprehensiveCourse } from '../../data/comprehensiveCourseData';

const CourseManagement: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const course = comprehensiveCourse;

  const filteredModules = course.modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddModule = () => {
    // Add new module logic
    console.log('Add new module');
  };

  const handleEditModule = (moduleId: string) => {
    // Edit module logic
    console.log('Edit module:', moduleId);
  };

  const handleDeleteModule = (moduleId: string) => {
    // Delete module logic
    console.log('Delete module:', moduleId);
  };

  const handleViewModule = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Manage course content, modules, and materials</p>
        </div>
        <button
          onClick={handleAddModule}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Module</span>
        </button>
      </div>

      {/* Course Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start space-x-4">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-24 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Modules:</span>
                <span className="ml-1 text-gray-900">{course.modules.length}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Duration:</span>
                <span className="ml-1 text-gray-900">{Math.round(course.totalDuration / 60)} hours</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Students:</span>
                <span className="ml-1 text-gray-900">{course.students.length}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Price:</span>
                <span className="ml-1 text-gray-900">₹{course.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Modules</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="not-started">Not Started</option>
          </select>

          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="grid gap-6">
        {filteredModules.map((module, index) => (
          <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold">
                  {module.order}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>{module.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>2,547 students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Certificate included</span>
                    </div>
                    <div>
                      <span className="text-gray-500">
                        {Math.round(module.lessons.reduce((acc, lesson) => acc + lesson.duration, 0) / 60)} hours
                      </span>
                    </div>
                  </div>

                  {/* Lessons Preview */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Lessons:</h4>
                    <div className="space-y-1">
                      {module.lessons.slice(0, 3).map((lesson) => (
                        <div key={lesson.id} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>{lesson.title}</span>
                          <span className="text-gray-400">({lesson.duration}min)</span>
                        </div>
                      ))}
                      {module.lessons.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{module.lessons.length - 3} more lessons
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewModule(module.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Module"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEditModule(module.id)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit Module"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteModule(module.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Module"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Module Status */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Published
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module Details Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Module Details</h2>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Module details content would go here */}
              <p className="text-gray-600">Detailed module information and management options...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;