import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Award, 
  TrendingUp,
  GraduationCap,
  DollarSign,
  Clock,
  Globe,
  Target,
  Briefcase
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: '25+ Professional Certifications',
      description: 'Earn industry-recognized certifications in every aspect of e-commerce and digital marketing'
    },
    {
      icon: GraduationCap,
      title: 'University Diploma',
      description: 'Receive an official university diploma upon program completion'
    },
    {
      icon: Briefcase,
      title: 'Job Guarantee Program',
      description: 'Get guaranteed job placement or full money-back guarantee'
    },
    {
      icon: DollarSign,
      title: '₹10,000/month Internship Stipend',
      description: 'Earn ₹10,000 monthly stipend starting from the 4th month'
    },
    {
      icon: TrendingUp,
      title: 'Startup Building Track',
      description: 'Build and scale your own e-commerce business from zero to ₹1 crore/month'
    },
    {
      icon: Target,
      title: '200+ Hours of Content',
      description: 'Comprehensive curriculum with videos, eBooks, assignments, and practical projects'
    }
  ];

  const certifications = [
    'Fundamentals of E-Commerce',
    'Shopify Store Setup & Optimization',
    'Amazon, Flipkart & Marketplace Selling',
    'E-Commerce Law, Taxation & Compliance',
    'Product Research, Pricing & Inventory',
    'SEO, SEM & Google Ads Mastery',
    'Meta Ads (Facebook + Instagram)',
    'WhatsApp Marketing & Chatbots',
    'Email Automation & Marketing',
    'Social Media Marketing Mastery',
    'Affiliate & Influencer Marketing',
    'Copywriting & Ad Script Writing',
    'UGC & Video Selling Strategies',
    'AI Tools for E-Commerce Automation',
    'Funnel Building & Landing Page Design',
    'Payment Gateway Integration',
    'Analytics: GA4, Meta Pixel & Heatmaps',
    'Retargeting & Cart Recovery',
    'Dropshipping vs Inventory Models',
    'Budget Planning & Ads Scaling',
    'Funding & Investor Pitching',
    'Branding & Visual Design',
    'Legal Documents & Compliance',
    'Resume & Interview Prep + Job Portal Access',
    'Final Startup Capstone Project'
  ];

  const bonusContent = [
    '100+ Tools list with use cases',
    'Festival marketing calendar with editable templates',
    'Startup tracker sheet (orders, revenue, team, ads)',
    '50+ ad copy templates for e-commerce products',
    'Email marketing templates (product launch, cart abandon, etc.)',
    'Canva templates for banners, reels, thumbnails',
    'Legal templates (founder agreement, GST letter, etc.)',
    'Ready-made SOPs for order, refund, customer support',
    'Influencer collaboration contract templates'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EduPro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              <span>1-Year Comprehensive Program</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Certified E-Commerce &<br />
              <span className="text-blue-600">Digital Marketing Professional</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Complete 1-year certification program with <strong>25+ certifications</strong>, 
              <strong> university diploma</strong>, <strong>job guarantee</strong>, 
              <strong> ₹10,000/month internship stipend</strong>, and startup-building track 
              to scale from zero to <strong>₹1 crore/month</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">25+ Certifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">University Diploma</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Job Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">₹10K/month Stipend</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">200+ Hours Content</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">₹1,18,000</div>
                <div className="text-sm text-gray-500 line-through mb-1">₹5,00,000 (Regular Price)</div>
                <div className="flex items-center justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">(2,547+ students enrolled)</span>
                </div>
              </div>
              
              <Link
                to="/signup"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mb-4"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <p className="text-sm text-gray-500 text-center">
                💰 Job guarantee or money-back • 🎓 University diploma included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Comprehensive Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most complete e-commerce and digital marketing education with guaranteed career success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              25+ Professional Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Earn industry-recognized certifications in every aspect of e-commerce and digital marketing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((certification, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{certification}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Massive Bonus Content Included
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get access to exclusive templates, tools, and resources worth ₹2,00,000+
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonusContent.map((bonus, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{bonus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Stipend Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Earn While You Learn
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get ₹10,000/month internship stipend starting from the 4th month of the program
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">₹10,000</div>
              <div className="opacity-90">Monthly Stipend</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">9 Months</div>
              <div className="opacity-90">Stipend Duration</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">₹90,000</div>
              <div className="opacity-90">Total Earnings</div>
            </div>
          </div>
          
          <p className="text-lg opacity-90">
            Plus job guarantee with minimum ₹3-5 LPA salary or full money-back guarantee
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful graduates earning 6-figure incomes and building million-dollar businesses
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Enroll Now - ₹1,18,000
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Already Enrolled? Login
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            <p>🔒 Secure payment • 💰 Job guarantee • 🎓 University diploma • 📞 24/7 support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">EduPro</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Globe className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">© 2024 EduPro. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;