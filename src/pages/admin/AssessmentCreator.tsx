import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  Trash2, 
  Edit, 
  CheckCircle,
  Clock,
  FileText,
  HelpCircle
} from 'lucide-react';
import { Quiz, QuizQuestion, Assignment } from '../../types/course';
import toast from 'react-hot-toast';

const AssessmentCreator: React.FC = () => {
  const [assessments, setAssessments] = useState<(Quiz | Assignment)[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    questions: [],
    timeLimit: 30,
    passingScore: 70,
    maxAttempts: 3
  });
  const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizQuestion>>({
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    points: 10
  });
  const [currentAssignment, setCurrentAssignment] = useState<Partial<Assignment>>({
    title: '',
    description: '',
    instructions: '',
    maxScore: 100,
    submissionType: 'file'
  });
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  const handleCreateQuiz = () => {
    if (!currentQuiz.title || !currentQuiz.description) {
      toast.error('Please fill in quiz title and description');
      return;
    }

    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: currentQuiz.title,
      description: currentQuiz.description,
      questions: currentQuiz.questions || [],
      timeLimit: currentQuiz.timeLimit || 30,
      passingScore: currentQuiz.passingScore || 70,
      maxAttempts: currentQuiz.maxAttempts || 3,
      attempts: []
    };

    setAssessments([...assessments, newQuiz]);
    setCurrentQuiz({
      title: '',
      description: '',
      questions: [],
      timeLimit: 30,
      passingScore: 70,
      maxAttempts: 3
    });
    setShowQuizForm(false);
    toast.success('Quiz created successfully!');
  };

  const handleCreateAssignment = () => {
    if (!currentAssignment.title || !currentAssignment.description) {
      toast.error('Please fill in assignment title and description');
      return;
    }

    const newAssignment: Assignment = {
      id: `assignment-${Date.now()}`,
      title: currentAssignment.title,
      description: currentAssignment.description,
      instructions: currentAssignment.instructions || '',
      maxScore: currentAssignment.maxScore || 100,
      submissionType: currentAssignment.submissionType || 'file',
      submissions: []
    };

    setAssessments([...assessments, newAssignment]);
    setCurrentAssignment({
      title: '',
      description: '',
      instructions: '',
      maxScore: 100,
      submissionType: 'file'
    });
    setShowAssignmentForm(false);
    toast.success('Assignment created successfully!');
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.correctAnswer) {
      toast.error('Please fill in question and correct answer');
      return;
    }

    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      question: currentQuestion.question,
      type: currentQuestion.type || 'multiple-choice',
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      points: currentQuestion.points || 10
    };

    setCurrentQuiz({
      ...currentQuiz,
      questions: [...(currentQuiz.questions || []), newQuestion]
    });

    setCurrentQuestion({
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      points: 10
    });
    setShowQuestionForm(false);
    toast.success('Question added successfully!');
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    setAssessments(assessments.filter(assessment => assessment.id !== assessmentId));
    toast.success('Assessment deleted successfully!');
  };

  const handleSaveAllAssessments = () => {
    localStorage.setItem('course_assessments', JSON.stringify(assessments));
    toast.success('All assessments saved successfully!');
  };

  const isQuiz = (assessment: Quiz | Assignment): assessment is Quiz => {
    return 'questions' in assessment;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Creator</h1>
          <p className="text-gray-600">Create quizzes and assignments to test student knowledge</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowQuizForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Create Quiz</span>
          </button>
          <button
            onClick={() => setShowAssignmentForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Create Assignment</span>
          </button>
          <button
            onClick={handleSaveAllAssessments}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>

      {/* Quiz Creation Form */}
      {showQuizForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Quiz</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={currentQuiz.title || ''}
                    onChange={(e) => setCurrentQuiz({...currentQuiz, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter quiz title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={currentQuiz.timeLimit || ''}
                    onChange={(e) => setCurrentQuiz({...currentQuiz, timeLimit: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    value={currentQuiz.passingScore || ''}
                    onChange={(e) => setCurrentQuiz({...currentQuiz, passingScore: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Attempts
                  </label>
                  <input
                    type="number"
                    value={currentQuiz.maxAttempts || ''}
                    onChange={(e) => setCurrentQuiz({...currentQuiz, maxAttempts: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Description
                </label>
                <textarea
                  value={currentQuiz.description || ''}
                  onChange={(e) => setCurrentQuiz({...currentQuiz, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what this quiz covers"
                />
              </div>

              {/* Questions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Questions ({currentQuiz.questions?.length || 0})
                  </h3>
                  <button
                    onClick={() => setShowQuestionForm(true)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Question</span>
                  </button>
                </div>

                {currentQuiz.questions && currentQuiz.questions.length > 0 && (
                  <div className="space-y-3">
                    {currentQuiz.questions.map((question, index) => (
                      <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">
                              {index + 1}. {question.question}
                            </h4>
                            {question.options && (
                              <div className="space-y-1 text-sm text-gray-600">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className={`flex items-center space-x-2 ${
                                    option === question.correctAnswer ? 'text-green-600 font-medium' : ''
                                  }`}>
                                    <span>{String.fromCharCode(65 + optionIndex)}.</span>
                                    <span>{option}</span>
                                    {option === question.correctAnswer && <CheckCircle className="h-4 w-4" />}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {question.points} points
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Question Form */}
                {showQuestionForm && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-4">Add New Question</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question
                        </label>
                        <textarea
                          value={currentQuestion.question || ''}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your question"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Question Type
                          </label>
                          <select
                            value={currentQuestion.type || 'multiple-choice'}
                            onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value as any})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                            <option value="short-answer">Short Answer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Points
                          </label>
                          <input
                            type="number"
                            value={currentQuestion.points || ''}
                            onChange={(e) => setCurrentQuestion({...currentQuestion, points: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="10"
                          />
                        </div>
                      </div>

                      {currentQuestion.type === 'multiple-choice' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Answer Options
                          </label>
                          <div className="space-y-2">
                            {currentQuestion.options?.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600 w-6">
                                  {String.fromCharCode(65 + index)}.
                                </span>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...(currentQuestion.options || [])];
                                    newOptions[index] = e.target.value;
                                    setCurrentQuestion({...currentQuestion, options: newOptions});
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder={`Option ${index + 1}`}
                                />
                                <input
                                  type="radio"
                                  name="correctAnswer"
                                  checked={currentQuestion.correctAnswer === option}
                                  onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: option})}
                                  className="text-blue-600"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentQuestion.type === 'true-false' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correct Answer
                          </label>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="tfAnswer"
                                value="True"
                                checked={currentQuestion.correctAnswer === 'True'}
                                onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}
                                className="text-blue-600 mr-2"
                              />
                              True
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="tfAnswer"
                                value="False"
                                checked={currentQuestion.correctAnswer === 'False'}
                                onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}
                                className="text-blue-600 mr-2"
                              />
                              False
                            </label>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Explanation (Optional)
                        </label>
                        <textarea
                          value={currentQuestion.explanation || ''}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, explanation: e.target.value})}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Explain why this is the correct answer"
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setShowQuestionForm(false)}
                          className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddQuestion}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowQuizForm(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateQuiz}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Creation Form */}
      {showAssignmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Assignment</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Title
                </label>
                <input
                  type="text"
                  value={currentAssignment.title || ''}
                  onChange={(e) => setCurrentAssignment({...currentAssignment, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter assignment title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Description
                </label>
                <textarea
                  value={currentAssignment.description || ''}
                  onChange={(e) => setCurrentAssignment({...currentAssignment, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe the assignment objectives"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  value={currentAssignment.instructions || ''}
                  onChange={(e) => setCurrentAssignment({...currentAssignment, instructions: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Provide detailed instructions for completing the assignment"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Score
                  </label>
                  <input
                    type="number"
                    value={currentAssignment.maxScore || ''}
                    onChange={(e) => setCurrentAssignment({...currentAssignment, maxScore: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submission Type
                  </label>
                  <select
                    value={currentAssignment.submissionType || 'file'}
                    onChange={(e) => setCurrentAssignment({...currentAssignment, submissionType: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="file">File Upload</option>
                    <option value="text">Text Submission</option>
                    <option value="url">URL Submission</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAssignmentForm(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAssignment}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assessments List */}
      <div className="space-y-6">
        {assessments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Created</h3>
            <p className="text-gray-600 mb-6">Start by creating your first quiz or assignment</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowQuizForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Quiz
              </button>
              <button
                onClick={() => setShowAssignmentForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Create Assignment
              </button>
            </div>
          </div>
        ) : (
          assessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isQuiz(assessment) ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {isQuiz(assessment) ? (
                      <HelpCircle className={`h-6 w-6 ${isQuiz(assessment) ? 'text-blue-600' : 'text-green-600'}`} />
                    ) : (
                      <FileText className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{assessment.title}</h3>
                    <p className="text-gray-600 mb-4">{assessment.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Type:</span>
                        <span>{isQuiz(assessment) ? 'Quiz' : 'Assignment'}</span>
                      </div>
                      {isQuiz(assessment) && (
                        <>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{assessment.timeLimit} minutes</span>
                          </div>
                          <div>
                            <span>{assessment.questions.length} questions</span>
                          </div>
                          <div>
                            <span>{assessment.passingScore}% to pass</span>
                          </div>
                        </>
                      )}
                      {!isQuiz(assessment) && (
                        <div>
                          <span>Max Score: {assessment.maxScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingQuizId(assessment.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAssessment(assessment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {assessments.length > 0 && (
        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Assessment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-purple-800">Total Assessments:</span>
              <span className="ml-2 text-purple-700">{assessments.length}</span>
            </div>
            <div>
              <span className="font-medium text-purple-800">Quizzes:</span>
              <span className="ml-2 text-purple-700">
                {assessments.filter(a => isQuiz(a)).length}
              </span>
            </div>
            <div>
              <span className="font-medium text-purple-800">Assignments:</span>
              <span className="ml-2 text-purple-700">
                {assessments.filter(a => !isQuiz(a)).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentCreator;