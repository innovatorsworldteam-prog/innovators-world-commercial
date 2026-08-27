export interface FaqJsonLd {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: { '@type': string; text: string };
  }>;
}

export function getBrandFaqJsonLd(): FaqJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Is Innovators World the same as Innovation World Alliance?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Innovators World is the organization behind Innovatorsworld.org. Innovation World Alliance is a separate organization and domain.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Innovation DNA assessment (IWDA)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Innovation DNA assessment measures six capabilities: Observe, Question, Imagine, Create, Test and Impact. It is a starting point for development rather than a permanent label.',
        },
      },
    ],
  };
}

export function getBrandFaqJsonLdString(): string {
  return JSON.stringify(getBrandFaqJsonLd());
}
