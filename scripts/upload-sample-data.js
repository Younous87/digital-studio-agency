const { createClient } = require('@sanity/client');
require('dotenv/config');

// Debug: Check if token is loaded
console.log('Checking environment variables...');
console.log('Token exists:', !!process.env.SANITY_API_TOKEN);
console.log('Token length:', process.env.SANITY_API_TOKEN?.length);
console.log('Token starts with:', process.env.SANITY_API_TOKEN?.substring(0, 8));

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is not set in .env.local');
  console.error('Please add your Sanity API token to .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: 'ryc5e4q2',
  dataset: 'production',
  apiVersion: '2024-11-05',
  token: process.env.SANITY_API_TOKEN.trim(),
  useCdn: false,
});

// Sample data
const sampleData = {
  services: [
    {
      _type: 'service',
      title: 'Brand Identity Design',
      slug: { _type: 'slug', current: 'brand-identity-design' },
      shortDescription: 'Create a memorable brand identity that resonates with your target audience and stands out in the market.',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Our brand identity design service helps businesses establish a strong visual presence. We craft unique logos, color palettes, typography systems, and brand guidelines that tell your story and connect with your audience.'
            }
          ]
        }
      ],
      features: [
        { title: 'Logo Design', description: 'Custom logo creation with multiple concepts and revisions' },
        { title: 'Brand Guidelines', description: 'Comprehensive style guide for consistent brand application' },
        { title: 'Color Palette', description: 'Strategic color selection that represents your brand values' },
        { title: 'Typography System', description: 'Professional font selection and hierarchy guidelines' }
      ],
      processSteps: [
        { step: 1, title: 'Discovery', description: 'Deep dive into your business, values, and target audience' },
        { step: 2, title: 'Research', description: 'Market analysis and competitive landscape review' },
        { step: 3, title: 'Concept Development', description: 'Create multiple design directions' },
        { step: 4, title: 'Refinement', description: 'Polish the selected concept to perfection' },
        { step: 5, title: 'Delivery', description: 'Final files and comprehensive brand guidelines' }
      ],
      cta: {
        title: 'Ready to Build Your Brand?',
        description: 'Let\'s create a brand identity that makes an impact.',
        buttonText: 'Start Your Project',
        buttonLink: '/contact'
      }
    },
    {
      _type: 'service',
      title: 'Web Design & Development',
      slug: { _type: 'slug', current: 'web-design-development' },
      shortDescription: 'Beautiful, responsive websites that deliver exceptional user experiences and drive business results.',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We design and develop custom websites that combine stunning aesthetics with powerful functionality. From landing pages to complex web applications, we build digital experiences that engage users and achieve your business goals.'
            }
          ]
        }
      ],
      features: [
        { title: 'Responsive Design', description: 'Optimized for all devices and screen sizes' },
        { title: 'Performance Optimization', description: 'Fast loading times and smooth interactions' },
        { title: 'CMS Integration', description: 'Easy content management with Sanity CMS' },
        { title: 'SEO Optimization', description: 'Built-in best practices for search visibility' }
      ],
      processSteps: [
        { step: 1, title: 'Planning', description: 'Define goals, features, and site architecture' },
        { step: 2, title: 'Design', description: 'Create wireframes and visual designs' },
        { step: 3, title: 'Development', description: 'Build with modern technologies' },
        { step: 4, title: 'Testing', description: 'Ensure quality across all platforms' },
        { step: 5, title: 'Launch', description: 'Deploy and monitor performance' }
      ],
      cta: {
        title: 'Need a New Website?',
        description: 'Let\'s build something amazing together.',
        buttonText: 'Get Started',
        buttonLink: '/contact'
      }
    },
    {
      _type: 'service',
      title: 'UI/UX Design',
      slug: { _type: 'slug', current: 'ui-ux-design' },
      shortDescription: 'User-centered design that combines beautiful interfaces with intuitive experiences.',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Our UI/UX design process focuses on understanding your users and creating interfaces that are both beautiful and easy to use. We combine research, testing, and creative design to deliver exceptional digital experiences.'
            }
          ]
        }
      ],
      features: [
        { title: 'User Research', description: 'Understanding user needs and behaviors' },
        { title: 'Wireframing', description: 'Structural planning of user interfaces' },
        { title: 'Prototyping', description: 'Interactive mockups for testing' },
        { title: 'Usability Testing', description: 'Validate designs with real users' }
      ],
      processSteps: [
        { step: 1, title: 'Research', description: 'User interviews and competitive analysis' },
        { step: 2, title: 'Define', description: 'Create user personas and journey maps' },
        { step: 3, title: 'Ideate', description: 'Brainstorm solutions and create wireframes' },
        { step: 4, title: 'Prototype', description: 'Build interactive prototypes' },
        { step: 5, title: 'Test & Iterate', description: 'Validate and refine the design' }
      ],
      cta: {
        title: 'Improve Your User Experience?',
        description: 'Let\'s create intuitive designs that users love.',
        buttonText: 'Let\'s Talk',
        buttonLink: '/contact'
      }
    },
    {
      _type: 'service',
      title: 'Digital Marketing',
      slug: { _type: 'slug', current: 'digital-marketing' },
      shortDescription: 'Strategic digital marketing campaigns that increase visibility, engagement, and conversions.',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We develop comprehensive digital marketing strategies that connect your brand with the right audience. From SEO and content marketing to social media and paid advertising, we drive measurable results for your business.'
            }
          ]
        }
      ],
      features: [
        { title: 'SEO Strategy', description: 'Improve search rankings and organic traffic' },
        { title: 'Content Marketing', description: 'Engaging content that attracts and converts' },
        { title: 'Social Media', description: 'Build community and brand awareness' },
        { title: 'Analytics', description: 'Track performance and optimize campaigns' }
      ],
      processSteps: [
        { step: 1, title: 'Audit', description: 'Analyze current digital presence' },
        { step: 2, title: 'Strategy', description: 'Develop comprehensive marketing plan' },
        { step: 3, title: 'Implementation', description: 'Execute campaigns across channels' },
        { step: 4, title: 'Optimization', description: 'Continuously improve performance' },
        { step: 5, title: 'Reporting', description: 'Track ROI and share insights' }
      ],
      cta: {
        title: 'Grow Your Digital Presence?',
        description: 'Let\'s create a marketing strategy that delivers results.',
        buttonText: 'Schedule a Consultation',
        buttonLink: '/contact'
      }
    }
  ],
  testimonials: [
    {
      _type: 'testimonial',
      clientName: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO & Founder',
      quote: 'Working with this team transformed our brand completely. They understood our vision and delivered beyond our expectations. The new brand identity has helped us stand out in a crowded market and attract the right clients.',
      rating: 5,
      featured: true
    },
    {
      _type: 'testimonial',
      clientName: 'Michael Chen',
      company: 'GreenLeaf Organics',
      role: 'Marketing Director',
      quote: 'The website they designed for us is not only beautiful but also incredibly functional. Our conversion rates have increased by 45% since launch. Their attention to detail and understanding of user experience is exceptional.',
      rating: 5,
      featured: true
    },
    {
      _type: 'testimonial',
      clientName: 'Emily Rodriguez',
      company: 'Fitness Plus',
      role: 'Owner',
      quote: 'From the initial consultation to the final delivery, the process was smooth and professional. They listened to our needs and created a digital solution that perfectly represents our brand and serves our members.',
      rating: 5,
      featured: false
    },
    {
      _type: 'testimonial',
      clientName: 'David Thompson',
      company: 'Urban Threads',
      role: 'Creative Director',
      quote: 'Their creative approach and technical expertise is unmatched. They took our e-commerce vision and made it a reality with a stunning website that our customers love to use. Sales have never been better!',
      rating: 5,
      featured: true
    }
  ],
  projects: [
    {
      _type: 'project',
      title: 'TechStart Brand Transformation',
      slug: { _type: 'slug', current: 'techstart-brand-transformation' },
      clientName: 'TechStart Inc.',
      shortDescription: 'A complete brand identity redesign for a growing tech startup looking to establish market leadership.',
      year: 2024,
      date: '2024-03-15',
      categories: ['branding', 'ui-ux'],
      featured: true,
      caseStudy: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Challenge' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'TechStart needed to evolve from a scrappy startup to a credible industry player. Their existing brand lacked cohesion and failed to communicate their innovative approach to enterprise solutions.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Solution' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We developed a modern, professional brand identity that balanced approachability with enterprise credibility. The new visual system included a custom logo, comprehensive color palette, and typography system that works across all touchpoints.'
            }
          ]
        }
      ],
      results: [
        { metric: 'Brand Recognition', value: '+67%', description: 'Increase in brand awareness among target audience' },
        { metric: 'Lead Quality', value: '+85%', description: 'Improvement in qualified lead generation' },
        { metric: 'Customer Trust', value: '+52%', description: 'Boost in brand trust metrics' }
      ],
      projectUrl: 'https://techstart-example.com'
    },
    {
      _type: 'project',
      title: 'GreenLeaf E-Commerce Platform',
      slug: { _type: 'slug', current: 'greenleaf-ecommerce-platform' },
      clientName: 'GreenLeaf Organics',
      shortDescription: 'A beautiful e-commerce experience for an organic food brand focused on sustainability and health.',
      year: 2024,
      date: '2024-05-22',
      categories: ['web-design', 'development', 'ui-ux'],
      featured: true,
      caseStudy: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Challenge' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'GreenLeaf wanted to bring their organic products online with a shopping experience that reflected their values of sustainability and transparency while making it easy for customers to discover and purchase products.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Solution' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We created a custom e-commerce platform with rich product storytelling, easy navigation, and seamless checkout. The design emphasizes beautiful product photography and transparent sourcing information.'
            }
          ]
        }
      ],
      results: [
        { metric: 'Conversion Rate', value: '+45%', description: 'Increase in purchase completion' },
        { metric: 'Average Order Value', value: '+32%', description: 'Growth in customer spending' },
        { metric: 'Customer Satisfaction', value: '4.8/5', description: 'User experience rating' }
      ],
      projectUrl: 'https://greenleaf-example.com'
    },
    {
      _type: 'project',
      title: 'Fitness Plus Mobile App',
      slug: { _type: 'slug', current: 'fitness-plus-mobile-app' },
      clientName: 'Fitness Plus',
      shortDescription: 'An intuitive mobile app for class scheduling, member management, and fitness tracking.',
      year: 2024,
      date: '2024-08-10',
      categories: ['ui-ux', 'development'],
      featured: true,
      caseStudy: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Challenge' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Fitness Plus needed a digital solution to manage their growing membership base and make it easier for members to book classes, track workouts, and stay motivated.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Solution' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We designed and developed a mobile-first app that makes it easy to browse classes, book sessions, and track fitness progress. The app includes personalized recommendations and social features to keep members engaged.'
            }
          ]
        }
      ],
      results: [
        { metric: 'Member Engagement', value: '+78%', description: 'Increase in active app users' },
        { metric: 'Class Bookings', value: '+92%', description: 'Growth in online reservations' },
        { metric: 'Member Retention', value: '+34%', description: 'Improvement in membership renewals' }
      ],
      projectUrl: 'https://fitnessplus-example.com'
    },
    {
      _type: 'project',
      title: 'Urban Threads Fashion Marketplace',
      slug: { _type: 'slug', current: 'urban-threads-fashion-marketplace' },
      clientName: 'Urban Threads',
      shortDescription: 'A cutting-edge fashion marketplace connecting independent designers with style-conscious consumers.',
      year: 2023,
      date: '2023-11-30',
      categories: ['web-design', 'development', 'branding'],
      featured: false,
      caseStudy: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Challenge' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Urban Threads wanted to create a platform that would showcase independent fashion designers while providing a smooth shopping experience that could compete with major fashion retailers.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Solution' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We built a sophisticated marketplace with rich visual presentations, designer profiles, and advanced filtering. The platform makes it easy to discover new designers while providing a premium shopping experience.'
            }
          ]
        }
      ],
      results: [
        { metric: 'Designer Applications', value: '200+', description: 'Designers joined in first 3 months' },
        { metric: 'Monthly Sales', value: '$450K', description: 'Platform GMV after 6 months' },
        { metric: 'User Engagement', value: '12 min', description: 'Average session duration' }
      ],
      projectUrl: 'https://urbanthreads-example.com'
    }
  ],
  posts: [
    {
      _type: 'post',
      title: 'The Future of Web Design: Trends to Watch in 2024',
      slug: { _type: 'slug', current: 'future-of-web-design-2024' },
      publishedAt: '2024-01-15T09:00:00.000Z',
      excerpt: 'Explore the cutting-edge design trends that are shaping the digital landscape this year, from immersive experiences to sustainable design practices.',
      categories: ['design', 'technology'],
      tags: ['web design', 'trends', 'UI/UX'],
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'As we move through 2024, web design continues to evolve at a rapid pace. Here are the key trends that are defining the digital landscape this year.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '1. Immersive 3D Experiences' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Three-dimensional elements are becoming more accessible and performant, allowing designers to create engaging, immersive experiences without sacrificing load times. WebGL and Three.js are making it easier than ever to bring 3D to the web.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '2. AI-Powered Personalization' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Artificial intelligence is enabling unprecedented levels of personalization. Websites can now adapt their content, layout, and recommendations in real-time based on user behavior and preferences.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '3. Sustainable Design Practices' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'With growing awareness of digital carbon footprints, designers are focusing on creating lighter, more efficient websites. This includes optimizing images, reducing unnecessary animations, and choosing green hosting providers.'
            }
          ]
        }
      ]
    },
    {
      _type: 'post',
      title: 'Building Better User Experiences: A Guide to UX Research',
      slug: { _type: 'slug', current: 'guide-to-ux-research' },
      publishedAt: '2024-02-20T10:30:00.000Z',
      excerpt: 'Learn how proper UX research can transform your digital products and create experiences that truly resonate with your users.',
      categories: ['design', 'business'],
      tags: ['UX research', 'user testing', 'design thinking'],
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'User experience research is the foundation of great digital products. Here\'s how to conduct effective UX research that leads to meaningful insights.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Why UX Research Matters' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Too often, products are designed based on assumptions rather than real user needs. UX research helps you understand your users\' goals, behaviors, and pain points, ensuring your design decisions are grounded in reality.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Key Research Methods' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'User interviews, surveys, usability testing, and analytics analysis all play important roles in the research process. The key is choosing the right method for your specific questions and stage of development.'
            }
          ]
        }
      ]
    },
    {
      _type: 'post',
      title: 'From Idea to Launch: Our Website Development Process',
      slug: { _type: 'slug', current: 'website-development-process' },
      publishedAt: '2024-03-10T14:00:00.000Z',
      excerpt: 'Take a behind-the-scenes look at how we transform ideas into high-performing websites through our proven development process.',
      categories: ['development', 'business'],
      tags: ['web development', 'process', 'project management'],
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Building a successful website requires more than just great design and code. Here\'s our step-by-step process for delivering exceptional web projects.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Phase 1: Discovery & Planning' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We start every project by deeply understanding your business, goals, and users. This includes stakeholder interviews, competitive analysis, and defining success metrics.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Phase 2: Design & Prototyping' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'With insights from discovery, we create wireframes and high-fidelity designs. We build interactive prototypes to test key user flows before development begins.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Phase 3: Development & Testing' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Our developers bring the designs to life using modern technologies and best practices. We conduct thorough testing to ensure everything works flawlessly across all devices.'
            }
          ]
        }
      ]
    }
  ]
};

async function uploadData() {
  try {
    console.log('Starting data upload to Sanity...\n');

    // Upload testimonials first (no dependencies)
    console.log('Uploading testimonials...');
    const testimonialIds = [];
    for (const testimonial of sampleData.testimonials) {
      const result = await client.create(testimonial);
      testimonialIds.push(result._id);
      console.log(`✓ Created testimonial: ${testimonial.clientName}`);
    }

    // Upload services (no dependencies)
    console.log('\nUploading services...');
    const serviceIds = [];
    for (const service of sampleData.services) {
      const result = await client.create(service);
      serviceIds.push(result._id);
      console.log(`✓ Created service: ${service.title}`);
    }

    // Upload projects and link to testimonials
    console.log('\nUploading projects...');
    const projectIds = [];
    for (let i = 0; i < sampleData.projects.length; i++) {
      const project = sampleData.projects[i];
      
      // Link testimonial if available
      if (testimonialIds[i]) {
        project.testimonial = {
          _type: 'reference',
          _ref: testimonialIds[i]
        };
      }
      
      // Link services (first project gets first 2 services, etc.)
      if (serviceIds.length > 0) {
        project.services = [
          { _type: 'reference', _ref: serviceIds[i % serviceIds.length] }
        ];
      }
      
      const result = await client.create(project);
      projectIds.push(result._id);
      console.log(`✓ Created project: ${project.title}`);
    }

    // Update testimonials with project references
    console.log('\nLinking testimonials to projects...');
    for (let i = 0; i < Math.min(testimonialIds.length, projectIds.length); i++) {
      await client
        .patch(testimonialIds[i])
        .set({ project: { _type: 'reference', _ref: projectIds[i] } })
        .commit();
      console.log(`✓ Linked testimonial ${i + 1} to project`);
    }

    // Update services with related projects
    console.log('\nLinking services to projects...');
    for (let i = 0; i < serviceIds.length; i++) {
      const relatedProjects = projectIds
        .slice(i, i + 2)
        .map(id => ({ _type: 'reference', _ref: id }));
      
      if (relatedProjects.length > 0) {
        await client
          .patch(serviceIds[i])
          .set({ relatedProjects })
          .commit();
        console.log(`✓ Linked service ${i + 1} to projects`);
      }
    }

    // Upload blog posts
    console.log('\nUploading blog posts...');
    const postIds = [];
    for (const post of sampleData.posts) {
      const result = await client.create(post);
      postIds.push(result._id);
      console.log(`✓ Created blog post: ${post.title}`);
    }

    // Link related posts
    console.log('\nLinking related blog posts...');
    for (let i = 0; i < postIds.length; i++) {
      const relatedPosts = postIds
        .filter((_, index) => index !== i)
        .slice(0, 2)
        .map(id => ({ _type: 'reference', _ref: id }));
      
      if (relatedPosts.length > 0) {
        await client
          .patch(postIds[i])
          .set({ relatedPosts })
          .commit();
        console.log(`✓ Linked related posts for post ${i + 1}`);
      }
    }

    console.log('\n✅ All sample data uploaded successfully!');
    console.log('\nSummary:');
    console.log(`- ${sampleData.services.length} services`);
    console.log(`- ${sampleData.projects.length} projects`);
    console.log(`- ${sampleData.testimonials.length} testimonials`);
    console.log(`- ${sampleData.posts.length} blog posts`);
    console.log('\nYou can now view and edit this data in your Sanity Studio!');
    
  } catch (error) {
    console.error('Error uploading data:', error.message);
    process.exit(1);
  }
}

uploadData();
