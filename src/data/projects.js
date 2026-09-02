const projects = [
  {
    id: "car-cost-calculator",

    title: "Car Ownership Cost Calculator",

    category: "PYTHON APPLICATION",

    status: "Completed",

    description:
      "A GUI-based Python application that calculates monthly and yearly vehicle ownership costs while validating user input and handling errors.",

    problem:
      "Vehicle expenses are spread across multiple categories, making it difficult to understand the true monthly and yearly cost of owning a car.",

    solution:
      "I developed a desktop application that allows users to enter their vehicle expenses and automatically calculates estimated ownership costs through a simple graphical interface.",

    technologies: [
      "Python",
      "Tkinter",
      "Functions",
      "Lists",
      "Exception Handling",
    ],

    features: [
      "Graphical desktop interface built with Tkinter",
      "Monthly and yearly ownership cost calculations",
      "Input validation for user-entered values",
      "Try/Except exception handling",
      "Reusable Python functions",
      "List-based data processing",
    ],

    github:
      "https://github.com/Critchh/car-ownership-cost-calculator",

    liveDemo: "",

    note:
      "Originally developed as my ITSE 1402 Python final project and expanded into a portfolio project.",

    image: "/car-cost-calculator.png",
  },

  {
    id: "portfolio-os",

    title: "Christian Valles OS",

    category: "REACT APPLICATION",

    status: "In Development",

    description:
      "An interactive operating-system-inspired portfolio designed to present my work, experience, skills, and professional information through a memorable web experience.",

    problem:
      "Traditional developer portfolios often present information through the same scrolling website format, making it difficult to create a memorable first impression.",

    solution:
      "I designed an interactive portfolio that behaves like a lightweight operating system, complete with a custom boot sequence, application windows, project browser, resume viewer, AI Chat assistant, and responsive interface.",

    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "Vite",
      "Vercel",
    ],

    features: [
      "Custom animated boot sequence",
      "Operating-system-inspired interface",
      "Interactive application windows",
      "Integrated project case studies",
      "Resume and contact applications",
      "Responsive mobile interface",
      "NFC-ready portfolio access",
      "Gemini API",
      "REST API Integration",
      "Vercel Serverless Functions",
      "Environment Variable / API Key Management",

    ],

    github: "",

    liveDemo: "",

    note:
      "You're currently using this project.",

    caseStudy: {
      currentVersion: "V2.0.0",
      summary:
        "CVOS evolved from an experimental desktop portfolio into a scroll-first professional platform that keeps the operating-system interface as a focused interaction layer.",
      versions: [
        {
          version: "V0.0",
          label: "FOUNDATION",
          title: "The first working system",
          description: "Established the core portfolio and deployment workflow before the interface became a full product experience.",
          features: ["Git-backed release baseline", "Vercel preview workflow", "Recoverable production deployment"],
        },
        {
          version: "V1.0.0",
          label: "OS EXPERIENCE",
          title: "Windows became the portfolio",
          description: "Introduced the recognizable CVOS identity through boot behavior, application windows, a desktop dock, and branded system interactions.",
          features: ["Interactive OS windows", "Resume and project applications", "Baybayin brand continuity"],
        },
        {
          version: "V2.0.0",
          label: "CURRENT",
          title: "A scrollable portfolio with an OS layer",
          description: "Reframed CVOS around fast comprehension, Lumen Edge surfaces, contextual windows, real services, and physical-digital portfolio access.",
          features: ["Scrollable bento homepage", "Gemini portfolio intelligence", "Neo domain-email contact delivery"],
        },
      ],
      currentFeatures: [
        "Scrollable recruiter- and client-friendly portfolio homepage",
        "Contextual project, resume, skills, contact, and AI windows",
        "Gemini-powered portfolio assistant through a protected serverless route",
        "SMTP contact delivery to the christian@cvos.dev domain mailbox",
        "Validation, rate limiting, and honeypot spam protection",
        "Supabase-backed approved client feedback",
        "NFC business-card and physical-to-digital product integration",
        "Responsive mobile dock with Lumen Edge tap feedback",
      ],
      architecture: [
        "React + Vite interface",
        "Vercel serverless services",
        "Gemini + Supabase integrations",
        "Neo SMTP domain delivery",
        "NFC physical access layer",
      ],
      snapshots: [
        {
          version: "V1.0.0",
          label: "OS-FIRST INTERFACE",
          image: "/cvos-v1-snapshot.png",
          description: "The previous CVOS homepage centered the operating-system metaphor in a bright dashboard layout before V2 shifted toward a scroll-first portfolio.",
        },
      ],
      deploymentNote:
        "V2 uses Vercel preview deployments for review before production. The contact system now routes validated in-frame messages through Neo SMTP to christian@cvos.dev, keeping mailbox credentials server-side.",
    },
  },

{
  id: "nfc-review-system",

  title: "NFC Tap System",

  category: "PHYSICAL + DIGITAL SYSTEM",

  status: "Active Project",

  description:
    "A programmable physical-to-digital system that opens review pages, websites, contact cards, and other business destinations with one tap.",

  overview:
    "The NFC Tap System combines programmed NFC hardware with business cards and acrylic displays to give customers, prospects, and professional contacts a fast way to open the right digital destination. Each product can launch a review page, website, digital contact card, portfolio, menu, or campaign-specific experience.",

  problem:
    "Sharing a business page or contact profile often depends on typing a URL, searching for the correct listing, exchanging paper details, or scanning a code. Every additional step adds friction and makes the interaction easier to abandon.",

  solution:
    "A programmed NFC chip is embedded in a business card or customer-facing acrylic stand. One phone tap opens the configured destination—such as contact information, a website, portfolio, review form, menu, or social profile—without requiring an app.",

  technologies: [
    "NFC",
    "Web URLs",
    "Mobile Devices",
    "Business Cards",
    "Acrylic Hardware",
  ],

  features: [
    "NFC-enabled metal business cards and acrylic stands",
    "Tap-to-open customer interaction",
    "Direct routing to websites and review pages",
    "Instant digital contact-card access",
    "Mobile-first customer experience",
    "Business-specific NFC configuration",
    "Physical and digital system integration",
  ],

  skills: [
    "NFC Technology",
    "Product Configuration",
    "Technical Troubleshooting",
    "Customer Experience Design",
    "Client Deployment",
    "Business Communication",
    "Product Demonstration",
    "Physical / Digital Integration",
  ],

  github: "",

  liveDemo: "",

  note:
    "A configurable physical-to-digital product system for sharing websites, contact information, reviews, menus, portfolios, and other business experiences through NFC technology.",

  image: "/nfc-review-products.png",
},
  
];

export default projects;
