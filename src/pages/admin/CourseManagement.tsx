import React, { useState } from 'react';
import { useEffect } from 'react';
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
  Search,
  Video,
  DollarSign,
  Clock
} from 'lucide-react';
import { CourseData, CourseModule } from '../../types/course';
import { CourseService } from '../../services/courseService';
import toast from 'react-hot-toast';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [importData, setImportData] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: 0,
    currency: 'USD',
    studentCount: 0
  });

  const [moduleForm, setModuleForm] = useState({
    title: '',
    description: '',
    orderIndex: 1
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    youtubeUrl: '',
    orderIndex: 1
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const loadedCourses = await CourseService.getAllCourses();
      setCourses(loadedCourses);
    } catch (error) {
      toast.error('Failed to load courses');
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadModules = async (courseId: string) => {
    try {
      const loadedModules = await CourseService.getCourseModules(courseId);
      setModules(loadedModules);
    } catch (error) {
      toast.error('Failed to load modules');
      console.error('Error loading modules:', error);
    }
  };

  const handleCreateCourse = async () => {
    if (!courseForm.title || !courseForm.description) {
      toast.error('Please fill in course title and description');
      return;
    }

    try {
      const newCourse = await CourseService.createCourse(courseForm);
      setCourses([newCourse, ...courses]);
      setCourseForm({
        title: '',
        description: '',
        thumbnail: '',
        price: 0,
        currency: 'USD',
        studentCount: 0
      });
      setShowCourseForm(false);
      toast.success('Course created successfully!');
    } catch (error) {
      toast.error('Failed to create course');
      console.error('Error creating course:', error);
    }
  };

  const handleCreateModule = async () => {
    if (!selectedCourse || !moduleForm.title || !moduleForm.description) {
      toast.error('Please fill in module title and description');
      return;
    }

    try {
      const newModule = await CourseService.createModule(selectedCourse.id, moduleForm);
      setModules([...modules, newModule]);
      setModuleForm({
        title: '',
        description: '',
        orderIndex: modules.length + 1
      });
      setShowModuleForm(false);
      toast.success('Module created successfully!');
      // Reload course to update stats
      loadCourses();
    } catch (error) {
      toast.error('Failed to create module');
      console.error('Error creating module:', error);
    }
  };

  const handleAddVideo = async () => {
    if (!selectedModuleId || !videoForm.title || !videoForm.youtubeUrl) {
      toast.error('Please fill in all video details');
      return;
    }

    try {
      await CourseService.addVideoToModule(selectedModuleId, videoForm);
      await loadModules(selectedCourse!.id);
      setVideoForm({
        title: '',
        youtubeUrl: '',
        orderIndex: 1
      });
      setShowVideoForm(false);
      setSelectedModuleId(null);
      toast.success('Video added successfully!');
      // Reload course to update stats
      loadCourses();
    } catch (error) {
      toast.error('Failed to add video. Please check the YouTube URL.');
      console.error('Error adding video:', error);
    }
  };

  const handleExportCourse = async (courseId: string) => {
    try {
      const exportData = await CourseService.exportCourse(courseId);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `course-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Course exported successfully!');
    } catch (error) {
      toast.error('Failed to export course');
      console.error('Error exporting course:', error);
    }
  };

  const handleImportCourse = async () => {
    if (!importData.trim()) {
      toast.error('Please paste the JSON data to import');
      return;
    }

    try {
      await CourseService.importCourse(importData);
      await loadCourses();
      setImportData('');
      setShowImportModal(false);
      toast.success('Course imported successfully!');
    } catch (error) {
      toast.error('Failed to import course. Please check the JSON format.');
      console.error('Error importing course:', error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      await CourseService.deleteCourse(courseId);
      setCourses(courses.filter(course => course.id !== courseId));
      if (selectedCourse?.id === courseId) {
        setSelectedCourse(null);
        setModules([]);
      }
      toast.success('Course deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete course');
      console.error('Error deleting course:', error);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Manage course content, modules, and materials</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Import Course</span>
          </button>
          <button
            onClick={() => setShowCourseForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* Course Creation Form */}
      {showCourseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({...courseForm, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description
                </label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the course content and objectives"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL (Optional)
                </label>
                <input
                  type="url"
                  value={courseForm.thumbnail}
                  onChange={(e) => setCourseForm({...courseForm, thumbnail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowCourseForm(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Import Course</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste JSON Data
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Paste your exported course JSON data here..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportCourse}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Import Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
            <option value="all">All Courses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <div className="text-sm text-gray-500 flex items-center">
            Total Courses: {courses.length}
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid gap-6">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Found</h3>
            <p className="text-gray-600 mb-6">Create your first course to get started</p>
            <button
              onClick={() => setShowCourseForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create First Course
            </button>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>{course.moduleCount} modules</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>{Math.round(course.totalDuration / 60)}h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>{course.studentCount} students</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span>{course.currency} {course.price}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Created: {course.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExportCourse(course.id)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Export Course"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={async () => {
                    setSelectedCourse(course);
                    await loadModules(course.id);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Course"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {/* Edit functionality */}}
                  className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  title="Edit Course"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowModuleForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Module</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Course Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Modules:</span>
                    <span className="ml-2 text-gray-900">{selectedCourse.moduleCount}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="ml-2 text-gray-900">{Math.round(selectedCourse.totalDuration / 60)}h</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Students:</span>
                    <span className="ml-2 text-gray-900">{selectedCourse.studentCount}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="ml-2 text-gray-900">{selectedCourse.currency} {selectedCourse.price}</span>
                  </div>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Modules ({modules.length})</h3>
                
                {modules.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No modules created yet. Add your first module to get started.</p>
                  </div>
                ) : (
                  modules.map((module, index) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{module.videos.length} videos</span>
                              <span>{module.duration} minutes</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedModuleId(module.id);
                            setVideoForm({
                              ...videoForm,
                              orderIndex: module.videos.length + 1
                            });
                            setShowVideoForm(true);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                          <Video className="h-3 w-3" />
                          <span>Add Video</span>
                        </button>
                      </div>
                      
                      {/* Videos List */}
                      {module.videos.length > 0 && (
                        <div className="mt-4 ml-11 space-y-2">
                          {module.videos.map((video, videoIndex) => (
                            <div key={video.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                              <div className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center text-xs">
                                {videoIndex + 1}
                              </div>
                              <div className="flex-1">
                                <span className="text-sm font-medium text-gray-900">{video.title}</span>
                                <div className="text-xs text-gray-500">{video.duration} min</div>
                              </div>
                              <a
                                href={video.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-xs"
                              >
                                View
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setModules([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Module Creation Form */}
      {showModuleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Module</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Title
                </label>
                <input
                  type="text"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({...moduleForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter module title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Description
                </label>
                <textarea
                  value={moduleForm.description}
                  onChange={(e) => setModuleForm({...moduleForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the module content"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowModuleForm(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateModule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Addition Form */}
      {showVideoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add YouTube Video</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter video title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={videoForm.youtubeUrl}
                  onChange={(e) => setVideoForm({...videoForm, youtubeUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste the full YouTube URL here
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowVideoForm(false);
                  setSelectedModuleId(null);
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVideo}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
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