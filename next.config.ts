import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }
    return config;
  },
};

export default nextConfig;
