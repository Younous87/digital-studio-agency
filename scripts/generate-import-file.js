const fs = require('fs');
const path = require('path');

// Generate sample data in Sanity's ndjson format for import
const testimonials = [
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    clientName: 'Sarah Johnson',
    company: 'TechStart Inc.',
    role: 'CEO & Founder',
    quote: 'Working with this team transformed our brand completely. They understood our vision and delivered beyond our expectations. The new brand identity has helped us stand out in a crowded market and attract the right clients.',
    rating: 5,
    featured: true
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    clientName: 'Michael Chen',
    company: 'GreenLeaf Organics',
    role: 'Marketing Director',
    quote: 'The website they designed for us is not only beautiful but also incredibly functional. Our conversion rates have increased by 45% since launch. Their attention to detail and understanding of user experience is exceptional.',
    rating: 5,
    featured: true
  },
  {
    _id: 'testimonial-3',
    _type: 'testimonial',
    clientName: 'Emily Rodriguez',
    company: 'Fitness Plus',
    role: 'Owner',
    quote: 'From the initial consultation to the final delivery, the process was smooth and professional. They listened to our needs and created a digital solution that perfectly represents our brand and serves our members.',
    rating: 5,
    featured: false
  },
  {
    _id: 'testimonial-4',
    _type: 'testimonial',
    clientName: 'David Thompson',
    company: 'Urban Threads',
    role: 'Creative Director',
    quote: 'Their creative approach and technical expertise is unmatched. They took our e-commerce vision and made it a reality with a stunning website that our customers love to use. Sales have never been better!',
    rating: 5,
    featured: true
  }
];

const services = [
  {
    _id: 'service-1',
    _type: 'service',
    title: 'Brand Identity Design',
    slug: { _type: 'slug', current: 'brand-identity-design' },
    shortDescription: 'Create a memorable brand identity that resonates with your target audience and stands out in the market.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Our brand identity design service helps businesses establish a strong visual presence. We craft unique logos, color palettes, typography systems, and brand guidelines that tell your story and connect with your audience.'
          }
        ]
      }
    ],
    features: [
      { _key: 'f1', title: 'Logo Design', description: 'Custom logo creation with multiple concepts and revisions' },
      { _key: 'f2', title: 'Brand Guidelines', description: 'Comprehensive style guide for consistent brand application' },
      { _key: 'f3', title: 'Color Palette', description: 'Strategic color selection that represents your brand values' },
      { _key: 'f4', title: 'Typography System', description: 'Professional font selection and hierarchy guidelines' }
    ],
    processSteps: [
      { _key: 's1', step: 1, title: 'Discovery', description: 'Deep dive into your business, values, and target audience' },
      { _key: 's2', step: 2, title: 'Research', description: 'Market analysis and competitive landscape review' },
      { _key: 's3', step: 3, title: 'Concept Development', description: 'Create multiple design directions' },
      { _key: 's4', step: 4, title: 'Refinement', description: 'Polish the selected concept to perfection' },
      { _key: 's5', step: 5, title: 'Delivery', description: 'Final files and comprehensive brand guidelines' }
    ],
    cta: {
      title: 'Ready to Build Your Brand?',
      description: 'Let\'s create a brand identity that makes an impact.',
      buttonText: 'Start Your Project',
      buttonLink: '/contact'
    }
  },
  {
    _id: 'service-2',
    _type: 'service',
    title: 'Web Design & Development',
    slug: { _type: 'slug', current: 'web-design-development' },
    shortDescription: 'Beautiful, responsive websites that deliver exceptional user experiences and drive business results.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'desc2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We design and develop custom websites that combine stunning aesthetics with powerful functionality. From landing pages to complex web applications, we build digital experiences that engage users and achieve your business goals.'
          }
        ]
      }
    ],
    features: [
      { _key: 'f5', title: 'Responsive Design', description: 'Optimized for all devices and screen sizes' },
      { _key: 'f6', title: 'Performance Optimization', description: 'Fast loading times and smooth interactions' },
      { _key: 'f7', title: 'CMS Integration', description: 'Easy content management with Sanity CMS' },
      { _key: 'f8', title: 'SEO Optimization', description: 'Built-in best practices for search visibility' }
    ],
    processSteps: [
      { _key: 's6', step: 1, title: 'Planning', description: 'Define goals, features, and site architecture' },
      { _key: 's7', step: 2, title: 'Design', description: 'Create wireframes and visual designs' },
      { _key: 's8', step: 3, title: 'Development', description: 'Build with modern technologies' },
      { _key: 's9', step: 4, title: 'Testing', description: 'Ensure quality across all platforms' },
      { _key: 's10', step: 5, title: 'Launch', description: 'Deploy and monitor performance' }
    ],
    cta: {
      title: 'Need a New Website?',
      description: 'Let\'s build something amazing together.',
      buttonText: 'Get Started',
      buttonLink: '/contact'
    }
  },
  {
    _id: 'service-3',
    _type: 'service',
    title: 'UI/UX Design',
    slug: { _type: 'slug', current: 'ui-ux-design' },
    shortDescription: 'User-centered design that combines beautiful interfaces with intuitive experiences.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'desc3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Our UI/UX design process focuses on understanding your users and creating interfaces that are both beautiful and easy to use. We combine research, testing, and creative design to deliver exceptional digital experiences.'
          }
        ]
      }
    ],
    features: [
      { _key: 'f9', title: 'User Research', description: 'Understanding user needs and behaviors' },
      { _key: 'f10', title: 'Wireframing', description: 'Structural planning of user interfaces' },
      { _key: 'f11', title: 'Prototyping', description: 'Interactive mockups for testing' },
      { _key: 'f12', title: 'Usability Testing', description: 'Validate designs with real users' }
    ],
    processSteps: [
      { _key: 's11', step: 1, title: 'Research', description: 'User interviews and competitive analysis' },
      { _key: 's12', step: 2, title: 'Define', description: 'Create user personas and journey maps' },
      { _key: 's13', step: 3, title: 'Ideate', description: 'Brainstorm solutions and create wireframes' },
      { _key: 's14', step: 4, title: 'Prototype', description: 'Build interactive prototypes' },
      { _key: 's15', step: 5, title: 'Test & Iterate', description: 'Validate and refine the design' }
    ],
    cta: {
      title: 'Improve Your User Experience?',
      description: 'Let\'s create intuitive designs that users love.',
      buttonText: 'Let\'s Talk',
      buttonLink: '/contact'
    }
  },
  {
    _id: 'service-4',
    _type: 'service',
    title: 'Digital Marketing',
    slug: { _type: 'slug', current: 'digital-marketing' },
    shortDescription: 'Strategic digital marketing campaigns that increase visibility, engagement, and conversions.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'desc4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'We develop comprehensive digital marketing strategies that connect your brand with the right audience. From SEO and content marketing to social media and paid advertising, we drive measurable results for your business.'
          }
        ]
      }
    ],
    features: [
      { _key: 'f13', title: 'SEO Strategy', description: 'Improve search rankings and organic traffic' },
      { _key: 'f14', title: 'Content Marketing', description: 'Engaging content that attracts and converts' },
      { _key: 'f15', title: 'Social Media', description: 'Build community and brand awareness' },
      { _key: 'f16', title: 'Analytics', description: 'Track performance and optimize campaigns' }
    ],
    processSteps: [
      { _key: 's16', step: 1, title: 'Audit', description: 'Analyze current digital presence' },
      { _key: 's17', step: 2, title: 'Strategy', description: 'Develop comprehensive marketing plan' },
      { _key: 's18', step: 3, title: 'Implementation', description: 'Execute campaigns across channels' },
      { _key: 's19', step: 4, title: 'Optimization', description: 'Continuously improve performance' },
      { _key: 's20', step: 5, title: 'Reporting', description: 'Track ROI and share insights' }
    ],
    cta: {
      title: 'Grow Your Digital Presence?',
      description: 'Let\'s create a marketing strategy that delivers results.',
      buttonText: 'Schedule a Consultation',
      buttonLink: '/contact'
    }
  }
];

const projects = [
  {
    _id: 'project-1',
    _type: 'project',
    title: 'TechStart Brand Transformation',
    slug: { _type: 'slug', current: 'techstart-brand-transformation' },
    clientName: 'TechStart Inc.',
    shortDescription: 'A complete brand identity redesign for a growing tech startup looking to establish market leadership.',
    year: 2024,
    date: '2024-03-15',
    categories: ['branding', 'ui-ux'],
    featured: true,
    testimonial: { _type: 'reference', _ref: 'testimonial-1' },
    services: [{ _type: 'reference', _ref: 'service-1' }],
    caseStudy: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp1', text: 'Challenge' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp2',
            text: 'TechStart needed to evolve from a scrappy startup to a credible industry player. Their existing brand lacked cohesion and failed to communicate their innovative approach to enterprise solutions.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp3', text: 'Solution' }]
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp4',
            text: 'We developed a modern, professional brand identity that balanced approachability with enterprise credibility. The new visual system included a custom logo, comprehensive color palette, and typography system that works across all touchpoints.'
          }
        ]
      }
    ],
    results: [
      { _key: 'r1', metric: 'Brand Recognition', value: '+67%', description: 'Increase in brand awareness among target audience' },
      { _key: 'r2', metric: 'Lead Quality', value: '+85%', description: 'Improvement in qualified lead generation' },
      { _key: 'r3', metric: 'Customer Trust', value: '+52%', description: 'Boost in brand trust metrics' }
    ],
    projectUrl: 'https://techstart-example.com'
  },
  {
    _id: 'project-2',
    _type: 'project',
    title: 'GreenLeaf E-Commerce Platform',
    slug: { _type: 'slug', current: 'greenleaf-ecommerce-platform' },
    clientName: 'GreenLeaf Organics',
    shortDescription: 'A beautiful e-commerce experience for an organic food brand focused on sustainability and health.',
    year: 2024,
    date: '2024-05-22',
    categories: ['web-design', 'development', 'ui-ux'],
    featured: true,
    testimonial: { _type: 'reference', _ref: 'testimonial-2' },
    services: [{ _type: 'reference', _ref: 'service-2' }],
    caseStudy: [
      {
        _type: 'block',
        _key: 'b5',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp5', text: 'Challenge' }]
      },
      {
        _type: 'block',
        _key: 'b6',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp6',
            text: 'GreenLeaf wanted to bring their organic products online with a shopping experience that reflected their values of sustainability and transparency while making it easy for customers to discover and purchase products.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b7',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp7', text: 'Solution' }]
      },
      {
        _type: 'block',
        _key: 'b8',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp8',
            text: 'We created a custom e-commerce platform with rich product storytelling, easy navigation, and seamless checkout. The design emphasizes beautiful product photography and transparent sourcing information.'
          }
        ]
      }
    ],
    results: [
      { _key: 'r4', metric: 'Conversion Rate', value: '+45%', description: 'Increase in purchase completion' },
      { _key: 'r5', metric: 'Average Order Value', value: '+32%', description: 'Growth in customer spending' },
      { _key: 'r6', metric: 'Customer Satisfaction', value: '4.8/5', description: 'User experience rating' }
    ],
    projectUrl: 'https://greenleaf-example.com'
  },
  {
    _id: 'project-3',
    _type: 'project',
    title: 'Fitness Plus Mobile App',
    slug: { _type: 'slug', current: 'fitness-plus-mobile-app' },
    clientName: 'Fitness Plus',
    shortDescription: 'An intuitive mobile app for class scheduling, member management, and fitness tracking.',
    year: 2024,
    date: '2024-08-10',
    categories: ['ui-ux', 'development'],
    featured: true,
    testimonial: { _type: 'reference', _ref: 'testimonial-3' },
    services: [{ _type: 'reference', _ref: 'service-3' }],
    caseStudy: [
      {
        _type: 'block',
        _key: 'b9',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp9', text: 'Challenge' }]
      },
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp10',
            text: 'Fitness Plus needed a digital solution to manage their growing membership base and make it easier for members to book classes, track workouts, and stay motivated.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b11',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp11', text: 'Solution' }]
      },
      {
        _type: 'block',
        _key: 'b12',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp12',
            text: 'We designed and developed a mobile-first app that makes it easy to browse classes, book sessions, and track fitness progress. The app includes personalized recommendations and social features to keep members engaged.'
          }
        ]
      }
    ],
    results: [
      { _key: 'r7', metric: 'Member Engagement', value: '+78%', description: 'Increase in active app users' },
      { _key: 'r8', metric: 'Class Bookings', value: '+92%', description: 'Growth in online reservations' },
      { _key: 'r9', metric: 'Member Retention', value: '+34%', description: 'Improvement in membership renewals' }
    ],
    projectUrl: 'https://fitnessplus-example.com'
  },
  {
    _id: 'project-4',
    _type: 'project',
    title: 'Urban Threads Fashion Marketplace',
    slug: { _type: 'slug', current: 'urban-threads-fashion-marketplace' },
    clientName: 'Urban Threads',
    shortDescription: 'A cutting-edge fashion marketplace connecting independent designers with style-conscious consumers.',
    year: 2023,
    date: '2023-11-30',
    categories: ['web-design', 'development', 'branding'],
    featured: false,
    testimonial: { _type: 'reference', _ref: 'testimonial-4' },
    services: [{ _type: 'reference', _ref: 'service-2' }],
    caseStudy: [
      {
        _type: 'block',
        _key: 'b13',
        style: 'h2',
        children: [{ _type: 'span', _key: 'sp13', text: 'Challenge' }]
      },
      {
        _type: 'block',
        _key: 'b14',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'sp14',
            text: 'Urban Threads wanted to create a platform that would showcase independent fashion designers while providing a smooth shopping experience that could compete with major fashion retailers.'
          }
        ]
      }
    ],
    results: [
      { _key: 'r10', metric: 'Designer Applications', value: '200+', description: 'Designers joined in first 3 months' },
      { _key: 'r11', metric: 'Monthly Sales', value: '$450K', description: 'Platform GMV after 6 months' }
    ],
    projectUrl: 'https://urbanthreads-example.com'
  }
];

const posts = [
  {
    _id: 'post-1',
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
        _key: 'p1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ps1',
            text: 'As we move through 2024, web design continues to evolve at a rapid pace. Here are the key trends that are defining the digital landscape this year.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'p2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'ps2', text: '1. Immersive 3D Experiences' }]
      },
      {
        _type: 'block',
        _key: 'p3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ps3',
            text: 'Three-dimensional elements are becoming more accessible and performant, allowing designers to create engaging, immersive experiences without sacrificing load times.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-2',
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
        _key: 'p4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ps4',
            text: 'User experience research is the foundation of great digital products. Here\'s how to conduct effective UX research that leads to meaningful insights.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-3',
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
        _key: 'p5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ps5',
            text: 'Building a successful website requires more than just great design and code. Here\'s our step-by-step process for delivering exceptional web projects.'
          }
        ]
      }
    ]
  }
];

const teamMembers = [
  {
    _id: 'team-1',
    _type: 'teamMember',
    name: 'Alex Morgan',
    slug: { _type: 'slug', current: 'alex-morgan' },
    role: 'Creative Director',
    bio: [
      {
        _type: 'block',
        _key: 't1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ts1',
            text: 'With over 15 years of experience in design and branding, Alex leads our creative team with a passion for crafting memorable visual experiences. She has worked with Fortune 500 companies and startups alike, bringing strategic thinking and artistic vision to every project.'
          }
        ]
      }
    ],
    socialLinks: [
      { _key: 'sl1', platform: 'linkedin', url: 'https://linkedin.com/in/alexmorgan' },
      { _key: 'sl2', platform: 'twitter', url: 'https://twitter.com/alexmorgan' }
    ],
    order: 1
  },
  {
    _id: 'team-2',
    _type: 'teamMember',
    name: 'Jordan Lee',
    slug: { _type: 'slug', current: 'jordan-lee' },
    role: 'Lead Developer',
    bio: [
      {
        _type: 'block',
        _key: 't2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ts2',
            text: 'Jordan is a full-stack developer who loves turning complex problems into elegant solutions. Specializing in React, Next.js, and modern web technologies, Jordan ensures every project is built with performance, scalability, and user experience in mind.'
          }
        ]
      }
    ],
    socialLinks: [
      { _key: 'sl3', platform: 'github', url: 'https://github.com/jordanlee' },
      { _key: 'sl4', platform: 'linkedin', url: 'https://linkedin.com/in/jordanlee' }
    ],
    order: 2
  },
  {
    _id: 'team-3',
    _type: 'teamMember',
    name: 'Sam Taylor',
    slug: { _type: 'slug', current: 'sam-taylor' },
    role: 'UX Designer',
    bio: [
      {
        _type: 'block',
        _key: 't3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'ts3',
            text: 'Sam brings a user-centered approach to every project, combining research, empathy, and creativity to design experiences that delight users and achieve business goals. With a background in psychology and design, Sam bridges the gap between user needs and technical possibilities.'
          }
        ]
      }
    ],
    socialLinks: [
      { _key: 'sl5', platform: 'linkedin', url: 'https://linkedin.com/in/samtaylor' }
    ],
    order: 3
  }
];

const siteSettings = {
  _type: 'siteSettings',
  title: 'Digital Studio',
  tagline: 'Crafting Digital Experiences That Inspire',
  description: 'We are a digital agency specializing in web design, branding, and user experience. Our mission is to help businesses thrive in the digital age through thoughtful design and strategic thinking.',
  contact: {
    email: 'hello@digitalstudio.com',
    phone: '+1 (555) 123-4567',
    address: '123 Creative Street\nSan Francisco, CA 94102'
  },
  socialMedia: [
    { _key: 'sm1', platform: 'linkedin', url: 'https://linkedin.com/company/digitalstudio' },
    { _key: 'sm2', platform: 'twitter', url: 'https://twitter.com/digitalstudio' },
    { _key: 'sm3', platform: 'instagram', url: 'https://instagram.com/digitalstudio' },
    { _key: 'sm4', platform: 'github', url: 'https://github.com/digitalstudio' }
  ],
  navigation: [
    { _key: 'nav1', label: 'Home', url: '/' },
    { _key: 'nav2', label: 'Services', url: '/services' },
    { _key: 'nav3', label: 'Work', url: '/work' },
    { _key: 'nav4', label: 'About', url: '/about' },
    { _key: 'nav5', label: 'Blog', url: '/blog' },
    { _key: 'nav6', label: 'Contact', url: '/contact' }
  ],
  footer: {
    text: 'Digital Studio is a creative agency dedicated to helping businesses grow through exceptional design and digital experiences.',
    copyright: '© 2024 Digital Studio. All rights reserved.',
    links: [
      { _key: 'fl1', label: 'Privacy Policy', url: '/privacy' },
      { _key: 'fl2', label: 'Terms of Service', url: '/terms' },
      { _key: 'fl3', label: 'Cookie Policy', url: '/cookies' }
    ]
  },
  seo: {
    metaTitle: 'Digital Studio - Web Design & Development Agency',
    metaDescription: 'Award-winning digital agency specializing in web design, branding, and user experience. Transform your digital presence with our expert team.',
    keywords: ['web design', 'branding', 'UI/UX design', 'digital agency', 'web development']
  }
};

const homepage = {
  _type: 'homepage',
  title: 'Homepage',
  pageBuilder: [
    {
      _type: 'hero',
      _key: 'hero1',
      headline: 'Transform Your Digital Presence',
      subheadline: 'We create stunning digital experiences that drive results. From web design to branding, we help businesses stand out in the digital landscape.',
      cta: {
        text: 'View Our Work',
        link: '/work'
      },
      secondaryCta: {
        text: 'Get In Touch',
        link: '/contact'
      }
    },
    {
      _type: 'servicesOverview',
      _key: 'services1',
      title: 'What We Do',
      description: 'Our comprehensive suite of services helps businesses create impactful digital experiences.',
      services: [
        { _type: 'reference', _ref: 'service-1' },
        { _type: 'reference', _ref: 'service-2' },
        { _type: 'reference', _ref: 'service-3' },
        { _type: 'reference', _ref: 'service-4' }
      ]
    },
    {
      _type: 'statsSection',
      _key: 'stats1',
      title: 'Results That Matter',
      stats: [
        { _key: 'st1', value: '150+', label: 'Projects Completed', description: 'Successfully delivered projects for clients worldwide' },
        { _key: 'st2', value: '50+', label: 'Happy Clients', description: 'Businesses that trust us with their digital presence' },
        { _key: 'st3', value: '15+', label: 'Years Experience', description: 'Combined expertise in design and development' },
        { _key: 'st4', value: '98%', label: 'Client Satisfaction', description: 'Our clients love working with us' }
      ]
    },
    {
      _type: 'featuredProjects',
      _key: 'projects1',
      title: 'Featured Work',
      description: 'Check out some of our recent projects and case studies.',
      projects: [
        { _type: 'reference', _ref: 'project-1' },
        { _type: 'reference', _ref: 'project-2' },
        { _type: 'reference', _ref: 'project-3' }
      ]
    },
    {
      _type: 'testimonials',
      _key: 'testimonials1',
      title: 'What Our Clients Say',
      description: 'Don\'t just take our word for it - hear from some of our amazing clients.',
      testimonials: [
        { _type: 'reference', _ref: 'testimonial-1' },
        { _type: 'reference', _ref: 'testimonial-2' },
        { _type: 'reference', _ref: 'testimonial-4' }
      ]
    },
    {
      _type: 'ctaSection',
      _key: 'cta1',
      title: 'Ready to Start Your Project?',
      description: 'Let\'s work together to create something amazing. Get in touch with us today and let\'s discuss how we can help bring your vision to life.',
      primaryCta: {
        text: 'Schedule a Consultation',
        link: '/contact'
      },
      secondaryCta: {
        text: 'View Our Services',
        link: '/services'
      }
    }
  ],
  seo: {
    metaTitle: 'Digital Studio - Award-Winning Web Design & Development',
    metaDescription: 'Transform your digital presence with our expert web design, branding, and development services. View our portfolio and see how we can help your business grow.'
  }
};

// Convert to ndjson format
const allDocs = [...testimonials, ...services, ...projects, ...posts, ...teamMembers, siteSettings, homepage];
const ndjson = allDocs.map(doc => JSON.stringify(doc)).join('\n');

// Write to file
const outputPath = path.join(__dirname, 'sample-data.ndjson');
fs.writeFileSync(outputPath, ndjson);

console.log('✅ Created sample-data.ndjson');
console.log(`   Generated ${allDocs.length} documents:`);
console.log(`   - ${testimonials.length} testimonials`);
console.log(`   - ${services.length} services`);
console.log(`   - ${projects.length} projects`);
console.log(`   - ${posts.length} blog posts`);
console.log(`   - ${teamMembers.length} team members`);
console.log(`   - 1 site settings`);
console.log(`   - 1 homepage`);
console.log('\n📦 To import this data into Sanity, run:');
console.log('   cd sanity-studio');
console.log('   npx sanity dataset import ../scripts/sample-data.ndjson production --replace');
