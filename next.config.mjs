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
};

export default nextConfig;
