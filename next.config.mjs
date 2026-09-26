/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 65, 75, 90, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
    ],
  },
};
export default nextConfig;
