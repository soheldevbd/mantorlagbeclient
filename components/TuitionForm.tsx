"use client";
import { useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { SUBJECTS, LEVELS } from "@/lib/constants";
import type { Tuition } from "@/lib/types";

export type TuitionValues = Pick<Tuition, "title" | "subject" | "classLevel" | "mode" | "location" | "monthlyFee" | "daysPerWeek" | "bannerImage" | "description">;
const blank: TuitionValues = { title: "", subject: "", classLevel: "", mode: "Online", location: "", monthlyFee: 0, daysPerWeek: 3, bannerImage: "", description: "" };

export default function TuitionForm({ initial, onSubmit, label }: { initial?: Partial<TuitionValues>; onSubmit: (v: TuitionValues) => Promise<void>; label: string }) {
  const [v, setV] = useState<TuitionValues>({ ...blank, ...initial });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof TuitionValues, val: string | number) => setV((p) => ({ ...p, [k]: val }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (v.title.trim().length < 5) return toast.error("Title must be at least 5 characters");
    if (!v.subject.trim() || !v.classLevel || !v.location.trim()) return toast.error("Subject, class level and location are required");
    if (!(Number(v.monthlyFee) > 0)) return toast.error("Monthly fee must be greater than 0");
    if (!(Number(v.daysPerWeek) >= 1 && Number(v.daysPerWeek) <= 7)) return toast.error("Days per week must be between 1 and 7");
    if (!v.bannerImage) return toast.error("Please upload a banner image");
    if (v.description.trim().length < 20) return toast.error("Description must be at least 20 characters");
    setBusy(true);
    try { await onSubmit({ ...v, monthlyFee: Number(v.monthlyFee), daysPerWeek: Number(v.daysPerWeek) }); }
    catch (err: any) { toast.error(err.message); }
    finally { setBusy(false); }
  }
  const L = ({ t, children }: { t: string; children: React.ReactNode }) => <label className="form-control flex flex-col gap-1"><span className="text-sm font-medium">{t}</span>{children}</label>;
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><L t="Title"><input className="input input-bordered w-full" value={v.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. HSC Higher Math Crash Batch" /></L></div>
      <L t="Subject"><input list="subjects" className="input input-bordered w-full" value={v.subject} onChange={(e) => set("subject", e.target.value)} placeholder="Choose or type" /><datalist id="subjects">{SUBJECTS.map((s) => <option key={s} value={s} />)}</datalist></L>
      <L t="Class level"><select className="select select-bordered w-full" value={v.classLevel} onChange={(e) => set("classLevel", e.target.value)}><option value="">Select level</option>{LEVELS.map((s) => <option key={s}>{s}</option>)}</select></L>
      <L t="Mode"><select className="select select-bordered w-full" value={v.mode} onChange={(e) => set("mode", e.target.value)}><option>Online</option><option>Offline</option></select></L>
      <L t="Location"><input className="input input-bordered w-full" value={v.location} onChange={(e) => set("location", e.target.value)} placeholder="Area or meeting platform" /></L>
      <L t="Monthly fee (৳)"><input type="number" min={1} className="input input-bordered w-full" value={v.monthlyFee || ""} onChange={(e) => set("monthlyFee", e.target.value)} /></L>
      <L t="Days per week"><input type="number" min={1} max={7} className="input input-bordered w-full" value={v.daysPerWeek} onChange={(e) => set("daysPerWeek", e.target.value)} /></L>
      <div className="sm:col-span-2"><p className="mb-1 text-sm font-medium">Banner image</p><ImageUpload value={v.bannerImage} onChange={(u) => set("bannerImage", u)} /></div>
      <div className="sm:col-span-2"><L t="Description"><textarea rows={5} className="textarea textarea-bordered w-full" value={v.description} onChange={(e) => set("description", e.target.value)} placeholder="Syllabus, teaching style, schedule..." /></L></div>
      <div className="sm:col-span-2"><button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : label}</button></div>
    </form>
  );
}
