'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export default function PostTuition() {
  const [f, setF] = useState<any>({
      title: '',
      subject: '',
      classLevel: '',
      mode: 'Online',
      location: '',
      monthlyFee: '',
      daysPerWeek: 3,
      description: '',
      bannerImage: '',
    }),
    [busy, setBusy] = useState(false);
  function change(e: any) {
    setF({ ...f, [e.target.name]: e.target.value });
  }
  async function upload(file?: File) {
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    try {
      const r = await api<any>('/upload', { method: 'POST', body: data });
      setF((x: any) => ({ ...x, bannerImage: r.url }));
      toast.success('Image uploaded');
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api('/tuitions', { method: 'POST', body: JSON.stringify(f) });
      toast.success('Tuition submitted for admin review');
      setF({
        title: '',
        subject: '',
        classLevel: '',
        mode: 'Online',
        location: '',
        monthlyFee: '',
        daysPerWeek: 3,
        description: '',
        bannerImage: '',
      });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <div>
        <h2 className="text-xl font-extrabold">Post a tuition</h2>
        <p className="mt-1 text-sm text-slate-500">
          New listings are reviewed by an admin before publishing.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ['title', 'Tuition title'],
          ['subject', 'Subject'],
          ['classLevel', 'Class level'],
          ['location', 'Location'],
          ['monthlyFee', 'Monthly fee (BDT)'],
          ['daysPerWeek', 'Days per week'],
        ].map(([name, label]) => (
          <label className="text-sm font-bold" key={name}>
            {label}
            <input
              className="field mt-2"
              required
              name={name}
              type={
                name === 'monthlyFee' || name === 'daysPerWeek'
                  ? 'number'
                  : 'text'
              }
              value={f[name]}
              onChange={change}
            />
          </label>
        ))}
        <label className="text-sm font-bold">
          Mode
          <select
            className="field mt-2"
            name="mode"
            value={f.mode}
            onChange={change}
          >
            <option>Online</option>
            <option>Offline</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          Banner image
          <input
            className="field mt-2"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={e => upload(e.target.files?.[0])}
          />
        </label>
      </div>
      <label className="block text-sm font-bold">
        Description
        <textarea
          className="field mt-2 min-h-32"
          required
          name="description"
          value={f.description}
          onChange={change}
        />
      </label>
      <button disabled={busy} className="btn btn-primary">
        {busy ? 'Submitting…' : 'Submit for review'}
      </button>
    </form>
  );
}
