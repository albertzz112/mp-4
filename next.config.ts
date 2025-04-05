import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ["nrs.harvard.edu", "ids.lib.harvard.edu"], // add both just in case
    },
};

export default nextConfig;
