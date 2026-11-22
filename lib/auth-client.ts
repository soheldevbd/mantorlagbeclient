import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// No baseURL needed in the browser: requests go to /api/auth on this domain and Next.js rewrites them to the Express server.
export const authClient = createAuthClient({
  baseURL: typeof window === "undefined" ? "http://localhost:3000" : window.location.origin,
  plugins: [inferAdditionalFields({ user: { role: { type: "string" }, plan: { type: "string", input: false }, phone: { type: "string", required: false }, bio: { type: "string", required: false } } })],
});
