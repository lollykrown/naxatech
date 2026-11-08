// Copy taken from https://www.naxatech.org (typos lightly corrected).

export const services = [
  {
    key: 'web-development', title: 'Software Development', home: true,
    desc: 'We design and build web apps, mobile apps and the backends that power them: one team from first screen to production API, built for performance and ready to scale.',
    items: [
      'Websites & Web Applications (Next.js, React)',
      'eCommerce Stores & Landing Pages',
      'Headless CMS Integration (Sanity and similar)',
      'Android & iOS Mobile Apps (React Native, Expo)',
      'Backend & REST API Development (Node.js, PostgreSQL)',
      'Authentication, Payments & API Integrations',
    ],
  },
  {
    key: 'cyber-security', title: 'Cyber Security', home: true,
    desc: 'Defend your business day to day. We configure, monitor and respond so threats are stopped before they cause damage.',
    items: ['Firewall Configuration & Monitoring', 'Endpoint Security', 'Incident Response Planning', 'Threat Intelligence Reporting'],
  },
  {
    key: 'pen-testing', title: 'Penetration Testing & Audits', home: true,
    desc: 'Find the gaps before attackers do. We test your systems the way an attacker would and give you a clear report of what to fix.',
    items: ['Vulnerability Assessment', 'Black Box & White Box Testing', 'Network Penetration Testing', 'Web App Vulnerability Scanning', 'Security Audit Reports'],
  },
  {
    key: 'ict-support', title: 'ICT Support', home: true,
    desc: 'Keep your people working. Fast, reliable help for the hardware, software and networks you use every day, so downtime stays minimal.',
    items: ['Help Desk Services', 'Remote & On-Site Tech Support', 'Network Setup & Troubleshooting', 'Hardware Maintenance', 'Software Installation & Upgrades'],
  },
  {
    key: 'product-services', title: 'Product Services', home: true,
    desc: 'Get the right tools. We source, supply and set up the software licences and hardware your business needs.',
    items: ['Software Licensing', 'Hardware Procurement', 'Infrastructure Provisioning (Dell, HP, SOPHOS, Ubiquiti)'],
  },
  {
    key: 'it-consulting', title: 'IT Consulting', home: true,
    desc: 'Make informed technology decisions. We help you plan your IT, choose the right platforms and align technology with your business goals.',
    items: ['IT Strategy & Planning', 'Cloud Infrastructure Consulting', 'Software Advisory', 'Digital Transformation Consulting'],
  },
  {
    key: 'erp-consulting', title: 'ERP Consulting',
    desc: 'Run your whole business on one system, set up around how you actually work.',
    items: ['ERP Implementation & Customization', 'Business Process Mapping', 'Dynamics 365 Business Central Deployment', 'Data Migration & Reporting', 'User Training & Support', 'Integration with Your Existing Apps'],
  },
  {
    key: 'e-invoicing', title: 'E-Invoicing Integration',
    desc: 'Get compliant with FIRS e-invoicing and automate the invoice lifecycle end to end.',
    items: ['FIRS E-Invoicing Compliance Setup', 'ERP-to-Gateway System Integration', 'Access Point Configuration & Management', 'Real-Time Invoice Validation & Reporting', 'Automation of Invoice Lifecycle', 'E-Invoice Audit & Compliance Monitoring'],
  },
]

export const about = {
  tagline: 'A World-Wide IT Company',
  intro: 'NAXATECH is a fast growing world-wide information and technology company. Our method of operation helps to boost diverse team of professionals in various fields of tech, delivering unmatched services using globally accepted standards and processes.',
  story: [
    'NAXATECH is an IT providing company which was formed from a group of distinct, highly skilled, innovative and experienced tech experts. The company is registered with the Corporate Affairs Commission of the Federal Republic of Nigeria and is also registered in the United Kingdom.',
    'NAXATECH is a fast growing world-wide information and technology company. Our method of operation helps to boost diverse team of professionals in various fields of tech, delivering unmatched services using globally accepted standards and processes.',
  ],
  offer: [
    "Our skilled team excels in crafting and delivering top-notch web applications tailored to meet our clients' specific requirements. We specialize in developing a wide range of websites, from company profiles to e-commerce platforms.",
    "Infrastructure provisioning (hardware and software): we provide reliable hardware, software, and network resources to support your business's needs. Dell | HP | SOPHOS | Ubiquiti. Our team of experts will work with you to assess your requirements and provide you with a scalable solution.",
    'We give a platform for people to interact, collaborate, learn and advance in their career in tech, which results in successful breakthroughs.',
  ],
  mission: 'To provide flexible and cutting-edge IT solutions and expertise in information technology services that will be part of the daily experience of people in all sectors of tech around the world.',
  valuesIntro: 'At NAXATECH, we believe in the power of excellence and we are ready and dedicated to giving the utmost satisfaction to all our clients.',
}

export const values = [
  { title: 'Transparency', text: 'We communicate openly and honestly with our clients, ensuring clarity in every project phase.' },
  { title: 'Flexibility', text: "We adapt to our clients' changing needs, delivering solutions that fit evolving business landscapes." },
  { title: 'Quality', text: 'We uphold the highest standards to deliver results that exceed expectations.' },
  { title: 'Accuracy', text: 'We uphold the highest standards to deliver results that exceed expectations.' },
]

// Each testimonial: { quote, name, initials, color, role?, rating? (1-5) }
// Add new ones to the TOP of the list so the newest show first.
export const testimonials = [
  { quote: 'Thanks to Naxatech, we launched our new SaaS product 3 months ahead of schedule. Their agile development team is highly responsive and solution-focused.', name: 'Kayode Agboola', initials: 'KA', color: '#fdc700' },
  { quote: 'Their team not only delivered the right hardware solutions but also set everything up within 24 hours. Outstanding post-sale support!', name: 'Rotimi Olotu', initials: 'RO', color: '#7AE0FF' },
  { quote: 'We automated over 60% of our manual data-entry processes using their custom solution, saving hundreds of man-hours every month.', name: 'Blessing Akindele', initials: 'BA', color: '#FF8A3E' },
  { quote: 'Naxatech’s team is highly skilled and professional. They delivered our project on time and exceeded our expectations.', name: 'Chinedu Okafor', initials: 'CO', color: '#A0E7E5' },
]

export const TESTIMONIALS_PER_PAGE = 9
export const testimonialPageCount = () => Math.max(1, Math.ceil(testimonials.length / TESTIMONIALS_PER_PAGE))
