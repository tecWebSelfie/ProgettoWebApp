/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["graphql"],
  },
};

export default nextConfig;
