import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "How It Works" };
const flow = [
  ["Students", ["Sign up as a student", "Search and filter approved tuitions", "Apply with your phone and preferred schedule", "Track Pending, Accepted or Rejected in your dashboard"]],
  ["Tutors", ["Sign up as a tutor", "Post a tuition batch with a banner image", "Wait for admin approval, then go live", "Accept or reject incoming applicants"]],
  ["Admins", ["Review every new tuition post", "Approve or reject listings", "Manage user roles", "Track Stripe revenue and transactions"]],
] as const;
export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center"><h1 className="section-title">About MentorLagbe</h1><p className="section-sub">Students and parents struggle to find verified tutors by subject, level, mode and budget. Tutors lack a clean place to show their batches. MentorLagbe solves both in one platform.</p></div>
      <div className="grid gap-6 md:grid-cols-3">
        {flow.map(([who, items]) => (
          <div key={who} className="card h-full border border-base-300 bg-base-100"><div className="card-body">
            <h2 className="card-title text-primary">{who}</h2>
            <ol className="mt-2 space-y-3">{items.map((t, i) => <li key={t} className="flex gap-3 text-sm"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-content">{i + 1}</span>{t}</li>)}</ol>
          </div></div>
        ))}
      </div>
      <div className="mt-12 text-center"><Link href="/sign-up" className="btn btn-primary btn-lg">Get Started</Link></div>
    </div>
  );
}
