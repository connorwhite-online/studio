/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'bdvkplyefikbvwvrumga.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/media/**',
          },
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: '/**',
          },
        ],
      },
    // Add caching headers for video files
    async headers() {
      return [
        {
          source: '/media/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable', // 1 year cache
            },
          ],
        },
      ];
    },
};

export default nextConfig;
