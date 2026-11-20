'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export default function Applicants() {
  const [items, setItems] = useState<any[]>([]);
  async function load() {
    try {
      setItems(await api('/applications/tutor/inbox'));
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    let cancelled = false;
    api('/applications/tutor/inbox')
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
  async function decide(id: string, status: string) {
    try {
      await api(`/applications/tutor/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      toast.success('Application updated');
      load();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <div className="space-y-3">
      {items.map(x => (
        <div className="card p-5" key={x._id}>
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <b>{x.studentName}</b>
              <p className="text-sm text-slate-500">
                {x.studentEmail} · {x.studentPhone}
              </p>
              <p className="mt-2 text-sm">For: {x.tuitionTitle}</p>
              <p className="text-sm text-slate-500">
                Schedule: {x.preferredSchedule}
              </p>
              {x.studentNote && <p className="mt-2 text-sm">{x.studentNote}</p>}
            </div>
            <div className="flex items-start gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                {x.status}
              </span>
              {x.status === 'pending' && (
                <>
                  <button
                    onClick={() => decide(x._id, 'accepted')}
                    className="btn btn-primary"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => decide(x._id, 'rejected')}
                    className="btn btn-outline"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      {!items.length && (
        <div className="card p-8 text-center text-slate-500">
          No applicants yet.
        </div>
      )}
    </div>
  );
}
