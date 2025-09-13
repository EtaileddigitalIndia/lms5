import React, { useRef } from 'react';
import { Award, Download, Share2, Calendar, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CourseModule } from '../types/course';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

interface ModuleCertificateGeneratorProps {
  module: CourseModule;
  courseName: string;
  onClose: () => void;
}

const ModuleCertificateGenerator: React.FC<ModuleCertificateGeneratorProps> = ({
  module,
  courseName,
  onClose
}) => {
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      toast.loading('Generating certificate...', { id: 'certificate' });

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 1000,
        height: 700
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1000, 700]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 1000, 700);
      pdf.save(`${module.title} - Certificate - ${user?.name}.pdf`);

      toast.success('Certificate downloaded successfully!', { id: 'certificate' });
    } catch (error) {
      toast.error('Failed to generate certificate', { id: 'certificate' });
    }
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${module.title} - Certificate`,
          text: `I've completed the ${module.title} module and earned my professional certificate!`,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Certificate link copied to clipboard!');
    }
  };

  const completionDate = new Date();
  const verificationCode = `CERT-${module.id.toUpperCase()}-${user?.id.toUpperCase()}-${completionDate.getFullYear()}`;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} hours ${mins} minutes`;
    }
    return `${mins} minutes`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Module Completion Certificate</h2>
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
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="p-6 flex justify-center">
          <div
            ref={certificateRef}
            className="bg-white shadow-2xl border-4 border-blue-600"
            style={{ width: '1000px', height: '700px' }}
          >
            <div className="relative w-full h-full p-16 flex flex-col justify-between">
              {/* Decorative Border */}
              <div className="absolute inset-4 border-2 border-blue-300 rounded-lg"></div>

              {/* Header */}
              <div className="relative z-10 text-center">
                <Award className="h-20 w-20 text-blue-600 mx-auto mb-6" />
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  Certificate of Completion
                </h1>
                <div className="w-32 h-1 bg-blue-600 mx-auto mb-8"></div>

                <p className="text-xl text-gray-600 mb-8">
                  This is to certify that
                </p>

                <h2 className="text-4xl font-bold text-blue-600 mb-8 border-b-2 border-blue-200 pb-4">
                  {user?.name}
                </h2>

                <p className="text-xl text-gray-600 mb-6">
                  has successfully completed the module
                </p>

                <h3 className="text-3xl font-semibold text-gray-900 mb-6 leading-tight">
                  {module.title}
                </h3>

                <p className="text-lg text-gray-600 mb-8">
                  as part of the {courseName} program
                </p>

                {/* Module Stats */}
                <div className="flex justify-center space-x-8 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{module.videos.length}</div>
                    <div className="text-sm text-gray-600">Videos Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatDuration(module.duration)}</div>
                    <div className="text-sm text-gray-600">Study Time</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-between items-end">
                <div className="text-left">
                  <div className="w-40 h-0.5 bg-gray-400 mb-2"></div>
                  <p className="text-sm font-semibold text-gray-700">Instructor</p>
                  <p className="text-sm text-gray-600">Digital Marketing Institute</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-10 w-10 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">EduPro</p>
                  <p className="text-xs text-gray-600">Learning Management System</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Date of Completion
                  </p>
                  <p className="text-sm text-gray-600">
                    {completionDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Verification */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xs text-gray-500">
                  Certificate ID: {verificationCode}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Verify at edupro.com/verify
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Student:</span>
                <span className="ml-2 text-gray-900">{user?.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Module:</span>
                <span className="ml-2 text-gray-900">{module.title}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Course:</span>
                <span className="ml-2 text-gray-900">{courseName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Completion Date:</span>
                <span className="ml-2 text-gray-900">
                  {completionDate.toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Videos Completed:</span>
                <span className="ml-2 text-gray-900">{module.videos.length}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Study Duration:</span>
                <span className="ml-2 text-gray-900">{formatDuration(module.duration)}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-medium">
                  Congratulations! You have successfully completed this module and earned your certification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCertificateGenerator;