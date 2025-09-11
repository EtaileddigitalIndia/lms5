import React, { useState } from 'react';
import { 
  Plus, 
  Video, 
  FileText, 
  Presentation, 
  Upload,
  Save,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'video' | 'ebook' | 'presentation' | 'assignment' | 'quiz';
  title: string;
  description: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ContentCreator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('video');
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'video',
      title: 'Introduction to E-Commerce',
      description: '45-minute comprehensive overview of e-commerce fundamentals',
      status: 'published',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      type: 'ebook',
      title: 'E-Commerce Business Models Guide',
      description: '5000-word comprehensive guide covering all business models',
      status: 'draft',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-22')
    }
  ]);

  const contentTypes = [
    { id: 'video', label: 'Video Content', icon: Video, color: 'bg-red-500' },
    { id: 'ebook', label: 'eBook', icon: FileText, color: 'bg-blue-500' },
    { id: 'presentation', label: 'Presentation', icon: Presentation, color: 'bg-purple-500' },
    { id: 'assignment', label: 'Assignment', icon: FileText, color: 'bg-green-500' },
    { id: 'quiz', label: 'Quiz', icon: FileText, color: 'bg-orange-500' }
  ];

  const handleCreateContent = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: selectedType as any,
      title: `New ${selectedType}`,
      description: `Description for new ${selectedType}`,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setContentItems([...contentItems, newItem]);
  };

  const renderContentForm = () => {
    switch (selectedType) {
      case 'video':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Description
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the video content and learning objectives"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Script
              </label>
              <textarea
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write the complete video script here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Upload
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop your video file here, or click to browse
                </p>
                <input type="file" accept="video/*" className="hidden" />
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Choose File
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Module 1: Fundamentals</option>
                  <option>Module 2: Shopify Setup</option>
                  <option>Module 3: Marketplace Selling</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'ebook':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                eBook Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter eBook title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                eBook Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the eBook content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (Markdown supported)
              </label>
              <textarea
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="# Chapter 1: Introduction

Write your eBook content here using Markdown formatting...

## Key Topics
- Topic 1
- Topic 2
- Topic 3

### Learning Objectives
By the end of this chapter, you will be able to:
1. Understand the basics
2. Apply the concepts
3. Analyze the results"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Word Count Target
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reading Time (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="25"
                />
              </div>
            </div>
          </div>
        );

      case 'presentation':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Presentation Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter presentation title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Presentation Outline
              </label>
              <textarea
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Slide 1: Title Slide
Slide 2: Agenda
Slide 3: Introduction
Slide 4: Key Concepts
...
Slide 25: Conclusion"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload PowerPoint File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Presentation className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Upload your PowerPoint presentation
                </p>
                <input type="file" accept=".ppt,.pptx" className="hidden" />
                <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Choose File
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Slides
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presentation Duration
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a content type to start creating</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Creator</h1>
        <p className="text-gray-600">Create and manage course content including videos, eBooks, and presentations</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Content Type Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Types</h3>
            
            <div className="space-y-2">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      selectedType === type.id
                        ? 'bg-blue-50 border border-blue-200 text-blue-700'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleCreateContent}
              className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Content</span>
            </button>
          </div>

          {/* Recent Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Content</h3>
            
            <div className="space-y-3">
              {contentItems.slice(0, 5).map((item) => {
                const typeConfig = contentTypes.find(t => t.id === item.type);
                const Icon = typeConfig?.icon || FileText;
                
                return (
                  <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${typeConfig?.color || 'bg-gray-500'}`}>
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Creator Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Create {contentTypes.find(t => t.id === selectedType)?.label}
              </h3>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {renderContentForm()}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Save as Draft
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Publish Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;