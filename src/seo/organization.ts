export interface OrganizationJsonLd {
  '@context': string;
  '@type': string;
  name: string;
  alternateName: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  foundingDate?: string;
}

export function getOrganizationJsonLd(): OrganizationJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Innovators World',
    alternateName: "Innovators World (with 's')",
    url: 'https://innovatorsworld.org',
    logo: 'https://innovatorsworld.org/logo.png',
    description: 'Innovators World helps learners develop innovation capability through Innovation DNA assessment, future career exploration and sustained practice with Kiivo & Leera.',
    sameAs: [
      'https://www.instagram.com/innovatorsworld',
      'https://www.linkedin.com/company/innovators-world-official/',
    ],
    foundingDate: '2024',
  };
}

export function getOrganizationJsonLdString(): string {
  return JSON.stringify(getOrganizationJsonLd());
}
