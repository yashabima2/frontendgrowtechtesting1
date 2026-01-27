/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jleoptqwzrkqtklhmpdc.supabase.co',
      },
    ],
  },
}

export default nextConfig
