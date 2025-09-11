import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { defaultCourse } from '../data/courseData';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Star,
  Clock,
  Users,
  Award,
  Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const { user } = useAuth();
  const { enrollInCourse } = useCourse();
  const navigate = useNavigate();

  const course = defaultCourse;

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to enroll in the course');
      navigate('/login');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (paymentMethod === 'razorpay') {
        // In a real implementation, you would integrate with Razorpay
        // For demo purposes, we'll simulate a successful payment
        toast.success('Payment successful via Razorpay!');
      } else {
        // In a real implementation, you would integrate with Stripe
        toast.success('Payment successful via Stripe!');
      }

      // Enroll user in the course
      enrollInCourse(course.id);
      
      // Navigate to student dashboard
      navigate('/student');
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    {
      icon: Clock,
      title: '20+ Hours of Content',
      description: 'Comprehensive video lessons and practical exercises'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience'
    },
    {
      icon: Award,
      title: 'Professional Certificate',
      description: 'Earn a certificate upon successful course completion'
    },
    {
      icon: Shield,
      title: 'Job Guarantee',
      description: 'Money-back guarantee if you don\'t get a job within 6 months'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Enrollment</h1>
          <p className="text-gray-600 mt-2">
            Secure your spot in the most comprehensive e-commerce course
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    paymentMethod === 'razorpay'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Razorpay</div>
                    <div className="text-sm text-gray-500">UPI, Cards, Net Banking</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    paymentMethod === 'stripe'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Stripe</div>
                    <div className="text-sm text-gray-500">International Cards</div>
                  </div>
                </button>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </a>
                    . I understand that this purchase includes a job guarantee program.
                  </span>
                </label>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || !agreedToTerms}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Secure Payment - ₹1,18,000</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <Shield className="h-4 w-4 inline mr-1" />
                Your payment is secured with 256-bit SSL encryption
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Why Choose Our Course?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{feature.title}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight">
                    {course.title}
                  </h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(2,547)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-medium">₹1,18,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₹0</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">₹1,18,000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Lifetime access to course content</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Professional certification included</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Job guarantee program</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Special Offer:</strong> Enroll now and get access to exclusive bonus materials worth ₹25,000 absolutely free!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;