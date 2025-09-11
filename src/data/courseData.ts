import { Course, Module, Lesson } from '../types/course';

export const defaultCourse: Course = {
  id: 'ecommerce-digital-marketing-pro',
  title: 'Certified E-Commerce & Digital Marketing Professional',
  description: 'Complete professional certification program with job guarantee. Master e-commerce, digital marketing, and scale to multi-million dollar business.',
  instructor: 'Digital Marketing Institute',
  instructorId: 'instructor-1',
  thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  price: 118000,
  currency: 'INR',
  modules: [
    {
      id: 'module-1',
      title: 'Foundations of E-Commerce & Digital Marketing',
      description: 'Learn the fundamentals of online business and digital marketing strategies.',
      order: 1,
      completed: false,
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to E-Commerce Business Models',
          description: 'Understanding different e-commerce models and market opportunities.',
          duration: 90,
          materials: [
            {
              id: 'mat-1-1-1',
              type: 'pdf',
              title: 'E-Commerce Business Models Guide',
              url: 'https://example.com/ecommerce-models.pdf',
              description: 'Comprehensive guide covering B2B, B2C, C2C, and D2C models'
            },
            {
              id: 'mat-1-1-2',
              type: 'document',
              title: 'Market Research Template',
              url: 'https://example.com/market-research-template.docx',
              description: 'Template for conducting market research and competitor analysis'
            }
          ],
          completed: false,
          order: 1,
          quiz: {
            id: 'quiz-1-1',
            title: 'E-Commerce Fundamentals Quiz',
            description: 'Test your understanding of e-commerce basics',
            questions: [
              {
                id: 'q1',
                question: 'What is the primary difference between B2B and B2C e-commerce?',
                type: 'multiple-choice',
                options: [
                  'B2B sells to businesses, B2C sells to consumers',
                  'B2B is more expensive than B2C',
                  'B2B requires more inventory than B2C',
                  'There is no difference'
                ],
                correctAnswer: 'B2B sells to businesses, B2C sells to consumers',
                points: 10
              },
              {
                id: 'q2',
                question: 'Which business model involves selling directly to consumers without intermediaries?',
                type: 'multiple-choice',
                options: [
                  'B2B',
                  'B2C',
                  'D2C',
                  'C2C'
                ],
                correctAnswer: 'D2C',
                points: 10
              }
            ],
            timeLimit: 30,
            passingScore: 70,
            maxAttempts: 3,
            attempts: []
          }
        },
        {
          id: 'lesson-1-2',
          title: 'Digital Marketing Landscape Overview',
          description: 'Comprehensive overview of digital marketing channels and strategies.',
          duration: 120,
          materials: [
            {
              id: 'mat-1-2-1',
              type: 'pdf',
              title: 'Digital Marketing Channels Ebook',
              url: 'https://example.com/digital-marketing-channels.pdf',
              description: '150-page comprehensive guide to all digital marketing channels'
            },
            {
              id: 'mat-1-2-2',
              type: 'link',
              title: 'Digital Marketing Tools List',
              url: 'https://example.com/marketing-tools',
              description: 'Curated list of 100+ digital marketing tools and platforms'
            }
          ],
          completed: false,
          order: 2
        },
        {
          id: 'lesson-1-3',
          title: 'Market Research and Customer Analysis',
          description: 'Learn to identify target markets and analyze customer behavior.',
          duration: 105,
          materials: [
            {
              id: 'mat-1-3-1',
              type: 'pdf',
              title: 'Customer Persona Development Guide',
              url: 'https://example.com/customer-persona-guide.pdf',
              description: 'Step-by-step guide to creating detailed customer personas'
            },
            {
              id: 'mat-1-3-2',
              type: 'document',
              title: 'Market Analysis Spreadsheet',
              url: 'https://example.com/market-analysis.xlsx',
              description: 'Excel template for market size and competition analysis'
            }
          ],
          completed: false,
          order: 3,
          assignment: {
            id: 'assignment-1-3',
            title: 'Market Research Project',
            description: 'Conduct comprehensive market research for your chosen niche',
            instructions: 'Research and analyze a specific market niche, identify target customers, create detailed customer personas, and analyze at least 5 competitors. Submit a 10-page report with your findings.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        },
        {
          id: 'lesson-1-4',
          title: 'E-Commerce Platform Comparison',
          description: 'Compare major e-commerce platforms and their features.',
          duration: 75,
          materials: [
            {
              id: 'mat-1-4-1',
              type: 'pdf',
              title: 'Platform Comparison Matrix',
              url: 'https://example.com/platform-comparison.pdf',
              description: 'Detailed comparison of Shopify, WooCommerce, Magento, and more'
            }
          ],
          completed: false,
          order: 4
        },
        {
          id: 'lesson-1-5',
          title: 'Building Your First Business Plan',
          description: 'Create a comprehensive business plan for your e-commerce venture.',
          duration: 90,
          materials: [
            {
              id: 'mat-1-5-1',
              type: 'document',
              title: 'Business Plan Template',
              url: 'https://example.com/business-plan-template.docx',
              description: 'Professional business plan template with all sections'
            }
          ],
          completed: false,
          order: 5,
          assignment: {
            id: 'assignment-1-5',
            title: 'Business Plan Creation',
            description: 'Create a complete business plan for your e-commerce business',
            instructions: 'Using the provided template, create a comprehensive business plan including executive summary, market analysis, marketing strategy, financial projections, and operational plan.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Legal & Regulatory Aspects of E-Commerce',
      description: 'Understanding legal requirements and compliance for online businesses.',
      order: 2,
      completed: false,
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Business Registration and Legal Structure',
          description: 'Learn about business registration, licenses, and legal structures.',
          duration: 85,
          materials: [
            {
              id: 'mat-2-1-1',
              type: 'pdf',
              title: 'Business Registration Guide',
              url: 'https://example.com/business-registration.pdf',
              description: 'Complete guide to registering your business in India'
            },
            {
              id: 'mat-2-1-2',
              type: 'document',
              title: 'Legal Structure Comparison',
              url: 'https://example.com/legal-structures.docx',
              description: 'Comparison of sole proprietorship, partnership, LLP, and company'
            }
          ],
          completed: false,
          order: 1
        },
        {
          id: 'lesson-2-2',
          title: 'Tax Compliance and GST for E-Commerce',
          description: 'Understanding tax obligations and GST compliance for online businesses.',
          duration: 110,
          materials: [
            {
              id: 'mat-2-2-1',
              type: 'pdf',
              title: 'GST Guide for E-Commerce',
              url: 'https://example.com/gst-ecommerce.pdf',
              description: 'Comprehensive guide to GST compliance for online businesses'
            },
            {
              id: 'mat-2-2-2',
              type: 'document',
              title: 'Tax Calculator Spreadsheet',
              url: 'https://example.com/tax-calculator.xlsx',
              description: 'Excel tool for calculating GST and income tax'
            }
          ],
          completed: false,
          order: 2,
          quiz: {
            id: 'quiz-2-2',
            title: 'Tax and GST Quiz',
            description: 'Test your knowledge of tax compliance',
            questions: [
              {
                id: 'q1',
                question: 'What is the GST rate for most e-commerce products in India?',
                type: 'multiple-choice',
                options: ['5%', '12%', '18%', '28%'],
                correctAnswer: '18%',
                points: 10
              }
            ],
            timeLimit: 20,
            passingScore: 70,
            maxAttempts: 3,
            attempts: []
          }
        },
        {
          id: 'lesson-2-3',
          title: 'Privacy Policy and Terms of Service',
          description: 'Creating legally compliant privacy policies and terms of service.',
          duration: 70,
          materials: [
            {
              id: 'mat-2-3-1',
              type: 'document',
              title: 'Privacy Policy Template',
              url: 'https://example.com/privacy-policy-template.docx',
              description: 'GDPR and Indian law compliant privacy policy template'
            },
            {
              id: 'mat-2-3-2',
              type: 'document',
              title: 'Terms of Service Template',
              url: 'https://example.com/terms-template.docx',
              description: 'Comprehensive terms of service template'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-2-4',
          title: 'Intellectual Property Protection',
          description: 'Protecting your brand through trademarks, copyrights, and patents.',
          duration: 95,
          materials: [
            {
              id: 'mat-2-4-1',
              type: 'pdf',
              title: 'IP Protection Guide',
              url: 'https://example.com/ip-protection.pdf',
              description: 'Guide to protecting intellectual property in e-commerce'
            }
          ],
          completed: false,
          order: 4
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Store Development from Scratch',
      description: 'Build professional e-commerce stores using modern platforms and tools.',
      order: 3,
      completed: false,
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Choosing the Right E-Commerce Platform',
          description: 'Compare and select the best platform for your business needs.',
          duration: 80,
          materials: [
            {
              id: 'mat-3-1-1',
              type: 'pdf',
              title: 'Platform Selection Guide',
              url: 'https://example.com/platform-selection.pdf',
              description: 'Detailed comparison of 15+ e-commerce platforms'
            },
            {
              id: 'mat-3-1-2',
              type: 'document',
              title: 'Platform Evaluation Checklist',
              url: 'https://example.com/platform-checklist.docx',
              description: 'Checklist to evaluate platforms based on your needs'
            }
          ],
          completed: false,
          order: 1
        },
        {
          id: 'lesson-3-2',
          title: 'Store Design and User Experience',
          description: 'Design conversion-optimized store layouts and user experiences.',
          duration: 135,
          materials: [
            {
              id: 'mat-3-2-1',
              type: 'pdf',
              title: 'UX Design for E-Commerce',
              url: 'https://example.com/ux-design-ecommerce.pdf',
              description: '200-page guide to e-commerce UX design principles'
            },
            {
              id: 'mat-3-2-2',
              type: 'link',
              title: 'Design Inspiration Gallery',
              url: 'https://example.com/design-gallery',
              description: '500+ e-commerce design examples and templates'
            }
          ],
          completed: false,
          order: 2,
          assignment: {
            id: 'assignment-3-2',
            title: 'Store Design Mockup',
            description: 'Create a complete store design mockup',
            instructions: 'Design a complete e-commerce store mockup including homepage, product pages, cart, and checkout. Use tools like Figma or Adobe XD.',
            maxScore: 100,
            submissionType: 'url',
            submissions: []
          }
        },
        {
          id: 'lesson-3-3',
          title: 'Product Catalog Setup and Optimization',
          description: 'Create and optimize product listings for maximum conversions.',
          duration: 100,
          materials: [
            {
              id: 'mat-3-3-1',
              type: 'pdf',
              title: 'Product Listing Optimization',
              url: 'https://example.com/product-optimization.pdf',
              description: 'Guide to creating high-converting product listings'
            },
            {
              id: 'mat-3-3-2',
              type: 'document',
              title: 'Product Data Template',
              url: 'https://example.com/product-data-template.xlsx',
              description: 'Excel template for organizing product information'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-3-4',
          title: 'Payment Gateway Integration',
          description: 'Set up secure payment processing for your store.',
          duration: 90,
          materials: [
            {
              id: 'mat-3-4-1',
              type: 'pdf',
              title: 'Payment Gateway Setup Guide',
              url: 'https://example.com/payment-setup.pdf',
              description: 'Step-by-step guide to integrating payment gateways'
            }
          ],
          completed: false,
          order: 4
        },
        {
          id: 'lesson-3-5',
          title: 'Mobile Optimization and PWA',
          description: 'Optimize your store for mobile devices and create progressive web apps.',
          duration: 85,
          materials: [
            {
              id: 'mat-3-5-1',
              type: 'pdf',
              title: 'Mobile E-Commerce Guide',
              url: 'https://example.com/mobile-ecommerce.pdf',
              description: 'Complete guide to mobile e-commerce optimization'
            }
          ],
          completed: false,
          order: 5
        }
      ]
    },
    {
      id: 'module-4',
      title: 'AI in E-Commerce Store Building',
      description: 'Leverage artificial intelligence to automate and optimize your e-commerce operations.',
      order: 4,
      completed: false,
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'AI-Powered Product Recommendations',
          description: 'Implement AI recommendation engines to increase sales.',
          duration: 95,
          materials: [
            {
              id: 'mat-4-1-1',
              type: 'pdf',
              title: 'AI Recommendations Guide',
              url: 'https://example.com/ai-recommendations.pdf',
              description: 'Guide to implementing AI-powered product recommendations'
            },
            {
              id: 'mat-4-1-2',
              type: 'link',
              title: 'AI Tools Directory',
              url: 'https://example.com/ai-tools',
              description: 'Directory of AI tools for e-commerce'
            }
          ],
          completed: false,
          order: 1
        },
        {
          id: 'lesson-4-2',
          title: 'Chatbots and Customer Service Automation',
          description: 'Build AI chatbots for customer support and sales assistance.',
          duration: 110,
          materials: [
            {
              id: 'mat-4-2-1',
              type: 'pdf',
              title: 'Chatbot Implementation Guide',
              url: 'https://example.com/chatbot-guide.pdf',
              description: 'Complete guide to building and deploying chatbots'
            },
            {
              id: 'mat-4-2-2',
              type: 'document',
              title: 'Chatbot Scripts Template',
              url: 'https://example.com/chatbot-scripts.docx',
              description: 'Pre-written chatbot conversation scripts'
            }
          ],
          completed: false,
          order: 2,
          assignment: {
            id: 'assignment-4-2',
            title: 'Chatbot Development',
            description: 'Create a functional chatbot for customer service',
            instructions: 'Build a chatbot using platforms like Dialogflow or Chatfuel. The bot should handle common customer queries, product recommendations, and order tracking.',
            maxScore: 100,
            submissionType: 'url',
            submissions: []
          }
        },
        {
          id: 'lesson-4-3',
          title: 'AI for Inventory Management',
          description: 'Use AI to optimize inventory levels and predict demand.',
          duration: 85,
          materials: [
            {
              id: 'mat-4-3-1',
              type: 'pdf',
              title: 'AI Inventory Management',
              url: 'https://example.com/ai-inventory.pdf',
              description: 'Guide to AI-powered inventory optimization'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-4-4',
          title: 'Personalization and Dynamic Pricing',
          description: 'Implement AI-driven personalization and dynamic pricing strategies.',
          duration: 100,
          materials: [
            {
              id: 'mat-4-4-1',
              type: 'pdf',
              title: 'Personalization Strategies',
              url: 'https://example.com/personalization.pdf',
              description: 'AI-powered personalization techniques for e-commerce'
            }
          ],
          completed: false,
          order: 4
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Content & Social Media Marketing',
      description: 'Master content marketing and social media strategies for e-commerce growth.',
      order: 5,
      completed: false,
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Content Marketing Strategy',
          description: 'Develop comprehensive content marketing strategies.',
          duration: 105,
          materials: [
            {
              id: 'mat-5-1-1',
              type: 'pdf',
              title: 'Content Marketing Playbook',
              url: 'https://example.com/content-marketing.pdf',
              description: '300-page comprehensive content marketing guide'
            },
            {
              id: 'mat-5-1-2',
              type: 'document',
              title: 'Content Calendar Template',
              url: 'https://example.com/content-calendar.xlsx',
              description: 'Annual content calendar template with holidays and events'
            }
          ],
          completed: false,
          order: 1
        },
        {
          id: 'lesson-5-2',
          title: 'Social Media Platform Mastery',
          description: 'Master Instagram, Facebook, YouTube, and TikTok for business growth.',
          duration: 150,
          materials: [
            {
              id: 'mat-5-2-1',
              type: 'pdf',
              title: 'Social Media Marketing Guide',
              url: 'https://example.com/social-media-guide.pdf',
              description: 'Platform-specific strategies for all major social networks'
            },
            {
              id: 'mat-5-2-2',
              type: 'link',
              title: 'Social Media Tools',
              url: 'https://example.com/social-tools',
              description: 'Curated list of social media management tools'
            }
          ],
          completed: false,
          order: 2,
          quiz: {
            id: 'quiz-5-2',
            title: 'Social Media Marketing Quiz',
            description: 'Test your social media marketing knowledge',
            questions: [
              {
                id: 'q1',
                question: 'What is the optimal posting frequency for Instagram business accounts?',
                type: 'multiple-choice',
                options: ['1-2 times per day', '3-5 times per day', '1-2 times per week', '5-10 times per day'],
                correctAnswer: '1-2 times per day',
                points: 10
              }
            ],
            timeLimit: 25,
            passingScore: 70,
            maxAttempts: 3,
            attempts: []
          }
        },
        {
          id: 'lesson-5-3',
          title: 'Influencer Marketing and Partnerships',
          description: 'Build successful influencer marketing campaigns.',
          duration: 90,
          materials: [
            {
              id: 'mat-5-3-1',
              type: 'pdf',
              title: 'Influencer Marketing Guide',
              url: 'https://example.com/influencer-marketing.pdf',
              description: 'Complete guide to influencer marketing campaigns'
            },
            {
              id: 'mat-5-3-2',
              type: 'document',
              title: 'Influencer Outreach Templates',
              url: 'https://example.com/influencer-templates.docx',
              description: 'Email templates for influencer outreach'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-5-4',
          title: 'Video Marketing and YouTube Strategy',
          description: 'Create compelling video content and grow your YouTube channel.',
          duration: 120,
          materials: [
            {
              id: 'mat-5-4-1',
              type: 'pdf',
              title: 'Video Marketing Masterclass',
              url: 'https://example.com/video-marketing.pdf',
              description: 'Complete guide to video marketing for e-commerce'
            }
          ],
          completed: false,
          order: 4,
          assignment: {
            id: 'assignment-5-4',
            title: 'Video Marketing Campaign',
            description: 'Create a complete video marketing campaign',
            instructions: 'Plan and create a 5-video marketing campaign for your e-commerce business. Include scripts, storyboards, and a distribution strategy.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        }
      ]
    },
    {
      id: 'module-6',
      title: 'Paid Ads Strategy (Meta, Google, YouTube)',
      description: 'Master paid advertising across major platforms for maximum ROI.',
      order: 6,
      completed: false,
      lessons: [
        {
          id: 'lesson-6-1',
          title: 'Facebook and Instagram Ads Mastery',
          description: 'Create high-converting Meta advertising campaigns.',
          duration: 140,
          materials: [
            {
              id: 'mat-6-1-1',
              type: 'pdf',
              title: 'Facebook Ads Mastery Guide',
              url: 'https://example.com/facebook-ads.pdf',
              description: '400-page comprehensive Facebook advertising guide'
            },
            {
              id: 'mat-6-1-2',
              type: 'document',
              title: 'Ad Campaign Templates',
              url: 'https://example.com/ad-templates.xlsx',
              description: 'Pre-built campaign structures for different objectives'
            }
          ],
          completed: false,
          order: 1,
          assignment: {
            id: 'assignment-6-1',
            title: 'Facebook Ads Campaign',
            description: 'Create and launch a Facebook ads campaign',
            instructions: 'Set up a complete Facebook ads campaign with at least 3 ad sets and 5 ad creatives. Include targeting strategy, budget allocation, and performance tracking.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        },
        {
          id: 'lesson-6-2',
          title: 'Google Ads and Shopping Campaigns',
          description: 'Master Google Ads for search and shopping campaigns.',
          duration: 155,
          materials: [
            {
              id: 'mat-6-2-1',
              type: 'pdf',
              title: 'Google Ads Complete Guide',
              url: 'https://example.com/google-ads.pdf',
              description: 'Comprehensive guide to Google Ads and Shopping campaigns'
            },
            {
              id: 'mat-6-2-2',
              type: 'document',
              title: 'Keyword Research Template',
              url: 'https://example.com/keyword-research.xlsx',
              description: 'Advanced keyword research and analysis template'
            }
          ],
          completed: false,
          order: 2
        },
        {
          id: 'lesson-6-3',
          title: 'YouTube Advertising Strategy',
          description: 'Create effective video advertising campaigns on YouTube.',
          duration: 110,
          materials: [
            {
              id: 'mat-6-3-1',
              type: 'pdf',
              title: 'YouTube Ads Guide',
              url: 'https://example.com/youtube-ads.pdf',
              description: 'Complete guide to YouTube advertising formats and strategies'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-6-4',
          title: 'Advanced Retargeting Strategies',
          description: 'Implement sophisticated retargeting campaigns across platforms.',
          duration: 95,
          materials: [
            {
              id: 'mat-6-4-1',
              type: 'pdf',
              title: 'Retargeting Mastery',
              url: 'https://example.com/retargeting.pdf',
              description: 'Advanced retargeting strategies and implementation'
            }
          ],
          completed: false,
          order: 4
        }
      ]
    },
    {
      id: 'module-7',
      title: 'SEO & Organic Growth',
      description: 'Master search engine optimization and organic growth strategies.',
      order: 7,
      completed: false,
      lessons: [
        {
          id: 'lesson-7-1',
          title: 'E-Commerce SEO Fundamentals',
          description: 'Optimize your store for search engines and organic traffic.',
          duration: 125,
          materials: [
            {
              id: 'mat-7-1-1',
              type: 'pdf',
              title: 'E-Commerce SEO Guide',
              url: 'https://example.com/ecommerce-seo.pdf',
              description: '350-page comprehensive e-commerce SEO guide'
            },
            {
              id: 'mat-7-1-2',
              type: 'document',
              title: 'SEO Audit Checklist',
              url: 'https://example.com/seo-audit.xlsx',
              description: 'Complete SEO audit checklist with 200+ checkpoints'
            }
          ],
          completed: false,
          order: 1,
          quiz: {
            id: 'quiz-7-1',
            title: 'SEO Fundamentals Quiz',
            description: 'Test your SEO knowledge',
            questions: [
              {
                id: 'q1',
                question: 'What is the most important on-page SEO factor for e-commerce?',
                type: 'multiple-choice',
                options: ['Title tags', 'Product descriptions', 'Meta descriptions', 'Header tags'],
                correctAnswer: 'Title tags',
                points: 10
              }
            ],
            timeLimit: 30,
            passingScore: 70,
            maxAttempts: 3,
            attempts: []
          }
        },
        {
          id: 'lesson-7-2',
          title: 'Local SEO for E-Commerce',
          description: 'Dominate local search results for your business.',
          duration: 85,
          materials: [
            {
              id: 'mat-7-2-1',
              type: 'pdf',
              title: 'Local SEO Strategy',
              url: 'https://example.com/local-seo.pdf',
              description: 'Complete local SEO strategy for e-commerce businesses'
            }
          ],
          completed: false,
          order: 2
        },
        {
          id: 'lesson-7-3',
          title: 'Link Building and Authority Building',
          description: 'Build domain authority through strategic link building.',
          duration: 100,
          materials: [
            {
              id: 'mat-7-3-1',
              type: 'pdf',
              title: 'Link Building Strategies',
              url: 'https://example.com/link-building.pdf',
              description: 'Advanced link building strategies and outreach templates'
            },
            {
              id: 'mat-7-3-2',
              type: 'document',
              title: 'Outreach Email Templates',
              url: 'https://example.com/outreach-templates.docx',
              description: 'Proven email templates for link building outreach'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-7-4',
          title: 'Technical SEO for E-Commerce',
          description: 'Master technical SEO aspects specific to e-commerce sites.',
          duration: 110,
          materials: [
            {
              id: 'mat-7-4-1',
              type: 'pdf',
              title: 'Technical SEO Guide',
              url: 'https://example.com/technical-seo.pdf',
              description: 'Advanced technical SEO for e-commerce platforms'
            }
          ],
          completed: false,
          order: 4,
          assignment: {
            id: 'assignment-7-4',
            title: 'SEO Audit and Strategy',
            description: 'Conduct a complete SEO audit and create optimization strategy',
            instructions: 'Perform a comprehensive SEO audit of an e-commerce website and create a detailed optimization strategy with prioritized action items.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        }
      ]
    },
    {
      id: 'module-8',
      title: 'CRM, Email, WhatsApp & Automation',
      description: 'Implement customer relationship management and marketing automation systems.',
      order: 8,
      completed: false,
      lessons: [
        {
          id: 'lesson-8-1',
          title: 'CRM Setup and Customer Management',
          description: 'Build and manage customer relationships effectively.',
          duration: 105,
          materials: [
            {
              id: 'mat-8-1-1',
              type: 'pdf',
              title: 'CRM Implementation Guide',
              url: 'https://example.com/crm-guide.pdf',
              description: 'Complete guide to CRM selection and implementation'
            },
            {
              id: 'mat-8-1-2',
              type: 'document',
              title: 'Customer Journey Mapping',
              url: 'https://example.com/customer-journey.xlsx',
              description: 'Template for mapping customer journeys and touchpoints'
            }
          ],
          completed: false,
          order: 1
        },
        {
          id: 'lesson-8-2',
          title: 'Email Marketing Automation',
          description: 'Create automated email sequences that convert.',
          duration: 120,
          materials: [
            {
              id: 'mat-8-2-1',
              type: 'pdf',
              title: 'Email Marketing Mastery',
              url: 'https://example.com/email-marketing.pdf',
              description: '250-page guide to email marketing automation'
            },
            {
              id: 'mat-8-2-2',
              type: 'document',
              title: 'Email Templates Collection',
              url: 'https://example.com/email-templates.zip',
              description: '50+ proven email templates for different scenarios'
            }
          ],
          completed: false,
          order: 2,
          assignment: {
            id: 'assignment-8-2',
            title: 'Email Automation Sequence',
            description: 'Create a complete email automation sequence',
            instructions: 'Design and implement a 7-email welcome sequence for new customers, including subject lines, content, and automation triggers.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        },
        {
          id: 'lesson-8-3',
          title: 'WhatsApp Business and Marketing',
          description: 'Leverage WhatsApp for customer communication and sales.',
          duration: 80,
          materials: [
            {
              id: 'mat-8-3-1',
              type: 'pdf',
              title: 'WhatsApp Marketing Guide',
              url: 'https://example.com/whatsapp-marketing.pdf',
              description: 'Complete guide to WhatsApp Business marketing'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-8-4',
          title: 'Marketing Automation Workflows',
          description: 'Build sophisticated marketing automation workflows.',
          duration: 95,
          materials: [
            {
              id: 'mat-8-4-1',
              type: 'pdf',
              title: 'Automation Workflows',
              url: 'https://example.com/automation-workflows.pdf',
              description: 'Advanced marketing automation strategies and workflows'
            }
          ],
          completed: false,
          order: 4
        }
      ]
    },
    {
      id: 'module-9',
      title: 'Sales, Closures & E-Com Growth Hacking',
      description: 'Master advanced sales techniques and growth hacking strategies.',
      order: 9,
      completed: false,
      lessons: [
        {
          id: 'lesson-9-1',
          title: 'Conversion Rate Optimization',
          description: 'Optimize your funnel for maximum conversions.',
          duration: 130,
          materials: [
            {
              id: 'mat-9-1-1',
              type: 'pdf',
              title: 'CRO Mastery Guide',
              url: 'https://example.com/cro-guide.pdf',
              description: 'Comprehensive conversion rate optimization guide'
            },
            {
              id: 'mat-9-1-2',
              type: 'document',
              title: 'A/B Testing Framework',
              url: 'https://example.com/ab-testing.xlsx',
              description: 'Framework for planning and tracking A/B tests'
            }
          ],
          completed: false,
          order: 1,
          assignment: {
            id: 'assignment-9-1',
            title: 'CRO Audit and Optimization Plan',
            description: 'Conduct CRO audit and create optimization plan',
            instructions: 'Analyze an e-commerce website for conversion optimization opportunities and create a detailed optimization plan with prioritized recommendations.',
            maxScore: 100,
            submissionType: 'file',
            submissions: []
          }
        },
        {
          id: 'lesson-9-2',
          title: 'Sales Psychology and Persuasion',
          description: 'Master the psychology of selling online.',
          duration: 100,
          materials: [
            {
              id: 'mat-9-2-1',
              type: 'pdf',
              title: 'Sales Psychology Guide',
              url: 'https://example.com/sales-psychology.pdf',
              description: 'Psychology principles for e-commerce sales'
            }
          ],
          completed: false,
          order: 2
        },
        {
          id: 'lesson-9-3',
          title: 'Growth Hacking Techniques',
          description: 'Implement proven growth hacking strategies.',
          duration: 90,
          materials: [
            {
              id: 'mat-9-3-1',
              type: 'pdf',
              title: 'Growth Hacking Playbook',
              url: 'https://example.com/growth-hacking.pdf',
              description: '100+ growth hacking techniques for e-commerce'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-9-4',
          title: 'Customer Retention Strategies',
          description: 'Build long-term customer relationships and increase lifetime value.',
          duration: 85,
          materials: [
            {
              id: 'mat-9-4-1',
              type: 'pdf',
              title: 'Customer Retention Guide',
              url: 'https://example.com/customer-retention.pdf',
              description: 'Strategies for improving customer retention and LTV'
            }
          ],
          completed: false,
          order: 4
        }
      ]
    },
    {
      id: 'module-10',
      title: 'Scaling to a Multi-Million Business',
      description: 'Scale your business operations and reach multi-million dollar revenue.',
      order: 10,
      completed: false,
      lessons: [
        {
          id: 'lesson-10-1',
          title: 'Building Systems and Processes',
          description: 'Create scalable systems for business growth.',
          duration: 140,
          materials: [
            {
              id: 'mat-10-1-1',
              type: 'pdf',
              title: 'Business Systems Guide',
              url: 'https://example.com/business-systems.pdf',
              description: 'Complete guide to building scalable business systems'
            },
            {
              id: 'mat-10-1-2',
              type: 'document',
              title: 'SOP Templates',
              url: 'https://example.com/sop-templates.zip',
              description: 'Standard operating procedure templates for all departments'
            }
          ],
          completed: false,
          order: 1
        },
        {
          id: 'lesson-10-2',
          title: 'Team Building and Management',
          description: 'Build and manage high-performing teams.',
          duration: 115,
          materials: [
            {
              id: 'mat-10-2-1',
              type: 'pdf',
              title: 'Team Management Guide',
              url: 'https://example.com/team-management.pdf',
              description: 'Guide to building and managing remote teams'
            },
            {
              id: 'mat-10-2-2',
              type: 'document',
              title: 'Hiring Templates',
              url: 'https://example.com/hiring-templates.zip',
              description: 'Job descriptions and interview templates'
            }
          ],
          completed: false,
          order: 2
        },
        {
          id: 'lesson-10-3',
          title: 'International Expansion Strategies',
          description: 'Expand your business to global markets.',
          duration: 105,
          materials: [
            {
              id: 'mat-10-3-1',
              type: 'pdf',
              title: 'International Expansion Guide',
              url: 'https://example.com/international-expansion.pdf',
              description: 'Complete guide to expanding e-commerce internationally'
            }
          ],
          completed: false,
          order: 3
        },
        {
          id: 'lesson-10-4',
          title: 'Exit Strategies and Business Valuation',
          description: 'Plan for business exit and maximize valuation.',
          duration: 90,
          materials: [
            {
              id: 'mat-10-4-1',
              type: 'pdf',
              title: 'Business Valuation Guide',
              url: 'https://example.com/business-valuation.pdf',
              description: 'Guide to valuing and selling e-commerce businesses'
            }
          ],
          completed: false,
          order: 4,
          assignment: {
            id: 'capstone-project',
            title: 'Capstone Project: Complete E-Commerce Store',
            description: 'Build and launch your complete e-commerce store',
            instructions: 'Create a full-featured e-commerce store using everything you\'ve learned in this course. Submit your live store URL, business plan, marketing strategy, and a 20-page case study documenting your process and results.',
            maxScore: 200,
            submissionType: 'url',
            submissions: []
          }
        },
        {
          id: 'lesson-10-5',
          title: 'Advanced Analytics and Data Science',
          description: 'Use advanced analytics to drive business decisions.',
          duration: 100,
          materials: [
            {
              id: 'mat-10-5-1',
              type: 'pdf',
              title: 'E-Commerce Analytics Guide',
              url: 'https://example.com/ecommerce-analytics.pdf',
              description: 'Advanced analytics and data science for e-commerce'
            },
            {
              id: 'mat-10-5-2',
              type: 'document',
              title: 'Analytics Dashboard Templates',
              url: 'https://example.com/analytics-templates.xlsx',
              description: 'Pre-built analytics dashboard templates'
            }
          ],
          completed: false,
          order: 5
        }
      ]
    }
  ],
  students: [],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  totalDuration: 12000, // 200 hours in minutes
  level: 'intermediate',
  category: 'Digital Marketing',
  tags: ['e-commerce', 'digital marketing', 'business', 'certification'],
  jobGuarantee: true,
  certificateTemplate: 'professional'
};