// Past work shown in the "Our Work" section (components/Work.js).
// Thumbnails live in public/projects/ (project1.png ... project11.png, ideally 4:3).
// The section and its nav link stay hidden while this list is empty.
const projects = [
  {
    title: 'tiviTea Mobile App',
    client: 'tiviTea',
    role: 'Mobile App Developer',
    year: '2026',
    thumbnail: '/projects/project11.png',
    live: 'https://play.google.com/store/apps/details?id=africa.tivitea.app',
    liveLabel: 'View on Google Play',
    longDescription: `A multi-service marketplace mobile application developed for tiviTea, connecting customers, workspace owners, equipment providers, skilled artisans and marketplace sellers across Nigeria.
The application provides a unified platform for discovering and booking co-working spaces, studios and rooms, renting tools and equipment, hiring verified artisans, and shopping from marketplace vendors.
Customers can browse available services, request quotations from artisans, manage bookings and orders, make secure payments through Paystack, and communicate directly with service providers. The platform also features QR-code e-tickets for booking verification and check-in.
For business owners and service providers, the application offers tools to manage listings, bookings, customer check-ins, quotations, earnings and withdrawals. Artisans can showcase their work through portfolios, receive job requests and build trust through identity verification.
The application brings multiple service categories together in one marketplace, simplifying how customers discover and access creative workspaces, equipment, professional services and products.`,
    tech: ['React Native', 'Expo', 'Android', 'iOS', 'Paystack', 'QR Code Integration', 'JWT Authentication', 'Google Sign-In', 'Apple Sign-In', 'Biometric Authentication', 'Identity Verification', 'REST API Integration'],
  },
  {
    title: 'Jemsom Global',
    client: 'Jemsom Global',
    role: 'Frontend Developer',
    year: '2026',
    duration: '2 weeks',
    thumbnail: '/projects/project10.png',
    live: 'https://www.jemsomglobal.com/',
    longDescription: `A professional educational consultancy website built for Jemsom Global, providing prospective students with information about its services and educational opportunities.
The project combines a responsive frontend with a dynamic review system backed by PostgreSQL. Reviews are retrieved from the database and displayed on the website, while users can submit new reviews through the application. The database is connected to the deployed application on Vercel, enabling review content to be managed dynamically rather than being limited to hardcoded page content.`,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'SEO', 'Accessibility', 'Responsive Design'],
  },
  {
    title: 'QuickFoodShop Mobile App',
    client: 'QuickFoodShop',
    role: 'Mobile App Developer',
    year: '2026',
    duration: '12 weeks',
    thumbnail: '/projects/project9.png',
    live: 'https://quickfoodshop.co.uk/app',
    liveLabel: 'View on App Store',
    longDescription: `A cross-platform food and grocery delivery application developed with Expo and React Native for QuickFoodShop, a UK-based online delivery marketplace connecting customers with restaurants, food vendors, and grocery stores.
    The Android and iOS applications provide customers with a convenient mobile experience for discovering restaurants, browsing menus and grocery products, managing shopping carts, placing orders, and tracking delivery progress. The apps integrate with the QuickFoodShop backend to support authentication, customer account management, order processing, payment workflows, invoice generation, and order-related notifications.
    Built with a shared React Native codebase, the applications use reusable UI components, API integration, mobile-optimized navigation, and image-loading improvements to deliver a consistent experience across Android and iPhone devices.`,
    tech: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Redis', 'BullMQ', 'Push Notifications', 'Android', 'iOS', 'JWT Authentication'],
  },
  {
    title: 'QuickFoodShop Website',
    client: 'QuickFoodShop',
    role: 'Full-Stack Developer',
    year: '2026',
    duration: '12 weeks',
    thumbnail: '/projects/project8.png',
    live: 'https://quickfoodshop.co.uk/',
    longDescription: `A full-stack food and grocery delivery platform built for QuickFoodShop, a UK-based online delivery service connecting customers with restaurants, food vendors, and grocery stores.
The website provides a complete online ordering experience, allowing customers to discover restaurants, browse food and grocery products, manage shopping carts, place orders, make payments, and track delivery progress. The platform also supports vendor registration, delivery registration, customer account management, and dedicated customer support.
Built with Next.js and React, the frontend integrates with a production backend powered by Node.js, Express.js, PostgreSQL, Prisma ORM, and Redis. The system supports authentication, order processing, background jobs, invoice generation, and delivery workflows, with containerized deployment and production infrastructure designed for reliability and performance.`,
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Redis', 'BullMQ', 'Docker', 'AWS EC2', 'JWT Authentication', 'Payment Integration', 'SEO'],
  },
  {
    title: 'Kingswill Specialist Hospital',
    client: 'Kingswill Specialist Hospital Ltd',
    role: 'Full-Stack Developer',
    year: '2026',
    duration: 'TBC',
    thumbnail: '/projects/kingswill.png',
    live: 'http://kingswillspecialisthospital.com/',
    longDescription: `A comprehensive healthcare website developed for Kingswill Specialist Hospital Ltd, a Lagos-based specialist healthcare facility providing reproductive medicine, fertility treatment, women's healthcare, and diagnostic services.
  The website provides patients and prospective clients with detailed information about the hospital's medical services, specialist teams, facilities, and patient care approach. It presents the hospital's core services, including in-vitro fertilisation (IVF), intrauterine insemination (IUI), assisted conception, fertility preservation, genetic screening, DNA testing, antenatal care, and specialist gynaecological services.
  The digital platform also supports patient engagement through appointment enquiries, service information, hospital locations, online payment access, and dedicated information for prospective patients. Additional sections highlight the hospital's medical professionals, laboratory capabilities, facilities, and healthcare partnerships.
The project focuses on building a professional and informative healthcare experience that makes specialist medical services easier to discover while strengthening the hospital's digital presence and accessibility for local and international patients.`,
    tech: ['Confirm Technology Stack', 'Responsive Web Design', 'Healthcare Website', 'Appointment Integration', 'SEO', 'Accessibility'],
  },
  {
    title: 'Crownwize Consulting',
    client: 'Crownwize Consulting Ltd',
    role: 'Frontend Developer',
    year: '2026',
    duration: '2 weeks',
    thumbnail: '/projects/project7.png',
    live: 'https://crownwizeconsult.co.uk/',
    longDescription: `A professional accounting, tax, and business advisory website built for Crownwize Consulting Ltd, a UK-based consultancy serving clients across the North East and throughout the UK.
The project was designed to establish a credible and professional digital presence for the consultancy while making its accounting, tax, compliance, and business advisory services easy for prospective clients to understand. The experience combines a refined corporate visual identity with clear service structures, practical financial information, and conversion-focused calls to action.
The website presents Crownwize Consulting's core services including bookkeeping, tax planning and filing, and business strategy. It also includes structured service packages, pricing information, client onboarding guidance, FAQs, a blog, reviews, legal and compliance information, and direct consultation and WhatsApp contact options.`,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Custom Design System', 'SEO', 'Image Optimization', 'Accessibility'],
  },
  {
    title: 'The Wildings Hub',
    client: 'The Wildings Hub',
    role: 'Full-Stack Developer',
    year: '2026',
    duration: 'TBC',
    thumbnail: '/projects/twlingshub.png',
    live: 'https://www.twlingshub.org/',
    longDescription: `An interactive event discovery and booking platform developed for The Wildings Hub, an experiential events brand organising premium social gatherings, beach parties, and lifestyle experiences.

  The website showcases Coastal Carnival 4.0, providing visitors with an engaging introduction to the event, its activities, entertainment, venue, pricing, and available experiences. Its visual presentation combines immersive imagery, video, and interactive content to communicate the atmosphere and excitement of the event.

  The platform includes an event registration workflow that collects attendee information, handles secure payments through Paystack, and automatically assigns attendees to one of four event tribes based on their registration details and availability. Each tribe has a defined capacity, with allocation taking place after successful payment.

  Additional functionality includes registration confirmation emails, emergency contact collection, event information, and payment instructions, giving attendees a streamlined booking experience from registration through payment confirmation.

  The project focuses on delivering an engaging event experience while simplifying attendee registration, payment processing, and event organisation through a modern, responsive web platform.`,
    tech: [
      'Event Management',
      'Event Registration',
      'Paystack Integration',
      'Payment Processing',
      'Automated Tribe Allocation',
      'Email Notifications',
      'Responsive Web Design',
      'Video Integration'
    ],
  },
  {
    title: 'BJ Media Production',
    client: 'BJ Media Production',
    role: 'Frontend Developer',
    year: '2026',
    duration: '1 week',
    thumbnail: '/projects/project6.png',
    live: 'https://bjmediaproduction.com',
    longDescription: `A cinematic videography and film production website built for BJ Media Production, a Lagos-based visual storytelling studio focused on creating films for brands, businesses, weddings, events, and documentaries.
The project was designed to position the production company as a premium visual storytelling partner rather than simply a video service provider. The experience puts the company's films and creative work at the centre of the website, using immersive imagery, cinematic typography, carefully structured case studies, and a refined editorial layout to communicate the quality and storytelling philosophy behind the work.
The website presents BJ Media Production's core services including corporate films, brand films, commercial video, documentary filmmaking, wedding films, and event coverage, while also providing a clear process for prospective clients to discover, plan, produce, edit, and deliver their projects.`,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Video Integration', 'YouTube Integration', 'Custom Design System', 'Image Optimization', 'SEO', 'Accessibility'],
  },
  {
    title: 'Estandz Place Consulting',
    client: 'Estandz Place Consulting Ltd',
    role: 'Full-Stack Developer',
    year: '2026',
    duration: '3 weeks',
    thumbnail: '/projects/project5.png',
    live: 'https://www.estandzplaceconsulting.co.uk',
    longDescription: `A full accounting and tax advisory website rebuilt from the ground up on Next.js, replacing a static site with a CMS-driven platform designed for real day-to-day content management by a non-technical client.
      I was responsible for the complete build: architecture, design system, and backend. This meant designing a distinctive "ledger" visual identity (perforated receipt-style cards, ruled lines, a warm ledger-green and mustard-gold palette) rather than a generic template look, then wiring it to a headless Sanity CMS so the client can publish blog posts, speaking engagements, downloadable resources, and client reviews without touching code. On the backend, I built transactional email infrastructure using Resend and React Email for the contact form, a full client-onboarding intake form, and gated resource downloads, each with server-side Zod validation, input sanitization, rate limiting, and bot-detection (honeypot fields plus submission-timing checks) to keep the forms genuinely spam-resistant in production.`,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Resend', 'React Email', 'Zod Validation', 'Rate Limiting', 'GROQ Queries', 'ISR + Webhooks', 'SEO & Structured Data'],
  },
    {
    title: 'Domus Residential',
    client: 'Domus Residential',
    role: 'Full-Stack Developer',
    year: '2025',
    duration: 'TBC',
    thumbnail: '/projects/domus.png',
    live: 'https://domus-res.co.uk/',
    longDescription: `A professional property management website built for Domus Residential, a residential property services company providing tailored property management solutions to landlords, property owners, residents, and property investors.
The website was designed to establish a credible digital presence for the company while presenting its range of residential property services through a clear and professional user experience. Its service offering includes residential and block management, property maintenance, housekeeping, financial services, and insurance.
The platform communicates the company's approach to delivering reliable, customer-focused property management, with dedicated sections explaining its services, company background, and approach to supporting property owners and residents. It also provides clear enquiry and contact opportunities for prospective clients seeking professional property management services.
The project focuses on presenting property management as a streamlined, transparent, and customer-oriented service, helping Domus Residential communicate its expertise, build trust, and generate enquiries from prospective clients.`,
    tech: ['Confirm Technology Stack', 'Responsive Web Design', 'Corporate Website', 'Property Management', 'SEO', 'Custom UI Design', 'Contact Forms'],
  },
    {
    title: 'K Genomics Laboratory',
    client: 'K Genomics Laboratory',
    role: 'Frontend Developer',
    year: '2025',
    duration: 'TBC',
    thumbnail: '/projects/kgenomicslaboratory.png',
    live: 'https://kgenomicslaboratory.com/',
    longDescription: `A professional website project for K Genomics Laboratory, focused on presenting the organisation's genomics and laboratory services through a clear, accessible, and scientifically oriented digital experience.
    The website is intended to establish a professional online presence for the laboratory, communicate its areas of expertise, and provide an accessible point of contact for individuals, healthcare professionals, researchers, and institutional partners.
    The project positions the laboratory's digital presence around scientific expertise, laboratory capabilities, and the communication of specialised genomics services. Its presentation is designed to help visitors understand the organisation, explore its areas of work, and connect with the laboratory for further information and enquiries.`,
    tech: ['Confirm Technology Stack', 'Responsive Web Design', 'Scientific Website', 'SEO', 'Custom UI Design', 'Accessibility'],
  },
    {
    title: 'INIFF Recombinant Genomics',
    client: 'INIFF Recombinant Genomics',
    role: 'Frontend Developer',
    year: '2025',
    duration: 'TBC',
    thumbnail: '/projects/iniffrecombinant.png',
    live: 'https://iniffrecombinant.com/',
    longDescription: `A corporate website built for INIFF Recombinant Genomics, a Nigerian biotechnology and scientific solutions company supporting healthcare institutions, research organisations, and laboratories with modern scientific technologies and expertise.
    The website was designed to communicate the company's position as a scientific technology and laboratory solutions partner, presenting its capabilities across laboratory equipment and consumables, laboratory setup and maintenance, and scientific training and capacity development.
    The digital experience provides healthcare professionals, researchers, and institutional clients with information about the company's products, services, and technical support capabilities. It also establishes clear communication channels for prospective clients seeking laboratory equipment, scientific solutions, and professional technical assistance.
    The project focuses on presenting complex scientific and technical services through a professional corporate experience that communicates expertise, builds institutional credibility, and supports business enquiries from the healthcare and research sectors.`,
    tech: ['Confirm Technology Stack', 'Responsive Web Design', 'Corporate Website', 'SEO', 'Custom UI Design', 'Contact Forms'],
  },

  {
    title: 'Care Network International',
    client: 'Care Network NGO',
    role: 'Frontend Developer',
    year: '2024',
    duration: '1 week',
    thumbnail: '/projects/project3.png',
    live: 'https://carenetwork.ngo',
    longDescription: `A website for a charity organization, with the goal of creating a modern, user-friendly experience that effectively communicates the organization's mission, engages visitors, and encourages support and donations.
I was responsible for translating a comprehensive Figma design system into a fully functional, responsive, and high-performance web experience. This involved crafting reusable components, ensuring pixel-perfect implementation, and delivering an intuitive interface that balances aesthetics with usability.`,
    tech: ['Next.js', 'Tailwind CSS', 'Figma to Code', 'GoFundMe Donation Integration', 'Campaign Pages', 'Email Notifications', 'Basic CMS', 'Analytics', 'SEO'],
  },
  {
    title: 'Avista Care Hospice',
    client: 'A Vista Care Hospice',
    role: 'Frontend Developer',
    year: '2024',
    duration: 'TBC',
    thumbnail: '/projects/avistacarehospice.png',
    live: 'https://avistacarehospice.com/',
    longDescription: `A professional healthcare website built for A Vista Care Hospice, a locally owned hospice care provider based in Texas, USA, offering personalised end-of-life care and support for patients and their families.
    The website was designed to communicate the organisation's commitment to compassionate, dignified, and family-centred care while helping patients, relatives, and caregivers understand the available hospice services and access support when they need it.
    The digital experience presents the organisation's care philosophy, hospice services, and commitment to improving quality of life for individuals living with life-limiting illnesses. It also provides information for families and caregivers, including respite care, personalised patient support, and ways to contact the care team.
    The website establishes a reassuring and accessible online presence, using clear service information, professional presentation, and straightforward contact options to help families make informed decisions when seeking hospice care.`,
    tech: ['Confirm Technology Stack', 'Responsive Web Design', 'Healthcare Website', 'SEO', 'Accessibility', 'Contact Forms'],
  },
    {
    title: 'FlowerStalk',
    client: 'FlowerStalk',
    role: 'Full-Stack Developer',
    year: '2024',
    duration: 'TBC',
    thumbnail: '/projects/flowerstalk.png',
    live: 'https://flowerstalk.org/',
    longDescription: `A full-stack e-commerce flower and gift delivery platform built for FlowerStalk, a floral business specialising in premium flower arrangements, bouquets, and gifts for different occasions.
      The website provides a complete online shopping experience, allowing customers to explore floral collections, browse products, select arrangements, manage shopping carts, place orders, complete online payments, and track their orders. The platform is designed to make purchasing flowers convenient while presenting the brand's products through an elegant and visually engaging shopping experience.
      The e-commerce experience supports the complete customer ordering journey, from product discovery and checkout to payment processing and order tracking. Additional features provide customers with access to business information, delivery details, customer support, and order-related assistance.
      The project focuses on combining an attractive product presentation with a seamless purchasing experience, helping FlowerStalk showcase its floral collections and serve customers looking to purchase flowers and gifts for celebrations, special occasions, and everyday gifting.`,
    tech: ['Confirm Technology Stack', 'E-commerce', 'Shopping Cart', 'Payment Integration', 'Order Management', 'Order Tracking', 'Responsive Web Design', 'SEO'],
  },
    {
    title: 'Tivitea Africa',
    client: 'Tivitea Africa',
    role: 'Full-Stack Developer',
    year: '2023',
    duration: '6 weeks',
    thumbnail: '/projects/project2.png',
    live: 'https://tivitea.africa',
    longDescription: `The project focused on creating a dynamic, user-centric platform designed to empower artisans, giving them seamless access to rentable workspaces and tools, while also enabling them to showcase their skills and connect with potential clients.
    I was responsible for bringing the vision to life on the frontend, translating a comprehensive Figma design system into a fully functional, responsive, and high-performance web experience. This involved crafting reusable components, ensuring pixel-perfect implementation, and delivering an intuitive interface that balances aesthetics with usability.`,
    tech: ['Next.js', 'Tailwind CSS', 'REST API', 'JWT Authentication', 'Role-Based Access Control', 'Dashboard UI', 'Payment Integration', 'Booking System', 'Cloud Storage', 'SSR', 'SEO'],
  },
  {
    title: 'Union Care Consult',
    client: 'Union Care Consult',
    role: 'Frontend Developer',
    year: '2022',
    duration: '1 week',
    thumbnail: '/projects/project1.png',
    live: 'https://unioncareconsult.com',
    longDescription: `A sleek, single-page website built for a small business to establish a strong and modern online presence.
      I transformed a Figma design into clean, production-ready code, starting with HTML, CSS, and Bootstrap, then progressively enhancing the project by migrating it into a React-based architecture for improved scalability and maintainability. To elevate the visual experience, I integrated illustrations from unDraw, adding a polished and engaging touch to the overall design.`,
    tech: ['Next.js', 'Bootstrap', 'Figma to Code', 'Contact Form Integration', 'Google Maps Integration', 'Responsive Design', 'SEO'],
  },
]

export const PROJECTS_PER_PAGE = 6
export const projectPageCount = () => Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE))

export default projects
