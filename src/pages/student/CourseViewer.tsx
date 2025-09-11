import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Pizza as Quiz, 
  Lock, 
  ChevronRight, 
  ChevronDown, 
  Award, 
  ArrowLeft, 
  BookOpen,
  Download,
  ExternalLink,
  Video,
  FileImage,
  Presentation
} from 'lucide-react';
import QuizComponent from '../../components/QuizComponent';
import AssignmentComponent from '../../components/AssignmentComponent';

const CourseViewer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, markLessonComplete, getCourseProgress, isLessonUnlocked } = useCourse();
  const { user } = useAuth();
  
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'content' | 'materials' | 'quiz' | 'assignment'>('content');

  const course = courses.find(c => c.id === courseId);
  const progress = getCourseProgress(courseId!);

  useEffect(() => {
    if (course && !selectedLessonId) {
      // Find first unlocked lesson
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          if (isLessonUnlocked(course.id, lesson.id)) {
            setSelectedLessonId(lesson.id);
            setExpandedModules(new Set([module.id]));
            break;
          }
        }
        if (selectedLessonId) break;
      }
    }
  }, [course, selectedLessonId, isLessonUnlocked]);

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/student')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const selectedLesson = course.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === selectedLessonId);

  const handleLessonSelect = (lessonId: string) => {
    if (isLessonUnlocked(course.id, lessonId)) {
      setSelectedLessonId(lessonId);
      setActiveTab('content');
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLessonId) {
      markLessonComplete(course.id, selectedLessonId);
    }
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'pdf':
      case 'document':
        return FileText;
      case 'image':
        return FileImage;
      case 'presentation':
        return Presentation;
      case 'link':
        return ExternalLink;
      default:
        return FileText;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Course Structure */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => navigate('/student')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {course.title}
          </h2>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Course Progress</span>
              <span>{progress?.overallProgress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress?.overallProgress || 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatDuration(course.totalDuration)} total</span>
              <span>{progress?.completedLessons.length || 0}/{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons</span>
            </div>
          </div>
        </div>

        {/* Module List */}
        <div className="p-4">
          {course.modules.map((module) => (
            <div key={module.id} className="mb-4">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {module.order}
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-gray-900 text-sm">
                      {module.title}
                    </span>
                    <div className="text-xs text-gray-500">
                      {module.lessons.length} lessons • {formatDuration(module.lessons.reduce((acc, l) => acc + l.duration, 0))}
                    </div>
                  </div>
                </div>
                {expandedModules.has(module.id) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {expandedModules.has(module.id) && (
                <div className="mt-2 ml-4 space-y-1">
                  {module.lessons.map((lesson) => {
                    const isCompleted = progress?.completedLessons.includes(lesson.id);
                    const isUnlocked = isLessonUnlocked(course.id, lesson.id);
                    const isActive = selectedLessonId === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson.id)}
                        disabled={!isUnlocked}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                          isActive
                            ? 'bg-blue-50 border border-blue-200'
                            : isUnlocked
                            ? 'hover:bg-gray-50'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {!isUnlocked ? (
                            <Lock className="h-4 w-4 text-gray-400" />
                          ) : isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            isActive ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatDuration(lesson.duration)}</span>
                            {lesson.materials.length > 0 && (
                              <>
                                <span>•</span>
                                <span>{lesson.materials.length} materials</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedLesson ? (
          <>
            {/* Lesson Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedLesson.title}
                  </h1>
                  <p className="text-gray-600">{selectedLesson.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(selectedLesson.duration)}</span>
                    </div>
                    {selectedLesson.materials.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{selectedLesson.materials.length} materials</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {!progress?.completedLessons.includes(selectedLesson.id) && (
                    <button
                      onClick={handleCompleteLesson}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                  
                  {progress?.overallProgress === 100 && (
                    <button
                      onClick={() => navigate(`/student/certificate/${course.id}`)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Award className="h-4 w-4" />
                      <span>Get Certificate</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-6 mt-6">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex items-center space-x-2 pb-2 border-b-2 font-medium ${
                    activeTab === 'content'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Content</span>
                </button>

                {selectedLesson.materials.length > 0 && (
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`flex items-center space-x-2 pb-2 border-b-2 font-medium ${
                      activeTab === 'materials'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Materials ({selectedLesson.materials.length})</span>
                  </button>
                )}
                
                {selectedLesson.quiz && (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex items-center space-x-2 pb-2 border-b-2 font-medium ${
                      activeTab === 'quiz'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Quiz className="h-4 w-4" />
                    <span>Quiz</span>
                  </button>
                )}
                
                {selectedLesson.assignment && (
                  <button
                    onClick={() => setActiveTab('assignment')}
                    className={`flex items-center space-x-2 pb-2 border-b-2 font-medium ${
                      activeTab === 'assignment'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Assignment</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'content' && (
                <div className="max-w-4xl">
                  {/* Video Player Placeholder */}
                  <div className="bg-gray-900 rounded-lg mb-6 aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Video content for this lesson</p>
                      <p className="text-sm opacity-75">Duration: {formatDuration(selectedLesson.duration)}</p>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Lesson Overview
                    </h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedLesson.description}
                      </p>
                      
                      {/* Sample content based on lesson */}
                      {selectedLesson.id === 'lesson-1-1' && (
                        <div className="mt-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-3">
                            What You'll Learn:
                          </h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Understanding B2B vs B2C e-commerce models</li>
                            <li>Identifying profitable market opportunities</li>
                            <li>Analyzing successful e-commerce businesses</li>
                            <li>Choosing the right business model for your goals</li>
                            <li>Market sizing and validation techniques</li>
                            <li>Revenue model optimization strategies</li>
                          </ul>
                        </div>
                      )}

                      {/* Key Takeaways */}
                      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Key Takeaways</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Master the fundamentals before moving to advanced topics</li>
                          <li>• Apply learnings immediately through practical exercises</li>
                          <li>• Use provided templates and resources for implementation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && selectedLesson.materials.length > 0 && (
                <div className="max-w-4xl">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Course Materials
                    </h3>
                    
                    <div className="grid gap-4">
                      {selectedLesson.materials.map((material) => {
                        const Icon = getMaterialIcon(material.type);
                        return (
                          <div key={material.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{material.title}</h4>
                              {material.description && (
                                <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span className="capitalize">{material.type}</span>
                                {material.fileSize && <span>{material.fileSize}</span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <a
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
                              >
                                {material.type === 'link' ? (
                                  <>
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Open</span>
                                  </>
                                ) : (
                                  <>
                                    <Download className="h-3 w-3" />
                                    <span>Download</span>
                                  </>
                                )}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">📚 Study Tips</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Download all materials before starting the lesson</li>
                        <li>• Take notes while reviewing PDFs and documents</li>
                        <li>• Use templates provided to practice concepts</li>
                        <li>• Bookmark important links for future reference</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && selectedLesson.quiz && (
                <QuizComponent
                  quiz={selectedLesson.quiz}
                  courseId={course.id}
                  onComplete={(score, passed) => {
                    // Quiz completion handled in QuizComponent
                  }}
                />
              )}

              {activeTab === 'assignment' && selectedLesson.assignment && (
                <AssignmentComponent
                  assignment={selectedLesson.assignment}
                  courseId={course.id}
                  onSubmit={(submission) => {
                    // Assignment submission handled in AssignmentComponent
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Select a lesson to start learning
              </h2>
              <p className="text-gray-600">
                Choose a lesson from the sidebar to begin your journey
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseViewer;