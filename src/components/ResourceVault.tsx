import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Folder, 
  ExternalLink,
  Video,
  FileImage,
  Presentation,
  Calculator
} from 'lucide-react';
import { bonusContent } from '../data/comprehensiveCourseData';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'excel' | 'video' | 'template' | 'tool' | 'link';
  category: string;
  description: string;
  url: string;
  size?: string;
  downloads?: number;
}

const ResourceVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Sample resources - in a real app, this would come from an API
  const resources: Resource[] = [
    {
      id: 'r1',
      title: 'E-Commerce Business Plan Template',
      type: 'excel',
      category: 'Business Planning',
      description: 'Complete business plan template with financial projections',
      url: 'https://example.com/business-plan.xlsx',
      size: '2.5 MB',
      downloads: 1247
    },
    {
      id: 'r2',
      title: 'Facebook Ads Mastery Video Course',
      type: 'video',
      category: 'Marketing',
      description: '5-hour comprehensive video course on Facebook advertising',
      url: 'https://example.com/facebook-ads-course',
      downloads: 892
    },
    {
      id: 'r3',
      title: 'Canva Design Templates Pack',
      type: 'template',
      category: 'Design',
      description: '100+ professional Canva templates for social media',
      url: 'https://example.com/canva-templates.zip',
      size: '45 MB',
      downloads: 2156
    },
    {
      id: 'r4',
      title: 'SEO Audit Checklist',
      type: 'pdf',
      category: 'SEO',
      description: '200-point comprehensive SEO audit checklist',
      url: 'https://example.com/seo-checklist.pdf',
      size: '1.2 MB',
      downloads: 1834
    },
    {
      id: 'r5',
      title: 'ROI Calculator for Ads',
      type: 'excel',
      category: 'Analytics',
      description: 'Advanced calculator for measuring advertising ROI',
      url: 'https://example.com/roi-calculator.xlsx',
      size: '800 KB',
      downloads: 967
    },
    {
      id: 'r6',
      title: 'Email Marketing Templates',
      type: 'template',
      category: 'Email Marketing',
      description: '50+ email templates for different campaigns',
      url: 'https://example.com/email-templates.zip',
      size: '12 MB',
      downloads: 1456
    }
  ];

  const categories = [
    'all',
    'Business Planning',
    'Marketing',
    'Design',
    'SEO',
    'Analytics',
    'Email Marketing',
    'Legal',
    'Tools'
  ];

  const types = [
    'all',
    'pdf',
    'excel',
    'video',
    'template',
    'tool',
    'link'
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'excel':
        return Calculator;
      case 'video':
        return Video;
      case 'template':
        return FileImage;
      case 'tool':
        return ExternalLink;
      case 'link':
        return ExternalLink;
      default:
        return FileText;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-100';
      case 'excel':
        return 'text-green-600 bg-green-100';
      case 'video':
        return 'text-purple-600 bg-purple-100';
      case 'template':
        return 'text-blue-600 bg-blue-100';
      case 'tool':
        return 'text-orange-600 bg-orange-100';
      case 'link':
        return 'text-indigo-600 bg-indigo-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Folder className="h-6 w-6 text-blue-500 mr-2" />
          Resource Vault
        </h3>
        <div className="text-sm text-gray-500">
          {filteredResources.length} resources available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Tools Overview */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-3">100+ Tools Included</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {bonusContent.tools.slice(0, 4).map((category, index) => (
            <div key={index}>
              <div className="font-medium text-blue-800">{category.category}</div>
              <div className="text-blue-600">{category.tools.length} tools</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => {
          const Icon = getResourceIcon(resource.type);
          const colorClasses = getResourceColor(resource.type);
          
          return (
            <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 truncate">{resource.title}</h5>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="capitalize">{resource.type}</span>
                      {resource.size && <span>{resource.size}</span>}
                      {resource.downloads && <span>{resource.downloads} downloads</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </a>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {resource.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No resources found</h4>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Bonus Content Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Bonus Content Included</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Templates & SOPs</h5>
            <ul className="space-y-1 text-gray-600">
              {bonusContent.templates.marketing.slice(0, 3).map((template, index) => (
                <li key={index}>• {template}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Business Tools</h5>
            <ul className="space-y-1 text-gray-600">
              {bonusContent.templates.business.slice(0, 3).map((template, index) => (
                <li key={index}>• {template}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceVault;