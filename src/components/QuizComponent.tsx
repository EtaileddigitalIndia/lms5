import React, { useState, useEffect } from 'react';
import { Quiz, QuizAttempt } from '../types/course';
import { useCourse } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuizComponentProps {
  quiz: Quiz;
  courseId: string;
  onComplete: (score: number, passed: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, courseId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<{ score: number; passed: boolean } | null>(null);

  const { submitQuizAttempt } = useCourse();
  const { user } = useAuth();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const userAttempts = quiz.attempts.filter(a => a.studentId === user?.id).length;
  const canRetake = userAttempts < quiz.maxAttempts;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = () => {
    if (!user) return;

    const startTime = new Date(Date.now() - (quiz.timeLimit ? (quiz.timeLimit * 60 - (timeLeft || 0)) * 1000 : 0));
    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer) && 
            userAnswer.length === question.correctAnswer.length &&
            userAnswer.every(ans => question.correctAnswer.includes(ans))) {
          correctAnswers++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const attempt: Omit<QuizAttempt, 'id'> = {
      studentId: user.id,
      studentName: user.name,
      startTime,
      endTime,
      answers,
      score,
      passed,
      timeSpent
    };

    submitQuizAttempt(courseId, quiz.id, attempt);
    setResults({ score, passed });
    setQuizCompleted(true);
    onComplete(score, passed);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(quiz.timeLimit ? quiz.timeLimit * 60 : null);
    setQuizStarted(false);
    setQuizCompleted(false);
    setResults(null);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-6">{quiz.description}</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Questions:</span>
                  <span className="ml-2 text-gray-900">{quiz.questions.length}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time Limit:</span>
                  <span className="ml-2 text-gray-900">
                    {quiz.timeLimit ? `${quiz.timeLimit} minutes` : 'No limit'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Passing Score:</span>
                  <span className="ml-2 text-gray-900">{quiz.passingScore}%</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Attempts:</span>
                  <span className="ml-2 text-gray-900">
                    {userAttempts}/{quiz.maxAttempts}
                  </span>
                </div>
              </div>
            </div>

            {canRetake ? (
              <button
                onClick={startQuiz}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Quiz
              </button>
            ) : (
              <div className="text-center">
                <p className="text-red-600 mb-4">
                  You have used all {quiz.maxAttempts} attempts for this quiz.
                </p>
                <div className="text-sm text-gray-600">
                  Best Score: {Math.max(...quiz.attempts
                    .filter(a => a.studentId === user?.id)
                    .map(a => a.score))}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted && results) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              results.passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {results.passed ? (
                <Trophy className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {results.passed ? 'Congratulations!' : 'Quiz Not Passed'}
            </h2>
            
            <div className="text-4xl font-bold mb-2">
              <span className={results.passed ? 'text-green-600' : 'text-red-600'}>
                {results.score}%
              </span>
            </div>
            
            <p className="text-gray-600 mb-6">
              {results.passed 
                ? `You passed the quiz! Minimum required: ${quiz.passingScore}%`
                : `You need ${quiz.passingScore}% to pass. You can retry if attempts are available.`
              }
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Correct Answers:</span>
                  <span className="ml-2 text-gray-900">
                    {Math.round(results.score / 100 * quiz.questions.length)}/{quiz.questions.length}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Attempts Used:</span>
                  <span className="ml-2 text-gray-900">
                    {userAttempts + 1}/{quiz.maxAttempts}
                  </span>
                </div>
              </div>
            </div>

            {!results.passed && canRetake && (
              <button
                onClick={resetQuiz}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>
          
          {timeLeft !== null && (
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options?.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={currentQuestion.id}
                value={option}
                checked={answers[currentQuestion.id] === option}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}

          {currentQuestion.type === 'short-answer' && (
            <textarea
              value={answers[currentQuestion.id] as string || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Type your answer here..."
            />
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="space-y-3">
              {['True', 'False'].map((option) => (
                <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;