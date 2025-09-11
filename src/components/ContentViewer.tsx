import React, { useState } from 'react';
import { 
  FileText, 
  Video, 
  Presentation, 
  Download, 
  ExternalLink,
  Play,
  BookOpen,
  FileImage
} from 'lucide-react';
import { CourseMaterial } from '../types/course';

interface ContentViewerProps {
  materials: CourseMaterial[];
  lessonTitle: string;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ materials, lessonTitle }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<CourseMaterial | null>(
    materials.find(m => m.type === 'video') || materials[0] || null
  );

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

  const getMaterialColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-red-600 bg-red-100';
      case 'pdf':
      case 'document':
        return 'text-blue-600 bg-blue-100';
      case 'image':
        return 'text-green-600 bg-green-100';
      case 'presentation':
        return 'text-purple-600 bg-purple-100';
      case 'link':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const renderMaterialContent = (material: CourseMaterial) => {
    switch (material.type) {
      case 'video':
        return (
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-75" />
              <p className="text-lg font-medium">{material.title}</p>
              <p className="text-sm opacity-75 mt-2">{material.description}</p>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto">
                <Play className="h-4 w-4" />
                <span>Play Video</span>
              </button>
            </div>
          </div>
        );
      
      case 'pdf':
      case 'document':
        return (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{material.title}</h3>
            <p className="text-gray-600 mb-4">{material.description}</p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download {material.type.toUpperCase()}</span>
              </a>
              <span className="text-sm text-gray-500">{material.fileSize}</span>
            </div>
          </div>
        );
      
      case 'presentation':
        return (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Presentation className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{material.title}</h3>
            <p className="text-gray-600 mb-4">{material.description}</p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download PPT</span>
              </a>
              <span className="text-sm text-gray-500">{material.fileSize}</span>
            </div>
          </div>
        );
      
      case 'link':
        return (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ExternalLink className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{material.title}</h3>
            <p className="text-gray-600 mb-4">{material.description}</p>
            <a
              href={material.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors inline-flex items-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Open Link</span>
            </a>
          </div>
        );
      
      default:
        return (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Content type not supported for preview</p>
          </div>
        );
    }
  };

  if (!materials.length) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Materials Available</h3>
        <p className="text-gray-600">Materials for this lesson will be available soon.</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Material List */}
      <div className="lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Materials</h3>
        <div className="space-y-2">
          {materials.map((material) => {
            const Icon = getMaterialIcon(material.type);
            const colorClasses = getMaterialColor(material.type);
            const isSelected = selectedMaterial?.id === material.id;
            
            return (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {material.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {material.type}
                      {material.fileSize && ` • ${material.fileSize}`}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Study Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">📚 Study Tips</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Watch videos first for overview</li>
            <li>• Download PDFs for detailed study</li>
            <li>• Use presentations for quick review</li>
            <li>• Take notes while learning</li>
          </ul>
        </div>
      </div>

      {/* Content Viewer */}
      <div className="lg:col-span-3">
        {selectedMaterial ? (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedMaterial.title}
              </h2>
              {selectedMaterial.description && (
                <p className="text-gray-600">{selectedMaterial.description}</p>
              )}
            </div>
            
            {renderMaterialContent(selectedMaterial)}

            {/* Material Details */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Material Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-900 capitalize">{selectedMaterial.type}</span>
                </div>
                {selectedMaterial.fileSize && (
                  <div>
                    <span className="font-medium text-gray-700">Size:</span>
                    <span className="ml-2 text-gray-900">{selectedMaterial.fileSize}</span>
                  </div>
                )}
                <div className="col-span-2">
                  <span className="font-medium text-gray-700">URL:</span>
                  <a
                    href={selectedMaterial.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    {selectedMaterial.url}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Material</h3>
            <p className="text-gray-600">Choose a material from the list to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;