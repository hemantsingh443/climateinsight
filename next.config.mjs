/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.finextra.com',  // Add the specific domain from your news API
      'newsapi.org',
      'images.unsplash.com',
      // Add any other domains you might use for images
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Be cautious with this - only use in development
      }
    ]
  },
  // Other Next.js configurations can go here
};

export default nextConfig;
