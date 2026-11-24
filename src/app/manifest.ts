import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StackPulse - Daily Tech News for Students',
    short_name: 'StackPulse',
    description: 'Stay current with AI, tech, and startup news. AI summaries with "why it matters for students" insights.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0D12',
    theme_color: '#6366F1',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
    categories: ['education', 'news', 'technology'],
    screenshots: [],
    shortcuts: [
      {
        name: 'Daily Digest',
        short_name: 'Digest',
        description: 'View today\'s top 5 stories',
        url: '/digest',
      },
      {
        name: 'Trending Skills',
        short_name: 'Trends',
        description: 'See this week\'s top skills and roles',
        url: '/trends',
      },
    ],
  };
}