import type { NextConfig } from "next";

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const nextConfig: NextConfig = {
  // BetterAuth runs on the Express server. Proxying it keeps the session cookie first-party
  // on the client domain, so reloads never lose the login (no third-party cookie problems).
  async rewrites() {
    return [{ source: "/api/auth/:path*", destination: `${API}/api/auth/:path*` }];
  },
};
export default nextConfig;
