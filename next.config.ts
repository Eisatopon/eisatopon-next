import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Πιάνει τη δομή των παλιών άρθρων του Blogger (π.χ. /2017/02/blog-post_39)
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        // Μεταφέρει τον χρήστη στην αρχική σελίδα του νέου site
        destination: '/',
        // Δηλώνει μόνιμη ανακατεύθυνση (301) για τη Google
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
