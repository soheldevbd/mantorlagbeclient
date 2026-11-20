'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export default function MyTuitions() {
  const [items, setItems] = useState<any[]>([]);
  async function load() {
    try {
      setItems(await api('/tuitions/manage/mine'));
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    let cancelled = false;

    api('/tuitions/manage/mine')
      .then(data => {
        if (!cancelled) setItems(data);
      })
      .catch((e: any) => {
        if (!cancelled) toast.error(e.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  async function remove(id: string) {
    if (!confirm('Delete this tuition?')) return;
    try {
      await api(`/tuitions/manage/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      load();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  async function toggle(x: any) {
    try {
      await api(`/tuitions/manage/${x._id}/active`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !x.isActive }),
      });
      load();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <div className="card overflow-hidden">
      <div className="border-b p-5">
        <h2 className="font-extrabold">My tuition listings</h2>
      </div>
      {items.map(x => (
        <div
          key={x._id}
          className="flex flex-wrap items-center justify-between gap-4 border-b p-5"
        >
          <div>
            <b>{x.title}</b>
            <p className="mt-1 text-xs text-slate-500">
              {x.subject} · {x.classLevel} ·{' '}
              <span className="capitalize">{x.approvalStatus}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toggle(x)} className="btn btn-light">
              {x.isActive ? 'Close' : 'Activate'}
            </button>
            <button
              onClick={() => remove(x._id)}
              className="btn border border-rose-200 text-rose-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {!items.length && (
        <p className="p-8 text-center text-slate-500">
          You have not posted a tuition yet.
        </p>
      )}
    </div>
  );
}
