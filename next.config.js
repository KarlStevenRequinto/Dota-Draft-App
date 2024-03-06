/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://api.example.com/:path*",
            },
        ];
    },
    images: {
        domains: ["cdn.cloudflare.steamstatic.com"], // Add your image domain here
    },
    output: 'export',
};

module.exports = nextConfig;
