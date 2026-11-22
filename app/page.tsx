import Link from "next/link";
import { Search, UserPlus, FileText, CheckCircle2, CalendarCheck, Calculator, Atom, Code2, Languages, FlaskConical, Dna, Star, Quote } from "lucide-react";
import TuitionCard from "@/components/TuitionCard";
import PricingSection from "@/components/PricingSection";
import { getJson } from "@/lib/server-api";
import type { TuitionPage } from "@/lib/types";

export const revalidate = 60;
type Stats = { students: number; tutors: number; tuitions: number; applications: number };

const steps = [
  { icon: UserPlus, t: "Create your account", d: "Join as a student or a tutor in under a minute." },
  { icon: Search, t: "Search and compare", d: "Filter by subject, class level, mode and monthly budget." },
  { icon: FileText, t: "Apply or post a batch", d: "Students apply with a schedule, tutors publish their batches." },
  { icon: CalendarCheck, t: "Start learning", d: "Tutors accept applications and sessions begin." },
];
const subjects = [
  { n: "Mathematics", i: Calculator }, { n: "Physics", i: Atom }, { n: "Programming", i: Code2 },
  { n: "IELTS", i: Languages }, { n: "Chemistry", i: FlaskConical }, { n: "Biology", i: Dna },
];
const reviews = [
  { n: "Sadia Islam", r: "HSC Student", t: "I found a Higher Math batch near my home in two minutes. My marks improved within a month." },
  { n: "Imran Hossain", r: "Math Tutor", t: "Posting my batch and managing applicants from one dashboard saves me hours every week." },
  { n: "Rafi Chowdhury", r: "University Student", t: "The 1-on-1 Python mentorship was exactly what I needed. Booking was simple and clear." },
];

export default async function Home() {
  const [latest, stats] = await Promise.all([getJson<TuitionPage>("/api/tuitions?limit=6", 60), getJson<Stats>("/api/stats", 60)]);
  const counters = [["Verified Tutors", stats?.tutors], ["Active Students", stats?.students], ["Live Tuitions", stats?.tuitions], ["Applications", stats?.applications]];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="fade-up badge badge-primary badge-soft mb-4">EdTech · Online and Home Tuition</span>
            <h1 className="fade-up-2 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Find Your Ideal <span className="text-primary">Tutor</span> or Mentorship Batch Today</h1>
            <p className="fade-up-3 mt-5 max-w-xl text-lg opacity-75">Search verified tutors by subject, class level, mode and monthly budget. Apply in a minute and track every application in real time.</p>
            <div className="fade-up-3 mt-8 flex flex-wrap gap-3">
              <Link href="/tuitions" className="btn btn-primary btn-lg">Browse Tuitions</Link>
              <Link href="/sign-up" className="btn btn-outline btn-lg">Become a Tutor</Link>
            </div>
            <form action="/tuitions" className="fade-up-3 mt-8 flex max-w-lg gap-2">
              <input name="search" placeholder="Search by subject or title (e.g. Physics)" className="input input-bordered w-full" />
              <button className="btn btn-neutral"><Search size={18} /></button>
            </form>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/mentorlagbe-hero/900/1000" alt="Students learning with a mentor" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl" />
            <div className="floaty absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-lg"><CheckCircle2 className="text-success" /><div><p className="text-sm font-semibold">Application accepted</p><p className="text-xs opacity-60">HSC Higher Math</p></div></div>
            <div className="floaty absolute -right-3 top-10 flex items-center gap-2 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-lg [animation-delay:1.5s]"><Star className="fill-secondary text-secondary" size={18} /><span className="text-sm font-semibold">4.9 tutor rating</span></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 text-center"><h2 className="section-title">Featured Tuitions</h2><p className="section-sub">The six newest approved tuitions from our tutors.</p></div>
        {latest?.items.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{latest.items.map((t) => <TuitionCard key={t._id} t={t} />)}</div>
        ) : <p className="rounded-2xl border border-dashed border-base-300 py-12 text-center opacity-60">No tuitions to show right now. Please check back soon.</p>}
        <div className="mt-10 text-center"><Link href="/tuitions" className="btn btn-primary btn-outline">View All Tuitions</Link></div>
      </section>

      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center"><h2 className="section-title">How MentorLagbe Works</h2><p className="section-sub">From first search to first class in four simple steps.</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.t} className="card h-full border border-base-300 bg-base-100"><div className="card-body items-center text-center">
                <div className="relative rounded-2xl bg-primary/10 p-4 text-primary"><s.icon size={28} /><span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-content">{i + 1}</span></div>
                <h3 className="mt-2 font-semibold">{s.t}</h3><p className="text-sm opacity-70">{s.d}</p>
              </div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 text-center"><h2 className="section-title">Top Subjects</h2><p className="section-sub">Popular categories students search for every day.</p></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {subjects.map((s) => (
            <Link key={s.n} href={`/tuitions?subject=${s.n}`} className="card h-full border border-base-300 bg-base-100 transition hover:-translate-y-1 hover:border-primary">
              <div className="card-body items-center gap-2 p-5 text-center"><s.i className="text-primary" size={30} /><span className="font-medium">{s.n}</span></div>
            </Link>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-3xl bg-neutral p-8 text-neutral-content lg:grid-cols-4">
          {counters.map(([l, v]) => <div key={l as string} className="text-center"><p className="text-3xl font-extrabold text-secondary">{v ?? "-"}{typeof v === "number" ? "+" : ""}</p><p className="mt-1 text-sm opacity-80">{l}</p></div>)}
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.n} className="card h-full border border-base-300 bg-base-100"><div className="card-body">
              <Quote className="text-primary/40" /><p className="flex-1 text-sm opacity-80">{r.t}</p>
              <div className="mt-2"><p className="font-semibold">{r.n}</p><p className="text-xs opacity-60">{r.r}</p></div>
            </div></div>
          ))}
        </div>
      </section>

      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center"><h2 className="section-title">Simple Pricing</h2><p className="section-sub">Start free. Upgrade to Pro with a secure Stripe checkout when you need more.</p></div>
          <PricingSection />
        </div>
      </section>
    </>
  );
}
