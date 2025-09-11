import React, { useRef } from 'react';
import { Award, Download, Share2, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

interface ModuleCertificateProps {
  moduleTitle: string;
  moduleId: string;
  completionDate: Date;
  skills: string[];
  onClose: () => void;
}

const ModuleCertificate: React.FC<ModuleCertificateProps> = ({
  moduleTitle,
  moduleId,
  completionDate,
  skills,
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
        width: 800,
        height: 600
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 600]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 800, 600);
      pdf.save(`${moduleTitle} - Certificate - ${user?.name}.pdf`);

      toast.success('Certificate downloaded successfully!', { id: 'certificate' });
    } catch (error) {
      toast.error('Failed to generate certificate', { id: 'certificate' });
    }
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${moduleTitle} - Certificate`,
          text: `I've completed the ${moduleTitle} module and earned my professional certificate!`,
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

  const verificationCode = `CERT-${moduleId.toUpperCase()}-${user?.id.toUpperCase()}-${completionDate.getFullYear()}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Module Certificate</h2>
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
              ✕
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="p-6 flex justify-center">
          <div
            ref={certificateRef}
            className="bg-white shadow-2xl border-4 border-blue-600"
            style={{ width: '800px', height: '600px' }}
          >
            <div className="relative w-full h-full p-12 flex flex-col justify-between">
              {/* Decorative Border */}
              <div className="absolute inset-3 border-2 border-blue-300 rounded-lg"></div>

              {/* Header */}
              <div className="relative z-10 text-center">
                <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Certificate of Completion
                </h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>

                <p className="text-lg text-gray-600 mb-6">
                  This is to certify that
                </p>

                <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
                  {user?.name}
                </h2>

                <p className="text-lg text-gray-600 mb-4">
                  has successfully completed the module
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {moduleTitle}
                </h3>

                {/* Skills */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Skills Mastered:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-between items-end">
                <div className="text-left">
                  <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                  <p className="text-sm font-semibold text-gray-700">Instructor</p>
                  <p className="text-sm text-gray-600">Digital Marketing Institute</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">EduPro</p>
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
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xs text-gray-500">
                  Certificate ID: {verificationCode}
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
                <span className="ml-2 text-gray-900">{moduleTitle}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Completion Date:</span>
                <span className="ml-2 text-gray-900">
                  {completionDate.toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Certificate ID:</span>
                <span className="ml-2 text-gray-900 font-mono">{verificationCode}</span>
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

export default ModuleCertificate;