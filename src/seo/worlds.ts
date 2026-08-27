/**
 * PR2: 15 Future Career Worlds — SEO Data Foundation
 * Branch: feat/seo-15-worlds
 * Base: 25e092784922a6c2c4a94414fe8044508ad32496 (PR1)
 * Reusable architecture: single source of truth, not 15 independent apps
 * Adapt to actual /worlds slugs if they differ — do not duplicate routes
 */

export interface WorldSEO {
  slug: string;
  name: string;
  tagline: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  keywords: string[];
  intro: string;
  whoEnjoys: string;
  problemsExplored: string;
  capabilities: string[];
  futureCareers: string[];
  nextSteps: string[];
  relatedWorldSlugs: string[];
  breadcrumb: { name: string; url: string }[];
}

const BASE = 'https://innovatorsworld.org';
const OG_BASE = `${BASE}/og/worlds`;

export const WORLD_SLUGS = [
  'technology','science','creativity','business','social',
  'environment','health','education','exploration','adventure',
  'craft','media','law','service','design'
] as const;

export type WorldSlug = typeof WORLD_SLUGS[number];

export const WORLDS_SEO: Record<WorldSlug, WorldSEO> = {
  technology: {
    slug: 'technology',
    name: 'Technology',
    tagline: 'Build tools that expand human capability.',
    title: `Technology World | Build Future Tech, AI & Systems | Innovatorsworld.org`,
    description: `Explore Technology World — AI, robotics, software, systems. For builders who love to tinker, code, prototype. Discover problems, capabilities, future careers and next steps with Kiivo & Leera.`,
    canonical: `${BASE}/worlds/technology`,
    ogImage: `${OG_BASE}/technology.png`,
    keywords: ['technology careers','future tech','AI careers','software','robotics','Innovation DNA'],
    intro: 'Technology World is where curiosity becomes capability. You explore how things work, break them to understand them, and rebuild them better — from apps to robots to AI systems that help humans.',
    whoEnjoys: 'Students who love to tinker, debug, prototype, automate, and ask "can we build it better?" — whether with code, hardware, or no-code tools.',
    problemsExplored: 'How might we make learning faster, make cities smarter, make health accessible, make creativity scalable, and make technology more human-centered?',
    capabilities: ['Observe','Question','Create','Test'],
    futureCareers: ['AI Engineer','Robotics Engineer','Product Manager','UX Engineer','Cybersecurity Analyst','AR/VR Creator','Data Scientist','IoT Systems Designer','Automation Specialist','Game Developer','Cloud Architect','Human-AI Interaction Designer'],
    nextSteps: ['Take Innovation DNA assessment to map your Observe/Create strengths','Try 7-day build challenge with Kiivo','Explore related worlds: Science, Design, Creativity','Browse 12 future careers in Technology'],
    relatedWorldSlugs: ['science','design','creativity','business'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Technology',url:'/worlds/technology'}]
  },
  science: {
    slug: 'science',
    name: 'Science',
    tagline: 'Ask why. Test how. Discover what is next.',
    title: `Science World | Future Science Careers & Research | Innovatorsworld.org`,
    description: `Science World — physics, biology, chemistry, space. For question-askers and experiment-makers. Explore problems, capabilities and future careers in science with Innovation DNA.`,
    canonical: `${BASE}/worlds/science`,
    ogImage: `${OG_BASE}/science.png`,
    keywords: ['science careers','research careers','space','biotech'],
    intro: 'Science World is for those who stare at the sky, the microscope, or the data and ask why. You design experiments, track patterns, and turn questions into discoveries.',
    whoEnjoys: 'Curious minds who love experiments, data, labs, fieldwork, and explaining the world through evidence.',
    problemsExplored: 'How might we cure diseases, understand the universe, grow food sustainably, clean energy, and make science accessible to everyone?',
    capabilities: ['Observe','Question','Test','Impact'],
    futureCareers: ['Research Scientist','Astrobiologist','Genetic Engineer','Climate Scientist','Neuroscientist','Materials Scientist','Bioinformatician','Quantum Researcher','Science Communicator','Lab Automation Specialist','Environmental Analyst','Space Systems Engineer'],
    nextSteps: ['Take IWDA to map your Question/Test strengths','Try observation journal with Leera','Explore Technology, Environment, Health'],
    relatedWorldSlugs: ['technology','environment','health','exploration'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Science',url:'/worlds/science'}]
  },
  creativity: {
    slug: 'creativity',
    name: 'Creativity',
    tagline: 'Imagine what does not exist yet.',
    title: `Creativity World | Imagination, Ideas & Original Work | Innovatorsworld.org`,
    description: `Creativity World — ideas, storytelling, original work. For imaginers who see connections others miss. Explore capabilities, problems and future creative careers.`,
    canonical: `${BASE}/worlds/creativity`,
    ogImage: `${OG_BASE}/creativity.png`,
    keywords: ['creative careers','future creativity','storytelling'],
    intro: 'Creativity World starts with imagination. You connect dots, remix ideas, and make something original that did not exist before — a story, a product, a movement.',
    whoEnjoys: 'Students who love to doodle ideas, write, remix, prototype concepts, and ask "what if?"',
    problemsExplored: 'How might we make ideas more human, make learning playful, make brands meaningful, and make the future more imaginative?',
    capabilities: ['Imagine','Create','Question','Impact'],
    futureCareers: ['Concept Designer','Storyteller','Creative Director','World Builder','Experience Designer','Innovation Strategist','Creative Technologist','Content Creator','Idea Curator','Design Thinker','Imagination Coach','Creative Entrepreneur'],
    nextSteps: ['Map your Imagine/Create traits with IWDA','Start 365-day idea journal','Explore Media, Design, Business'],
    relatedWorldSlugs: ['media','design','business','technology'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Creativity',url:'/worlds/creativity'}]
  },
  business: {
    slug: 'business',
    name: 'Business',
    tagline: 'Turn ideas into systems that serve people.',
    title: `Business World | Entrepreneurship & Future Business Careers | Innovatorsworld.org`,
    description: `Business World — entrepreneurship, systems, value creation. For builders who love to make ideas work in the real world. Explore future business careers with IWDA.`,
    canonical: `${BASE}/worlds/business`,
    ogImage: `${OG_BASE}/business.png`,
    keywords: ['business careers','entrepreneurship','future business'],
    intro: 'Business World is about turning a useful idea into something people can use, sustain, and grow — with empathy, ethics, and experimentation.',
    whoEnjoys: 'Students who love to organize, pitch, test pricing, interview users, and build small ventures.',
    problemsExplored: 'How might we create value, serve customers better, make ventures sustainable, and make business more human?',
    capabilities: ['Question','Create','Test','Impact'],
    futureCareers: ['Entrepreneur','Product Manager','Venture Builder','Business Designer','Market Researcher','Growth Strategist','Social Entrepreneur','Operations Designer','Business Analyst','Startup Founder','Innovation Manager','E-commerce Architect'],
    nextSteps: ['Take IWDA for Test/Impact mapping','Interview 5 users with Kiivo','Explore Technology, Service, Law'],
    relatedWorldSlugs: ['technology','service','law','creativity'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Business',url:'/worlds/business'}]
  },
  social: {
    slug: 'social',
    name: 'Social Impact',
    tagline: 'Design for dignity, equity and change.',
    title: `Social Impact World | Purpose-Driven Future Careers | Innovatorsworld.org`,
    description: `Social Impact World — equity, community, systems change. For changemakers who design with empathy. Explore problems, capabilities and future impact careers.`,
    canonical: `${BASE}/worlds/social`,
    ogImage: `${OG_BASE}/social.png`,
    keywords: ['social impact careers','changemaker','NGO careers'],
    intro: 'Social Impact World is for those who see inequity and ask how might we redesign systems with dignity and participation.',
    whoEnjoys: 'Students who love community work, listening deeply, organizing, and building inclusive solutions.',
    problemsExplored: 'How might we make education equitable, health accessible, opportunities fair, and communities more resilient?',
    capabilities: ['Observe','Question','Impact','Test'],
    futureCareers: ['Social Innovator','Community Organizer','Impact Designer','Nonprofit Leader','Policy Designer','Humanitarian Technologist','Inclusion Strategist','Development Researcher','Social Entrepreneur','Advocacy Campaigner','Systems Change Facilitator','Impact Analyst'],
    nextSteps: ['Map Observe/Impact strengths','Run empathy interviews','Explore Service, Education, Law'],
    relatedWorldSlugs: ['service','education','law','environment'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Social Impact',url:'/worlds/social'}]
  },
  environment: {
    slug: 'environment',
    name: 'Environment',
    tagline: 'Build a future where planet and people thrive.',
    title: `Environment World | Sustainability & Climate Careers | Innovatorsworld.org`,
    description: `Environment World — climate, biodiversity, sustainability. For planet builders. Explore future green careers, capabilities and next steps.`,
    canonical: `${BASE}/worlds/environment`,
    ogImage: `${OG_BASE}/environment.png`,
    keywords: ['environment careers','climate careers','sustainability'],
    intro: 'Environment World focuses on designing with nature — restoring ecosystems, circular systems, and regenerative futures.',
    whoEnjoys: 'Students who love nature, fieldwork, mapping, conservation, and building sustainable systems.',
    problemsExplored: 'How might we restore biodiversity, decarbonize, reduce waste, and make sustainability practical?',
    capabilities: ['Observe','Create','Test','Impact'],
    futureCareers: ['Sustainability Designer','Climate Analyst','Conservation Technologist','Circular Economy Designer','Renewable Energy Engineer','Biodiversity Researcher','Environmental Data Scientist','Regenerative Agriculture Designer','Climate Communicator','Eco-Entrepreneur','Green Building Designer','Ocean Conservationist'],
    nextSteps: ['Observe local ecosystem with Leera','Explore Science, Exploration, Technology'],
    relatedWorldSlugs: ['science','exploration','technology','social'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Environment',url:'/worlds/environment'}]
  },
  health: {
    slug: 'health',
    name: 'Health',
    tagline: 'Design for wellbeing, care and human flourishing.',
    title: `Health World | Future Health & Wellbeing Careers | Innovatorsworld.org`,
    description: `Health World — wellbeing, care, human flourishing. For carers and system designers. Explore future health careers and capabilities.`,
    canonical: `${BASE}/worlds/health`,
    ogImage: `${OG_BASE}/health.png`,
    keywords: ['health careers','future health','wellbeing'],
    intro: 'Health World is about caring for bodies, minds, and communities — designing care that is accessible, empathetic, and evidence-based.',
    whoEnjoys: 'Students who love biology, helping others, research, and designing humane care.',
    problemsExplored: 'How might we make care accessible, mental health supported, prevention practical, and wellbeing everyday?',
    capabilities: ['Observe','Question','Impact','Test'],
    futureCareers: ['Health Innovator','Biomedical Designer','Mental Health Technologist','Public Health Designer','Care Experience Designer','Genomics Counselor','Nutrition Scientist','Health Data Analyst','Wellbeing Coach','Assistive Tech Designer','Global Health Researcher','Digital Health Product Manager'],
    nextSteps: ['Map Observe/Impact via IWDA','Explore Science, Technology, Service'],
    relatedWorldSlugs: ['science','technology','service','education'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Health',url:'/worlds/health'}]
  },
  education: {
    slug: 'education',
    name: 'Education',
    tagline: 'Design learning that awakens curiosity.',
    title: `Education World | Future Learning & Teaching Careers | Innovatorsworld.org`,
    description: `Education World — learning design, teaching, curiosity. For learning architects. Explore future education careers and next steps with Kiivo & Leera.`,
    canonical: `${BASE}/worlds/education`,
    ogImage: `${OG_BASE}/education.png`,
    keywords: ['education careers','learning design','teaching future'],
    intro: 'Education World designs experiences that awaken curiosity, not just deliver content — with stories, challenges, and practice.',
    whoEnjoys: 'Students who love explaining, mentoring, designing games, and making learning joyful.',
    problemsExplored: 'How might we make learning active, personalized, playful, and lifelong?',
    capabilities: ['Question','Imagine','Create','Impact'],
    futureCareers: ['Learning Designer','Curriculum Innovator','Education Technologist','Child Development Researcher','Learning Experience Designer','Education Entrepreneur','Assessment Designer','Tutor Entrepreneur','Community Educator','Learning Scientist','Play Designer','Mentorship Architect'],
    nextSteps: ['Explore Creativity, Social Impact, Media','Take IWDA for Imagine/Impact'],
    relatedWorldSlugs: ['creativity','social','media','service'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Education',url:'/worlds/education'}]
  },
  exploration: {
    slug: 'exploration',
    name: 'Exploration',
    tagline: 'Go beyond maps — discover new frontiers.',
    title: `Exploration World | Space, Oceans & Discovery Careers | Innovatorsworld.org`,
    description: `Exploration World — space, oceans, frontiers. For discoverers who chart unknown territories. Explore future exploration careers.`,
    canonical: `${BASE}/worlds/exploration`,
    ogImage: `${OG_BASE}/exploration.png`,
    keywords: ['exploration careers','space careers','ocean exploration'],
    intro: 'Exploration World is about going beyond the known — oceans, space, data, cultures — with curiosity and responsibility.',
    whoEnjoys: 'Students who love maps, expeditions, field notes, and documenting discoveries.',
    problemsExplored: 'How might we explore responsibly, share discoveries, and make frontiers accessible?',
    capabilities: ['Observe','Question','Imagine','Test'],
    futureCareers: ['Explorer','Space Mission Designer','Oceanographer','Expedition Leader','Cartographer','Discovery Researcher','Field Scientist','Exploration Technologist','Documentary Explorer','Geospatial Analyst','Astrogeologist','Deep Sea Researcher'],
    nextSteps: ['Start field journal with Kiivo & Leera','Explore Science, Environment, Adventure'],
    relatedWorldSlugs: ['science','environment','adventure','technology'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Exploration',url:'/worlds/exploration'}]
  },
  adventure: {
    slug: 'adventure',
    name: 'Adventure',
    tagline: 'Design challenges that build courage.',
    title: `Adventure World | Challenge, Courage & Leadership Careers | Innovatorsworld.org`,
    description: `Adventure World — challenge design, courage, leadership. For challenge designers. Explore future adventure careers and capabilities.`,
    canonical: `${BASE}/worlds/adventure`,
    ogImage: `${OG_BASE}/adventure.png`,
    keywords: ['adventure careers','leadership','challenge design'],
    intro: 'Adventure World designs meaningful challenges that build courage, teamwork, and resilience — from outdoor to inner journeys.',
    whoEnjoys: 'Students who love challenges, movement, leadership, and guiding others through difficulty.',
    problemsExplored: 'How might we make courage teachable, teamwork joyful, and challenge safe and meaningful?',
    capabilities: ['Test','Create','Impact','Observe'],
    futureCareers: ['Adventure Designer','Expedition Guide','Leadership Coach','Challenge Course Designer','Outdoor Educator','Resilience Trainer','Team Facilitator','Adventure Entrepreneur','Safety Systems Designer','Movement Coach','Adventure Filmmaker','Experience Risk Manager'],
    nextSteps: ['Design micro-adventure','Explore Exploration, Health, Education'],
    relatedWorldSlugs: ['exploration','health','education','service'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Adventure',url:'/worlds/adventure'}]
  },
  craft: {
    slug: 'craft',
    name: 'Craft',
    tagline: 'Make with hands, heart and heritage.',
    title: `Craft World | Making, Materials & Heritage Futures | Innovatorsworld.org`,
    description: `Craft World — making, materials, heritage. For makers who honor hands and heritage while building future. Explore craft careers.`,
    canonical: `${BASE}/worlds/craft`,
    ogImage: `${OG_BASE}/craft.png`,
    keywords: ['craft careers','maker','handmade future'],
    intro: 'Craft World honors making with hands, tools, and heritage — blending traditional knowledge with future materials and markets.',
    whoEnjoys: 'Students who love making, repairing, weaving, building, and learning from artisans.',
    problemsExplored: 'How might we keep heritage alive, make craft sustainable, and connect makers to new markets?',
    capabilities: ['Observe','Create','Test','Impact'],
    futureCareers: ['Craft Innovator','Materials Designer','Artisan Entrepreneur','Heritage Technologist','Maker Educator','Sustainable Product Designer','Restoration Specialist','Tool Designer','Craft Systems Designer','Textile Innovator','Furniture Designer','Ceramics Innovator'],
    nextSteps: ['Apprentice with local maker','Explore Design, Service, Environment'],
    relatedWorldSlugs: ['design','service','environment','creativity'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Craft',url:'/worlds/craft'}]
  },
  media: {
    slug: 'media',
    name: 'Media',
    tagline: 'Tell stories that move people to act.',
    title: `Media World | Storytelling, Film & Future Media Careers | Innovatorsworld.org`,
    description: `Media World — storytelling, film, future media. For storytellers who move people. Explore media careers, capabilities and next steps.`,
    canonical: `${BASE}/worlds/media`,
    ogImage: `${OG_BASE}/media.png`,
    keywords: ['media careers','storytelling','film careers'],
    intro: 'Media World shapes how stories travel — film, audio, comics, interactive — to inform, inspire, and invite action.',
    whoEnjoys: 'Students who love filming, editing, podcasting, comics, and building audiences.',
    problemsExplored: 'How might we make truth engaging, stories inclusive, and media more responsible?',
    capabilities: ['Observe','Imagine','Create','Impact'],
    futureCareers: ['Filmmaker','Podcaster','Media Innovator','Documentary Producer','Interactive Storyteller','Journalist','Media Literacy Designer','Content Strategist','Animation Director','Audio Designer','Community Media Founder','Immersive Media Creator'],
    nextSteps: ['Create 60-sec story with Kiivo & Leera','Explore Creativity, Education, Business'],
    relatedWorldSlugs: ['creativity','education','business','design'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Media',url:'/worlds/media'}]
  },
  law: {
    slug: 'law',
    name: 'Law',
    tagline: 'Design justice, rights and fair systems.',
    title: `Law World | Justice, Rights & Future Law Careers | Innovatorsworld.org`,
    description: `Law World — justice, rights, fair systems. For justice designers. Explore future law careers, capabilities and next steps.`,
    canonical: `${BASE}/worlds/law`,
    ogImage: `${OG_BASE}/law.png`,
    keywords: ['law careers','justice','future law'],
    intro: 'Law World is about designing fair systems — understanding rights, negotiating, and building structures for justice.',
    whoEnjoys: 'Students who love debate, research, fairness, and designing rules that protect people.',
    problemsExplored: 'How might we make justice accessible, rights understandable, and systems more equitable?',
    capabilities: ['Question','Observe','Impact','Test'],
    futureCareers: ['Justice Designer','Legal Innovator','Rights Researcher','Policy Analyst','Mediation Designer','Constitutional Researcher','Tech Policy Designer','Human Rights Advocate','Legal Literacy Educator','Cyber Law Specialist','Environmental Law Designer','Access to Justice Innovator'],
    nextSteps: ['Map Question/Impact via IWDA','Explore Social Impact, Business, Service'],
    relatedWorldSlugs: ['social','business','service','education'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Law',url:'/worlds/law'}]
  },
  service: {
    slug: 'service',
    name: 'Service',
    tagline: 'Serve with empathy, design with care.',
    title: `Service World | Empathy, Care & Service Design Careers | Innovatorsworld.org`,
    description: `Service World — empathy, care, service design. For servers who design with care. Explore future service careers.`,
    canonical: `${BASE}/worlds/service`,
    ogImage: `${OG_BASE}/service.png`,
    keywords: ['service careers','service design','hospitality future'],
    intro: 'Service World centers empathy — listening, anticipating needs, and designing services that feel human.',
    whoEnjoys: 'Students who love hosting, helping, organizing, and making experiences smooth and kind.',
    problemsExplored: 'How might we make service more human, inclusive, and delightful?',
    capabilities: ['Observe','Impact','Create','Test'],
    futureCareers: ['Service Designer','Hospitality Innovator','Care Coordinator','Customer Experience Designer','Community Host','Service Systems Manager','Inclusion Designer','Volunteer Experience Designer','Service Entrepreneur','Frontline Innovation Coach','Service Researcher','Experience Strategist'],
    nextSteps: ['Shadow service experience','Explore Social Impact, Health, Business'],
    relatedWorldSlugs: ['social','health','business','education'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Service',url:'/worlds/service'}]
  },
  design: {
    slug: 'design',
    name: 'Design',
    tagline: 'Design futures that people want to live in.',
    title: `Design World | Future Design Careers & Systems | Innovatorsworld.org`,
    description: `Design World — human-centered design, systems, futures. For designers who shape desirable futures. Explore design careers and capabilities.`,
    canonical: `${BASE}/worlds/design`,
    ogImage: `${OG_BASE}/design.png`,
    keywords: ['design careers','future design','systems design'],
    intro: 'Design World asks: what future do we want to live in, and how might we prototype it today — with people, planet, and possibility in mind?',
    whoEnjoys: 'Students who love sketching, prototyping, user interviews, and iterating.',
    problemsExplored: 'How might we make futures desirable, prototypes testable, and systems more humane?',
    capabilities: ['Observe','Imagine','Create','Test'],
    futureCareers: ['Human-Centered Designer','Systems Designer','UX Designer','Speculative Designer','Service Designer','Product Designer','Design Researcher','Interaction Designer','Design Strategist','Design Educator','Design Technologist','Futures Designer'],
    nextSteps: ['Take IWDA for Create/Test','Prototype with Kiivo','Explore Technology, Creativity, Craft'],
    relatedWorldSlugs: ['technology','creativity','craft','business'],
    breadcrumb: [{name:'Worlds',url:'/worlds'},{name:'Design',url:'/worlds/design'}]
  }
};

export function getWorldSEO(slug: string): WorldSEO | null {
  return (WORLDS_SEO as any)[slug] || null;
}
export function getAllWorldsSEO(): WorldSEO[] {
  return WORLD_SLUGS.map(s => WORLDS_SEO[s]);
}
export function getWorldJsonLd(world: WorldSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: world.name,
    description: world.description,
    url: world.canonical,
    isPartOf: { '@type': 'Collection', name: '15 Future Career Worlds', url: `${BASE}/worlds` },
    about: world.futureCareers,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: world.breadcrumb.map((b, i) => ({
        '@type': 'ListItem',
        position: i+1,
        name: b.name,
        item: `${BASE}${b.url}`
      }))
    }
  };
}
export function getWorldsListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '15 Future Career Worlds',
    description: 'Explore 15 future career worlds — Technology, Science, Creativity, Business, Social Impact, Environment, Health, Education, Exploration, Adventure, Craft, Media, Law, Service, Design. Find your world with Innovation DNA assessment and 365-day practice with Kiivo & Leera.',
    url: `${BASE}/worlds`,
    hasPart: getAllWorldsSEO().map(w => ({ '@type': 'CollectionPage', name: w.name, url: w.canonical }))
  };
}
