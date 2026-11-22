import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import TuitionCard from "@/components/TuitionCard";
import { getJson } from "@/lib/server-api";
import { SUBJECTS, LEVELS, MODES } from "@/lib/constants";
import type { TuitionPage } from "@/lib/types";

export const metadata: Metadata = { title: "Browse Tuitions" };
type SP = Record<string, string | undefined>;

const qs = (sp: SP, page: number) => {
  const p = new URLSearchParams();
  for (const k of ["search", "subject", "classLevel", "mode"]) if (sp[k]) p.set(k, sp[k]!);
  p.set("page", String(page));
  return p.toString();
};

export default async function Tuitions({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1") || 1);
  // Search, filter and pagination all run on the server (MongoDB regex + skip/limit)
  const data = await getJson<TuitionPage>(`/api/tuitions?${qs(sp, page)}&limit=9`);
  const hasFilter = !!(sp.search || sp.subject || sp.classLevel || sp.mode);
  const pages = data?.pages || 1;
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8"><h1 className="section-title">Browse Tuitions</h1><p className="mt-2 opacity-70">{data ? `${data.total} approved tuition${data.total === 1 ? "" : "s"} found` : "Find the right tutor for you"}</p></div>

      <form className="mb-10 grid gap-3 rounded-2xl border border-base-300 bg-base-200 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <label className="input input-bordered flex items-center gap-2"><Search size={16} className="opacity-60" /><input name="search" defaultValue={sp.search} placeholder="Search title or subject" className="grow" /></label>
        <select name="subject" defaultValue={sp.subject || ""} className="select select-bordered"><option value="">All subjects</option>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
        <select name="classLevel" defaultValue={sp.classLevel || ""} className="select select-bordered"><option value="">All levels</option>{LEVELS.map((s) => <option key={s}>{s}</option>)}</select>
        <select name="mode" defaultValue={sp.mode || ""} className="select select-bordered"><option value="">Online / Offline</option>{MODES.map((s) => <option key={s}>{s}</option>)}</select>
        <div className="flex gap-2"><button className="btn btn-primary flex-1">Search</button>{hasFilter && <Link href="/tuitions" className="btn btn-ghost">Reset</Link>}</div>
      </form>

      {!data ? (
        <p className="rounded-2xl border border-dashed border-base-300 py-16 text-center opacity-70">Could not load tuitions right now. Please try again shortly.</p>
      ) : data.items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-base-300 py-16 text-center opacity-70">No tuitions match your search. Try different filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.items.map((t) => <TuitionCard key={t._id} t={t} />)}</div>
      )}

      {pages > 1 && (
        <div className="join mt-12 flex justify-center">
          <Link aria-disabled={page <= 1} className={`join-item btn ${page <= 1 ? "btn-disabled" : ""}`} href={`/tuitions?${qs(sp, page - 1)}`}>Previous</Link>
          {nums.map((n, i) => (
            <span key={n} className="contents">
              {i > 0 && nums[i - 1] !== n - 1 && <span className="join-item btn btn-disabled">…</span>}
              <Link className={`join-item btn ${n === page ? "btn-primary" : ""}`} href={`/tuitions?${qs(sp, n)}`}>{n}</Link>
            </span>
          ))}
          <Link aria-disabled={page >= pages} className={`join-item btn ${page >= pages ? "btn-disabled" : ""}`} href={`/tuitions?${qs(sp, page + 1)}`}>Next</Link>
        </div>
      )}
    </div>
  );
}
