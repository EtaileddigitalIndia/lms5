import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Video, 
  Trash2, 
  Edit, 
  Play,
  Clock,
  Award,
  Download,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { CourseModule, ModuleVideo } from '../types/course';
import { CourseService } from '../services/courseService';
import YouTubePlayer from './YouTubePlayer';
import toast from 'react-hot-toast';

interface ModuleManagerProps {
  courseId: string;
  onModulesChange?: () => void;
}

const ModuleManager: React.FC<ModuleManagerProps> = ({ courseId, onModulesChange }) => {
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);

  const [moduleForm, setModuleForm] = useState({
    title: '',
    description: ''
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    youtubeUrl: ''
  });

  useEffect(() => {
    loadModules();
  }, [courseId]);

  const loadModules = async () => {
    try {
      setIsLoading(true);
      const loadedModules = await CourseService.getCourseModules(courseId);
      setModules(loadedModules);
    } catch (error) {
      toast.error('Failed to load modules');
      console.error('Error loading modules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateModule = async () => {
    if (!moduleForm.title || !moduleForm.description) {
      toast.error('Please fill in module title and description');
      return;
    }

    try {
      const newModule = await CourseService.createModule(courseId, {
        title: moduleForm.title,
        description: moduleForm.description,
        orderIndex: modules.length + 1,
        duration: 0
      });

      setModules([...modules, newModule]);
      setModuleForm({ title: '', description: '' });
      setShowModuleForm(false);
      toast.success('Module created successfully!');
      onModulesChange?.();
    } catch (error) {
      toast.error('Failed to create module');
      console.error('Error creating module:', error);
    }
  };

  const handleUpdateModule = async () => {
    if (!editingModule || !moduleForm.title || !moduleForm.description) {
      toast.error('Please fill in module title and description');
      return;
    }

    try {
      const updatedModule = await CourseService.updateModule(editingModule.id, {
        title: moduleForm.title,
        description: moduleForm.description,
        orderIndex: editingModule.orderIndex
      });

      setModules(modules.map(m => m.id === editingModule.id ? { ...updatedModule, videos: editingModule.videos } : m));
      setModuleForm({ title: '', description: '' });
      setEditingModule(null);
      toast.success('Module updated successfully!');
      onModulesChange?.();
    } catch (error) {
      toast.error('Failed to update module');
      console.error('Error updating module:', error);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this module? All videos will be deleted.')) {
      return;
    }

    try {
      await CourseService.deleteModule(moduleId);
      setModules(modules.filter(m => m.id !== moduleId));
      toast.success('Module deleted successfully!');
      onModulesChange?.();
    } catch (error) {
      toast.error('Failed to delete module');
      console.error('Error deleting module:', error);
    }
  };

  const handleAddVideo = async () => {
    if (!selectedModuleId || !videoForm.title || !videoForm.youtubeUrl) {
      toast.error('Please fill in all video details');
      return;
    }

    try {
      const selectedModule = modules.find(m => m.id === selectedModuleId);
      if (!selectedModule) {
        toast.error('Module not found');
        return;
      }

      const newVideo = await CourseService.addVideoToModule(selectedModuleId, {
        title: videoForm.title,
        youtubeUrl: videoForm.youtubeUrl,
        orderIndex: selectedModule.videos.length + 1
      });

      // Update the module with the new video
      setModules(modules.map(m => 
        m.id === selectedModuleId 
          ? { ...m, videos: [...m.videos, newVideo] }
          : m
      ));

      setVideoForm({ title: '', youtubeUrl: '' });
      setShowVideoForm(false);
      setSelectedModuleId(null);
      toast.success('Video added successfully!');
      onModulesChange?.();
    } catch (error) {
      toast.error('Failed to add video. Please check the YouTube URL.');
      console.error('Error adding video:', error);
    }
  };

  const handleDeleteVideo = async (videoId: string, moduleId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      await CourseService.deleteVideo(videoId);
      
      // Update the module by removing the video
      setModules(modules.map(m => 
        m.id === moduleId 
          ? { ...m, videos: m.videos.filter(v => v.id !== videoId) }
          : m
      ));

      toast.success('Video deleted successfully!');
      onModulesChange?.();
    } catch (error) {
      toast.error('Failed to delete video');
      console.error('Error deleting video:', error);
    }
  };

  const startEditModule = (module: CourseModule) => {
    setEditingModule(module);
    setModuleForm({
      title: module.title,
      description: module.description
    });
    setShowModuleForm(true);
  };

  const cancelEdit = () => {
    setEditingModule(null);
    setModuleForm({ title: '', description: '' });
    setShowModuleForm(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Course Modules</h3>
        <button
          onClick={() => setShowModuleForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Module</span>
        </button>
      </div>

      {/* Modules List */}
      {modules.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Modules Yet</h4>
          <p className="text-gray-600 mb-4">Start by creating your first module</p>
          <button
            onClick={() => setShowModuleForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create First Module
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div key={module.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h4>
                    <p className="text-gray-600 mb-3">{module.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Video className="h-4 w-4" />
                        <span>{module.videos.length} videos</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(module.duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      setVideoForm({ title: '', youtubeUrl: '' });
                      setShowVideoForm(true);
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Video</span>
                  </button>
                  <button
                    onClick={() => startEditModule(module)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Videos List */}
              {module.videos.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-3">Videos ({module.videos.length})</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.videos.map((video, videoIndex) => (
                      <div key={video.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center text-xs font-medium">
                              {videoIndex + 1}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{video.title}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteVideo(video.id, module.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <YouTubePlayer
                          videoId={video.youtubeId}
                          title={video.title}
                          width="100%"
                          height="120px"
                          className="mb-3"
                        />
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{video.duration} min</span>
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>YouTube</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module Certificate */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Module completion certificate available</span>
                  </div>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>Preview Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Module Form Modal */}
      {showModuleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingModule ? 'Edit Module' : 'Add New Module'}
                </h3>
                <button
                  onClick={cancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
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
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingModule ? handleUpdateModule : handleCreateModule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingModule ? 'Update' : 'Create'} Module</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Form Modal */}
      {showVideoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add YouTube Video</h3>
                <button
                  onClick={() => {
                    setShowVideoForm(false);
                    setSelectedModuleId(null);
                    setVideoForm({ title: '', youtubeUrl: '' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
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
                  Paste the full YouTube URL here. Video details will be automatically fetched.
                </p>
              </div>

              {/* YouTube Preview */}
              {videoForm.youtubeUrl && CourseService.extractYouTubeId(videoForm.youtubeUrl) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Preview
                  </label>
                  <YouTubePlayer
                    videoId={CourseService.extractYouTubeId(videoForm.youtubeUrl)!}
                    title={videoForm.title || 'Video Preview'}
                    width="100%"
                    height="200px"
                  />
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowVideoForm(false);
                  setSelectedModuleId(null);
                  setVideoForm({ title: '', youtubeUrl: '' });
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVideo}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Video className="h-4 w-4" />
                <span>Add Video</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleManager;