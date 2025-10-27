import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: {
            ssr: true,
            displayName: true,
        },
    },
    images: {
        domains: ["coin-images.coingecko.com"],
    },
};

export default nextConfig;
