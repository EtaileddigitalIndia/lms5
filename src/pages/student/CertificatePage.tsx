import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { Download, ArrowLeft, Share2, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

const CertificatePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const { courses, getCourseProgress } = useCourse();
  const { user } = useAuth();

  const course = courses.find(c => c.id === courseId);
  const progress = getCourseProgress(courseId!);

  if (!course || !progress?.certificateIssued) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificate not available</h2>
          <p className="text-gray-600 mb-6">
            You need to complete the course to earn your certificate.
          </p>
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

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      toast.loading('Generating certificate...', { id: 'certificate' });

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 1200,
        height: 800
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1200, 800]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 800);
      pdf.save(`${course.title} - Certificate - ${user?.name}.pdf`);

      toast.success('Certificate downloaded successfully!', { id: 'certificate' });
    } catch (error) {
      toast.error('Failed to generate certificate', { id: 'certificate' });
    }
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${course.title} - Certificate`,
          text: `I've completed the ${course.title} course and earned my professional certificate!`,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Certificate link copied to clipboard!');
    }
  };

  const certificateDate = progress.certificateDate || new Date();
  const verificationCode = `CERT-${course.id.toUpperCase()}-${user?.id.toUpperCase()}-${certificateDate.getFullYear()}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/student')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={shareCertificate}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              onClick={downloadCertificate}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="flex justify-center">
          <div
            ref={certificateRef}
            className="bg-white shadow-2xl"
            style={{ width: '1200px', height: '800px' }}
          >
            {/* Certificate Content */}
            <div className="relative w-full h-full p-16 flex flex-col justify-between">
              {/* Decorative Border */}
              <div className="absolute inset-4 border-4 border-blue-600 rounded-lg">
                <div className="absolute inset-2 border-2 border-blue-300 rounded-lg"></div>
              </div>

              {/* Header */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <Award className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                  <h1 className="text-6xl font-bold text-gray-900 mb-2">
                    Certificate of Completion
                  </h1>
                  <div className="w-32 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <p className="text-2xl text-gray-600 mb-8">
                  This is to certify that
                </p>

                <h2 className="text-5xl font-bold text-blue-600 mb-8 border-b-2 border-blue-200 pb-4">
                  {user?.name}
                </h2>

                <p className="text-2xl text-gray-600 mb-4">
                  has successfully completed the course
                </p>

                <h3 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
                  {course.title}
                </h3>
              </div>

              {/* Footer */}
              <div className="relative z-10">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <div className="mb-2">
                      <div className="w-48 h-0.5 bg-gray-400 mb-2"></div>
                      <p className="text-lg font-semibold text-gray-700">Instructor</p>
                      <p className="text-gray-600">{course.instructor}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mb-4">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Award className="h-12 w-12 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">EduPro</p>
                      <p className="text-xs text-gray-500">Learning Management System</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      Date of Completion
                    </p>
                    <p className="text-gray-600 text-lg">
                      {certificateDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Certificate ID: {verificationCode}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    This certificate can be verified at edupro.com/verify
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 w-16 h-16 border-4 border-blue-300 rounded-full opacity-20"></div>
              <div className="absolute top-8 right-8 w-16 h-16 border-4 border-blue-300 rounded-full opacity-20"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-blue-200 rounded-full opacity-30"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-blue-200 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Student:</span>
              <span className="ml-2 text-gray-900">{user?.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Course:</span>
              <span className="ml-2 text-gray-900">{course.title}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Completion Date:</span>
              <span className="ml-2 text-gray-900">
                {certificateDate.toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Certificate ID:</span>
              <span className="ml-2 text-gray-900 font-mono">{verificationCode}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Progress:</span>
              <span className="ml-2 text-gray-900">{progress?.overallProgress}%</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Modules Completed:</span>
              <span className="ml-2 text-gray-900">
                {progress?.completedModules.length}/{course.modules.length}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Congratulations!</strong> You have successfully completed the {course.title} course. 
              This certificate serves as proof of your achievement and can be shared with employers or on professional networks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;