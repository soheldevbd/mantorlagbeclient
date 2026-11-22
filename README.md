# MentorLagbe Client

Next.js (App Router, TypeScript) frontend for **MentorLagbe**, a smart tuition and mentorship platform.

- **Purpose:** students find and apply to approved tuitions, tutors post batches, admins moderate and track Stripe revenue
- **Live URL:** `<add your client link>`
- **Server repo:** `<add link>`

## Admin and test credentials

Same accounts as the server seed (default password `Mentor@123`): `admin@mentorlagbe.com`, `tutor@mentorlagbe.com`, `student@mentorlagbe.com`.

## Key features

- Home: hero, 6 latest approved tuitions (equal-height cards), pricing, how it works, top subjects, stats and testimonials
- Browse Tuitions: server-side search, filters (subject, class level, mode) and pagination
- Tuition Details with role-restricted Apply form (students only), duplicate protection, bookmark button
- Role-based dashboards (student, tutor, admin) with collapsible sidebar, profile summary, stat cards
- Tutor: post, edit, close/open, delete tuitions, manage applicants
- Admin: approve/reject tuitions, manage user roles, view Stripe transactions
- Stripe Checkout for Pro plans with success and cancel pages
- Image upload (ImgBB via server) on Update Profile and Post a Tuition
- Dark and light theme toggle, loading skeletons, custom 404 and error pages, sonner toasts, X logo in the footer
- Reload-safe auth: BetterAuth is proxied through Next.js rewrites, so the session cookie is first-party and private routes stay open after a refresh

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev     # http://localhost:3000
```

`NEXT_PUBLIC_API_URL` and `API_URL` both point to the Express server. Start the server first.

### Deploy (Vercel)

Add `NEXT_PUBLIC_API_URL` and `API_URL` (your server URL) as environment variables, then deploy. On the server set `CLIENT_URL` to this site's URL.

## npm packages

next, react, react-dom, better-auth, sonner, lucide-react, tailwindcss, @tailwindcss/postcss, daisyui, typescript
