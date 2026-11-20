'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, CalendarDays, Wallet, Monitor } from 'lucide-react';
import { api } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
export default function TuitionDetails() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null),
    [phone, setPhone] = useState(''),
    [schedule, setSchedule] = useState(''),
    [note, setNote] = useState(''),
    [busy, setBusy] = useState(false);
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  useEffect(() => {
    api(`/tuitions/${id}`)
      .then(setItem)
      .catch(e => toast.error(e.message));
  }, [id]);
  async function apply(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api('/applications', {
        method: 'POST',
        body: JSON.stringify({
          tuitionId: id,
          studentPhone: phone,
          preferredSchedule: schedule,
          studentNote: note,
        }),
      });
      toast.success('Application submitted');
      setPhone('');
      setSchedule('');
      setNote('');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  if (!item)
    return (
      <main className="container min-h-[60vh] py-20 text-center text-slate-500">
        Loading tuition details…
      </main>
    );
  return (
    <main className="container py-12">
      <Link href="/tuitions" className="text-sm font-bold text-blue-700">
        ← Back to browse
      </Link>
      <div className="mt-6 grid gap-9 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Image
            src={item.bannerImage}
            alt=""
            width={1200}
            height={600}
            className="h-85 w-full rounded-3xl object-cover"
          />
          <span className="eyebrow mt-8 block">
            {item.subject} · {item.classLevel}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold">{item.title}</h1>
          <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
            {item.description}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              [<Wallet key="fee-icon" />, `৳${item.monthlyFee} / month`],
              [<Monitor key="mode-icon" />, item.mode],
              [<MapPin key="location-icon" />, item.location || 'Flexible location'],
              [<CalendarDays key="days-icon" />, `${item.daysPerWeek} days per week`],
            ].map(([ic, t], i) => (
              <div
                key={i}
                className="card flex items-center gap-3 p-4 text-sm font-semibold"
              >
                {ic}
                {t}
              </div>
            ))}
          </div>
        </div>
        <aside className="card h-fit p-6">
          <p className="text-sm text-slate-500">Tutor</p>
          <h2 className="mt-1 text-xl font-extrabold">{item.tutorName}</h2>
          <p className="mt-1 text-sm text-slate-500">{item.tutorEmail}</p>
          <div className="my-6 border-t" />
          <h3 className="text-lg font-extrabold">Apply for this tuition</h3>
          {!session ? (
            <p className="mt-4 text-sm text-slate-500">
              Sign in with a student account to apply.{' '}
              <Link className="text-blue-700 underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          ) : role !== 'student' ? (
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              Only student accounts can apply for tuition listings.
            </p>
          ) : (
            <form onSubmit={apply} className="mt-5 space-y-3">
              <input
                className="field"
                required
                placeholder="Your phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <input
                className="field"
                required
                placeholder="Preferred days and time"
                value={schedule}
                onChange={e => setSchedule(e.target.value)}
              />
              <textarea
                className="field min-h-28"
                placeholder="Tell the tutor about your learning goals"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              <button disabled={busy} className="btn btn-primary w-full">
                {busy ? 'Submitting…' : 'Submit application'}
              </button>
            </form>
          )}
        </aside>
      </div>
    </main>
  );
}
