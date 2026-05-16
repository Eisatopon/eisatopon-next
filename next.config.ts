import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug*',
        destination: 'https://eisatopon.blogspot.com/:year/:month/:slug*',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);