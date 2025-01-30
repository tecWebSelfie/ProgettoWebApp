/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["graphql", "pino"],
  },
};

export default nextConfig;
