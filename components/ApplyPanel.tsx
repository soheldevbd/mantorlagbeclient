"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import type { Me } from "@/lib/types";

export default function ApplyPanel({ tuitionId }: { tuitionId: string }) {
  const { data: session, isPending } = authClient.useSession();
  const user: any = session?.user;
  const [saved, setSaved] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ studentPhone: "", preferredSchedule: "", studentNote: "" });

  useEffect(() => {
    if (user?.role === "student") api<Me>("/api/users/me").then((m) => setSaved(m.bookmarks.includes(tuitionId))).catch(() => {});
  }, [user?.role, tuitionId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[0-9+\-\s]{7,20}$/.test(f.studentPhone)) return toast.error("Enter a valid phone number");
    if (!f.preferredSchedule.trim()) return toast.error("Preferred schedule is required");
    setBusy(true);
    try { await api("/api/applications", { method: "POST", json: { tuitionId, ...f } }); setDone(true); toast.success("Application submitted"); }
    catch (err: any) { toast.error(err.message); }
    finally { setBusy(false); }
  }
  async function toggleSave() {
    try { const r = await api<{ bookmarked: boolean }>(`/api/bookmarks/${tuitionId}`, { method: "POST" }); setSaved(r.bookmarked); toast.success(r.bookmarked ? "Saved to your list" : "Removed from saved"); }
    catch (err: any) { toast.error(err.message); }
  }

  const box = "card border border-base-300 bg-base-100";
  if (isPending) return <div className={box}><div className="card-body items-center"><span className="loading loading-spinner" /></div></div>;
  if (!user) return (
    <div className={box}><div className="card-body">
      <h3 className="font-semibold">Apply for this tuition</h3><p className="text-sm opacity-70">Sign in as a student to apply.</p>
      <Link href={`/sign-in?next=/tuitions/${tuitionId}`} className="btn btn-primary">Sign In to Apply</Link>
    </div></div>
  );
  if (user.role !== "student") return (
    <div className={box}><div className="card-body">
      <h3 className="font-semibold">Apply for this tuition</h3>
      <div role="alert" className="alert alert-warning alert-soft text-sm">Only student accounts can apply. You are signed in as a {user.role}.</div>
      <button className="btn btn-primary" disabled>Apply Now</button>
    </div></div>
  );
  if (done) return <div className={box}><div className="card-body"><div role="alert" className="alert alert-success alert-soft">Application sent! Track it in your dashboard.</div><Link href="/dashboard/student/my-applications" className="btn btn-outline">My Applications</Link></div></div>;

  return (
    <form onSubmit={submit} className={box}><div className="card-body gap-3">
      <div className="flex items-center justify-between"><h3 className="font-semibold">Apply for this tuition</h3>
        <button type="button" onClick={toggleSave} className="btn btn-ghost btn-sm gap-1">{saved ? <BookmarkCheck size={16} className="text-primary" /> : <Bookmark size={16} />}{saved ? "Saved" : "Save"}</button></div>
      <input className="input input-bordered w-full" placeholder="Phone number" value={f.studentPhone} onChange={(e) => setF({ ...f, studentPhone: e.target.value })} />
      <input className="input input-bordered w-full" placeholder="Preferred schedule (e.g. Sat, Mon 6 PM)" value={f.preferredSchedule} onChange={(e) => setF({ ...f, preferredSchedule: e.target.value })} />
      <textarea className="textarea textarea-bordered w-full" rows={3} placeholder="Learning note (optional)" value={f.studentNote} onChange={(e) => setF({ ...f, studentNote: e.target.value })} />
      <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Apply Now"}</button>
    </div></form>
  );
}
