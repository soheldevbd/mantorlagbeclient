'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export default function AdminTuitions() {
  const [items, setItems] = useState<any[]>([]);
  async function load() {
    try {
      setItems(await api('/admin/tuitions'));
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function review(id: string, approvalStatus: string) {
    try {
      await api(`/admin/tuitions/${id}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ approvalStatus }),
      });
      toast.success(`Listing ${approvalStatus}`);
      load();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <div className="space-y-3">
      {items.map(x => (
        <div
          className="card flex flex-wrap items-center justify-between gap-4 p-5"
          key={x._id}
        >
          <div>
            <b>{x.title}</b>
            <p className="text-sm text-slate-500">
              {x.tutorName} · {x.subject} · {x.approvalStatus}
            </p>
          </div>
          {x.approvalStatus === 'pending' && (
            <div className="flex gap-2">
              <button
                onClick={() => review(x._id, 'approved')}
                className="btn btn-primary"
              >
                Approve
              </button>
              <button
                onClick={() => review(x._id, 'rejected')}
                className="btn btn-outline"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
