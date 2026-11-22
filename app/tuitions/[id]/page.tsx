import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Monitor, GraduationCap, CalendarDays, Wallet, Mail } from "lucide-react";
import { getJson } from "@/lib/server-api";
import { money, fmtDate } from "@/lib/constants";
import type { Tuition } from "@/lib/types";
import ApplyPanel from "@/components/ApplyPanel";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = await getJson<Tuition>(`/api/tuitions/${id}`);
  return { title: t?.title || "Tuition" };
}

export default async function Details({ params }: Props) {
  const { id } = await params;
  const t = await getJson<Tuition>(`/api/tuitions/${id}`);
  if (!t) notFound();

  const facts = [
    { i: GraduationCap, l: "Class level", v: t.classLevel },
    { i: t.mode === "Online" ? Monitor : MapPin, l: `${t.mode} · Location`, v: t.location },
    { i: CalendarDays, l: "Schedule", v: `${t.daysPerWeek} days / week` },
    { i: Wallet, l: "Monthly fee", v: money(t.monthlyFee) },
  ];
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_380px]">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.bannerImage} alt={t.title} className="aspect-video w-full rounded-3xl object-cover" />
        <div className="mt-6 flex flex-wrap gap-2"><span className="badge badge-primary badge-soft">{t.subject}</span><span className="badge badge-outline">{t.mode}</span></div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mt-1 text-sm opacity-60">Posted {fmtDate(t.createdAt)}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.l} className="flex items-center gap-3 rounded-2xl border border-base-300 p-4"><f.i className="text-primary" size={22} /><div><p className="text-xs opacity-60">{f.l}</p><p className="font-semibold">{f.v}</p></div></div>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-bold">About this tuition</h2>
        <p className="mt-3 whitespace-pre-line leading-relaxed opacity-80">{t.description}</p>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="card border border-base-300 bg-base-100"><div className="card-body">
          <h3 className="font-semibold">Your tutor</h3>
          <div className="flex items-center gap-3">
            {t.tutorImage
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={t.tutorImage} alt={t.tutorName} className="h-14 w-14 rounded-full object-cover" />
              : <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-xl font-bold text-primary-content">{t.tutorName[0]}</span>}
            <div><p className="font-semibold">{t.tutorName}</p><p className="flex items-center gap-1 text-sm opacity-60"><Mail size={14} />{t.tutorEmail}</p></div>
          </div>
        </div></div>
        <ApplyPanel tuitionId={t._id} />
      </aside>
    </div>
  );
}
