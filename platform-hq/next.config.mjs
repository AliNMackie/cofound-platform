/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Docker build
  async rewrites() {
    return [
      // Security Note: The Authorization: Bearer <token> header from the client 
      // is automatically passed through these rewrites by Next.js.
      // Ensure the backend services are configured to validate this token.
      {
        source: '/api/proxy/legal/:path*',
        destination: `${process.env.SENTINEL_1_CLOUD_RUN_URL || 'https://[YOUR_SENTINEL_1_CLOUD_RUN_URL]'}/:path*`,
      },
      {
        source: '/api/proxy/finance/:path*',
        destination: `${process.env.INVOICE_AGENT_URL || 'https://[YOUR_INVOICE_AGENT_URL]'}/:path*`,
      },
      {
        source: '/api/proxy/travel/:path*',
        destination: `${process.env.TRAVEL_AGENT_URL || 'https://[YOUR_TRAVEL_AGENT_URL]'}/:path*`,
      },
      {
        source: '/api/proxy/audit/:path*',
        destination: `${process.env.AUDIT_AGENT_URL || 'https://[YOUR_AUDIT_AGENT_URL]'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
