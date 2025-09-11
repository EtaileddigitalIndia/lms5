import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Save, 
  FileText, 
  Video, 
  Presentation, 
  BookOpen,
  CheckCircle,
  Trash2,
  Edit,
  Upload,
  Download,
  FileUp
} from 'lucide-react';
import { Module, Lesson, Quiz, Assignment, CourseMaterial } from '../../types/course';
import { ModuleService } from '../../services/moduleService';
import toast from 'react-hot-toast';

const ModuleCreator: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentModule, setCurrentModule] = useState<Partial<Module>>({
    title: '',
    description: '',
    order: 1,
    lessons: [],
    completed: false
  });
  const [currentLesson, setCurrentLesson] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    duration: 0,
    materials: [],
    completed: false,
    order: 1
  });
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [importData, setImportData] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      setIsLoading(true);
      const loadedModules = await ModuleService.getAllModules();
      setModules(loadedModules);
    } catch (error) {
      toast.error('Failed to load modules');
      console.error('Error loading modules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateModule = async () => {
    if (!currentModule.title || !currentModule.description) {
      toast.error('Please fill in module title and description');
      return;
    }

    try {
      const newModule = await ModuleService.createModule({
        title: currentModule.title,
        description: currentModule.description,
        order: modules.length + 1
      });

      setModules([...modules, newModule]);
      setCurrentModule({
        title: '',
        description: '',
        order: modules.length + 2,
        lessons: [],
        completed: false
      });
      setShowModuleForm(false);
      toast.success('Module created successfully!');
    } catch (error) {
      toast.error('Failed to create module');
      console.error('Error creating module:', error);
    }
  };

  const handleCreateLesson = async (moduleId: string) => {
    if (!currentLesson.title || !currentLesson.description) {
      toast.error('Please fill in lesson title and description');
      return;
    }

    try {
      const newLesson = await ModuleService.createLesson(moduleId, {
        title: currentLesson.title,
        description: currentLesson.description,
        duration: currentLesson.duration || 30,
        order: 1
      });

      // Reload modules to get updated data
      await loadModules();

      setCurrentLesson({
        title: '',
        description: '',
        duration: 0,
        materials: [],
        completed: false,
        order: 1
      });
      setShowLessonForm(false);
      toast.success('Lesson created successfully!');
    } catch (error) {
      toast.error('Failed to create lesson');
      console.error('Error creating lesson:', error);
    }
  };

  const handleAddMaterial = async (lessonId: string, material: Omit<CourseMaterial, 'id'>) => {
    try {
      await ModuleService.addMaterial(lessonId, material);
      await loadModules();
      toast.success('Material added successfully!');
    } catch (error) {
      toast.error('Failed to add material');
      console.error('Error adding material:', error);
    }
  };

  const handleAddQuiz = async (lessonId: string) => {
    const quiz: Omit<Quiz, 'id' | 'attempts'> = {
      title: 'Module Assessment',
      description: 'Test your understanding of this module',
      questions: [],
      timeLimit: 30,
      passingScore: 70,
      maxAttempts: 3
    };

    try {
      await ModuleService.createQuiz(lessonId, quiz);
      await loadModules();
      toast.success('Quiz added successfully!');
    } catch (error) {
      toast.error('Failed to add quiz');
      console.error('Error adding quiz:', error);
    }
  };

  const handleAddAssignment = async (lessonId: string) => {
    const assignment: Omit<Assignment, 'id' | 'submissions'> = {
      title: 'Module Assignment',
      description: 'Complete this assignment to demonstrate your learning',
      instructions: 'Please complete the following tasks and submit your work.',
      maxScore: 100,
      submissionType: 'file'
    };

    try {
      await ModuleService.createAssignment(lessonId, assignment);
      await loadModules();
      toast.success('Assignment added successfully!');
    } catch (error) {
      toast.error('Failed to add assignment');
      console.error('Error adding assignment:', error);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      return;
    }

    try {
      await ModuleService.deleteModule(moduleId);
      setModules(modules.filter(module => module.id !== moduleId));
      toast.success('Module deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete module');
      console.error('Error deleting module:', error);
    }
  };

  const handleExportModules = async () => {
    try {
      const exportData = await ModuleService.exportModules();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `modules-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Modules exported successfully!');
    } catch (error) {
      toast.error('Failed to export modules');
      console.error('Error exporting modules:', error);
    }
  };

  const handleImportModules = async () => {
    if (!importData.trim()) {
      toast.error('Please paste the JSON data to import');
      return;
    }

    try {
      await ModuleService.importModules(importData);
      await loadModules();
      setImportData('');
      setShowImportModal(false);
      toast.success('Modules imported successfully!');
    } catch (error) {
      toast.error('Failed to import modules. Please check the JSON format.');
      console.error('Error importing modules:', error);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSaveAllModules = () => {
    // In a real application, this would save to a database
    localStorage.setItem('course_modules', JSON.stringify(modules));
    toast.success('All modules saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Module Creator</h1>
          <p className="text-gray-600">Create and manage course modules with lessons, materials, and assessments</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <FileUp className="h-4 w-4" />
            <span>Import</span>
          </button>
          <button
            onClick={handleExportModules}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowModuleForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Module</span>
          </button>
          <button
            onClick={handleSaveAllModules}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Import Modules</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload JSON File
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="text-center text-gray-500">
                <span>OR</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste JSON Data
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Paste your exported JSON data here..."
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
                  onClick={handleImportModules}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Import Modules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Creation Form */}
      {showModuleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Module</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Title
                </label>
                <input
                  type="text"
                  value={currentModule.title || ''}
                  onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter module title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Description
                </label>
                <textarea
                  value={currentModule.description || ''}
                  onChange={(e) => setCurrentModule({...currentModule, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what students will learn in this module"
                />
              </div>

              <div className="flex justify-end space-x-4">
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
                  Create Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-6">
        {modules.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Modules Created</h3>
            <p className="text-gray-600 mb-6">Start by creating your first module or import existing ones</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModuleForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create First Module
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Import Modules
              </button>
            </div>
          </div>
        ) : (
          modules.map((module, index) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingModule(module.id)}
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

              {/* Module Actions */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setShowLessonForm(true)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Lesson</span>
                </button>
                <button
                  onClick={() => handleAddQuiz(module.lessons[0]?.id)}
                  disabled={!module.lessons.length}
                  className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="h-3 w-3" />
                  <span>Add Assessment</span>
                </button>
                <button
                  onClick={() => handleAddAssignment(module.lessons[0]?.id)}
                  disabled={!module.lessons.length}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-3 w-3" />
                  <span>Add Assignment</span>
                </button>
              </div>

              {/* Lessons List */}
              {module.lessons.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Lessons ({module.lessons.length})</h4>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {lessonIndex + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{lesson.duration}min</span>
                          {lesson.materials.length > 0 && (
                            <span>• {lesson.materials.length} materials</span>
                          )}
                          {lesson.quiz && <span>• Quiz</span>}
                          {lesson.assignment && <span>• Assignment</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lesson Creation Form */}
              {showLessonForm && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Add New Lesson</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lesson Title
                      </label>
                      <input
                        type="text"
                        value={currentLesson.title || ''}
                        onChange={(e) => setCurrentLesson({...currentLesson, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter lesson title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lesson Description
                      </label>
                      <textarea
                        value={currentLesson.description || ''}
                        onChange={(e) => setCurrentLesson({...currentLesson, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe the lesson content"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={currentLesson.duration || ''}
                        onChange={(e) => setCurrentLesson({...currentLesson, duration: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="30"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowLessonForm(false)}
                        className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleCreateLesson(module.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Add Lesson
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {modules.length > 0 && (
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Course Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Total Modules:</span>
              <span className="ml-2 text-blue-700">{modules.length}</span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Total Lessons:</span>
              <span className="ml-2 text-blue-700">
                {modules.reduce((acc, module) => acc + module.lessons.length, 0)}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Total Duration:</span>
              <span className="ml-2 text-blue-700">
                {Math.round(modules.reduce((acc, module) => 
                  acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0), 0
                ) / 60)} hours
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Assessments:</span>
              <span className="ml-2 text-blue-700">
                {modules.reduce((acc, module) => 
                  acc + module.lessons.reduce((lessonAcc, lesson) => 
                    lessonAcc + (lesson.quiz ? 1 : 0) + (lesson.assignment ? 1 : 0), 0
                  ), 0
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleCreator;