import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Target, Upload, ExternalLink } from 'lucide-react';
import { useComprehensiveCourse } from '../context/ComprehensiveCourseContext';

interface StartupMilestone {
  id: string;
  title: string;
  description: string;
  target: string;
  completed: boolean;
  completedDate?: Date;
  proof?: string;
}

const StartupTracker: React.FC = () => {
  const { studentProgress } = useComprehensiveCourse();
  const [milestones, setMilestones] = useState<StartupMilestone[]>([
    {
      id: 'store-setup',
      title: 'Store Setup',
      description: 'Launch your e-commerce store',
      target: 'Live store URL',
      completed: false
    },
    {
      id: 'first-sale',
      title: 'First Sale',
      description: 'Achieve your first customer sale',
      target: '₹1+ revenue',
      completed: false
    },
    {
      id: 'monthly-1k',
      title: '₹1,000/month',
      description: 'Reach ₹1,000 monthly revenue',
      target: '₹1,000 monthly',
      completed: false
    },
    {
      id: 'monthly-10k',
      title: '₹10,000/month',
      description: 'Scale to ₹10,000 monthly revenue',
      target: '₹10,000 monthly',
      completed: false
    },
    {
      id: 'monthly-50k',
      title: '₹50,000/month',
      description: 'Achieve ₹50,000 monthly revenue',
      target: '₹50,000 monthly',
      completed: false
    },
    {
      id: 'monthly-1l',
      title: '₹1,00,000/month',
      description: 'Reach ₹1 lakh monthly revenue',
      target: '₹1,00,000 monthly',
      completed: false
    },
    {
      id: 'team-hire',
      title: 'Team Building',
      description: 'Hire your first team member',
      target: '1+ employee',
      completed: false
    },
    {
      id: 'monthly-10l',
      title: '₹10,00,000/month',
      description: 'Scale to ₹10 lakh monthly revenue',
      target: '₹10,00,000 monthly',
      completed: false
    },
    {
      id: 'monthly-1cr',
      title: '₹1 Crore/month',
      description: 'Achieve ₹1 crore monthly revenue',
      target: '₹1,00,00,000 monthly',
      completed: false
    }
  ]);

  const [uploadingProof, setUploadingProof] = useState<string | null>(null);

  const handleMilestoneComplete = (milestoneId: string, proofUrl: string) => {
    setMilestones(prev => prev.map(milestone => 
      milestone.id === milestoneId 
        ? { ...milestone, completed: true, completedDate: new Date(), proof: proofUrl }
        : milestone
    ));
    setUploadingProof(null);
  };

  const completedMilestones = milestones.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedMilestones / milestones.length) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
          Startup Milestone Tracker
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{completedMilestones}/{milestones.length}</div>
          <div className="text-sm text-gray-500">Milestones Achieved</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Startup Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Revenue Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Current Revenue</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">₹0</div>
          <div className="text-sm text-blue-600">Monthly</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Team Size</span>
          </div>
          <div className="text-2xl font-bold text-green-700">1</div>
          <div className="text-sm text-green-600">Members</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">Next Target</span>
          </div>
          <div className="text-lg font-bold text-purple-700">Store Setup</div>
          <div className="text-sm text-purple-600">First milestone</div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Startup Milestones</h4>
        
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className={`border rounded-lg p-4 ${
            milestone.completed 
              ? 'border-green-200 bg-green-50' 
              : index === completedMilestones 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed 
                    ? 'bg-green-500 text-white' 
                    : index === completedMilestones 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {milestone.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                  <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                  <div className="text-xs text-gray-500">Target: {milestone.target}</div>
                  
                  {milestone.completed && milestone.completedDate && (
                    <div className="text-xs text-green-600 mt-1">
                      Completed: {milestone.completedDate.toLocaleDateString()}
                    </div>
                  )}
                  
                  {milestone.proof && (
                    <a 
                      href={milestone.proof} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View Proof</span>
                    </a>
                  )}
                </div>
              </div>
              
              {!milestone.completed && index === completedMilestones && (
                <div className="flex items-center space-x-2">
                  {uploadingProof === milestone.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="url"
                        placeholder="Enter proof URL"
                        className="text-sm border border-gray-300 rounded px-2 py-1 w-40"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const url = (e.target as HTMLInputElement).value;
                            if (url) {
                              handleMilestoneComplete(milestone.id, url);
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => setUploadingProof(null)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setUploadingProof(milestone.id)}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-3 w-3" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Success Message */}
      {progressPercentage === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white">
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-2">🎉 Congratulations!</h4>
            <p className="text-sm opacity-90">
              You've achieved all startup milestones and built a ₹1 crore/month business!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupTracker;