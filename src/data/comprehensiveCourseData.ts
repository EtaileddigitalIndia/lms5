import { Course, Module, Lesson } from '../types/course';

// Empty course structure - ready for content creation
export const comprehensiveCourse: Course = {
  id: 'comprehensive-ecommerce-program',
  title: 'Certified E-Commerce & Digital Marketing Professional Program',
  description: 'Complete 1-year certification program with 25+ certifications, university diploma, job guarantee, ₹10,000/month internship stipend, and startup-building track to scale from zero to ₹1 crore/month.',
  instructor: 'Digital Marketing Institute',
  instructorId: 'instructor-1',
  thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  price: 118000,
  currency: 'INR',
  modules: [], // Empty - modules will be created dynamically
  students: [],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  totalDuration: 0, // Will be calculated based on modules
  level: 'intermediate',
  category: 'Digital Marketing',
  tags: ['e-commerce', 'digital marketing', 'business', 'certification', 'startup'],
  jobGuarantee: true,
  certificateTemplate: 'professional'
};

// Bonus content structure (empty templates ready for content)
export const bonusContent = {
  tools: [],
  templates: {
    marketing: [],
    business: [],
    legal: [],
    design: []
  },
  resources: []
};

// Certificate templates for modules
export const certificateTemplates = {};