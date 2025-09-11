import React, { useState } from 'react';
import { Assignment, AssignmentSubmission } from '../types/course';
import { useCourse } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { FileText, Upload, Calendar, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface AssignmentComponentProps {
  assignment: Assignment;
  courseId: string;
  onSubmit: (submission: Omit<AssignmentSubmission, 'id'>) => void;
}

const AssignmentComponent: React.FC<AssignmentComponentProps> = ({
  assignment,
  courseId,
  onSubmit
}) => {
  const [submissionContent, setSubmissionContent] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { submitAssignment } = useCourse();
  const { user } = useAuth();

  const userSubmission = assignment.submissions.find(s => s.studentId === user?.id);
  const hasSubmitted = !!userSubmission;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (assignment.submissionType === 'text' && !submissionContent.trim()) {
      toast.error('Please enter your submission content');
      return;
    }

    if ((assignment.submissionType === 'file' || assignment.submissionType === 'url') && !fileUrl.trim()) {
      toast.error(`Please provide a ${assignment.submissionType === 'file' ? 'file' : 'URL'}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: Omit<AssignmentSubmission, 'id'> = {
        studentId: user.id,
        studentName: user.name,
        submissionDate: new Date(),
        content: submissionContent,
        fileUrl: fileUrl || undefined,
        status: 'submitted'
      };

      submitAssignment(courseId, assignment.id, submission);
      onSubmit(submission);
      
      // Reset form
      setSubmissionContent('');
      setFileUrl('');
      
    } catch (error) {
      toast.error('Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Assignment Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {assignment.title}
              </h2>
              <p className="text-gray-600 mb-4">{assignment.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {assignment.dueDate 
                      ? `Due: ${assignment.dueDate.toLocaleDateString()}`
                      : 'No due date'
                    }
                  </span>
                </div>
                <div>Max Score: {assignment.maxScore} points</div>
                <div className="capitalize">
                  Type: {assignment.submissionType.replace('-', ' ')}
                </div>
              </div>
            </div>
          </div>

          {hasSubmitted && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Submitted</span>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Instructions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {assignment.instructions}
          </p>
        </div>
      </div>

      {/* Existing Submission */}
      {userSubmission && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Submission</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Submitted: {userSubmission.submissionDate.toLocaleDateString()}
              </span>
              {userSubmission.status === 'graded' && userSubmission.score && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  Score: {userSubmission.score}/{assignment.maxScore}
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            {userSubmission.content && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Submission Content:</h4>
                <p className="text-gray-700 whitespace-pre-line">{userSubmission.content}</p>
              </div>
            )}

            {userSubmission.fileUrl && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Submitted File/URL:</h4>
                <a
                  href={userSubmission.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {userSubmission.fileUrl}
                </a>
              </div>
            )}

            {userSubmission.feedback && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Instructor Feedback:</h4>
                <p className="text-gray-700">{userSubmission.feedback}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submission Form */}
      {!hasSubmitted && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Assignment</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {assignment.submissionType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer
                </label>
                <textarea
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your submission here..."
                  required
                />
              </div>
            )}

            {assignment.submissionType === 'file' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Or paste file URL here..."
                    required
                  />
                </div>
              </div>
            )}

            {assignment.submissionType === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Submission
                </label>
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/your-project"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Provide the URL to your project, document, or submission
                </p>
              </div>
            )}

            {/* Optional text content for file/URL submissions */}
            {assignment.submissionType !== 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any additional notes or explanations..."
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Make sure to review your submission before submitting
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Submit Assignment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssignmentComponent;