export const mockSeoAuditData = {
  overallScore: 86,
  pageLoadTime: 1.7,
  mobileCompatibility: 92,
  thematicReports: [
    {
      title: 'Crawlability',
      score: 96,
      description: 'Your site is easily crawlable with minor improvements.',
    },
    {
      title: 'HTTPS & Security',
      score: 98,
      description: 'Your site is secure with SSL correctly implemented.',
    },
    {
      title: 'Core Web Vitals',
      score: 62,
      description: 'Some optimizations required for better loading experience.',
    },
    {
      title: 'Mobile Optimization',
      score: 89,
      description: 'Minor viewport and text-size issues on certain pages.',
    },
    {
      title: 'Performance & Speed',
      score: 81,
      description: 'Images could be better optimized for faster load times.',
    },
    {
      title: 'Meta & On-Page SEO',
      score: 77,
      description: 'Improvements needed in title tags and meta descriptions.',
    },
    {
      title: 'Markup & Structured Data',
      score: 100,
      description: 'Structured data perfectly implemented.',
    },
    {
      title: 'Internal Linking',
      score: 82,
      description:
        'Some orphaned pages detected, internal linking can improve.',
    },
  ],
  recommendations: [
    {
      title: 'Optimize Images',
      description: 'Compress and resize images to improve loading speed.',
      severity: 'High',
    },
    {
      title: 'Adjust Title Tag Lengths',
      description: 'Ensure title tags are within 60 characters.',
      severity: 'Medium',
    },
    {
      title: 'Fix Mobile Viewport Issues',
      description: 'Correct viewport configurations for better mobile UX.',
      severity: 'Medium',
    },
    {
      title: 'Improve Internal Linking',
      description:
        'Link orphaned pages to the site navigation or related pages.',
      severity: 'Low',
    },
  ] as const,
};
