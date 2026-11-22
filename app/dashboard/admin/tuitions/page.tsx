'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import { PageHeader, Spinner, Empty, StatusBadge } from '@/components/ui';
import { money, fmtDate } from '@/lib/constants';
import type { Tuition } from '@/lib/types';

export default function AdminTuitions() {
  const [filter, setFilter] = useState('');
  const { data, loading, error, reload } = useApi<Tuition[]>(
    `/api/admin/tuitions${filter ? `?status=${filter}` : ''}`,
  );
  async function set(id: string, status: 'approved' | 'rejected') {
    try {
      await api(`/api/admin/tuitions/${id}/status`, {
        method: 'PATCH',
        json: { status },
      });
      toast.success(`Tuition ${status}`);
      reload();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <>
      <PageHeader
        title="Tuition Approval"
        sub="Only approved and active tuitions appear on the public site"
        action={
          <select
            className="select select-bordered select-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        }
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-error">{error}</p>
      ) : !data?.length ? (
        <Empty text="No tuitions found." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Tuition</th>
                <th>Tutor</th>
                <th>Fee</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(t => (
                <tr key={t._id}>
                  <td className="min-w-56">
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs opacity-60">
                      {t.subject} · {t.classLevel} · {t.mode}
                    </p>
                  </td>
                  <td>
                    <p>{t.tutorName}</p>
                    <p className="text-xs opacity-60">{t.tutorEmail}</p>
                  </td>
                  <td>{money(t.monthlyFee)}</td>
                  <td className="whitespace-nowrap">{fmtDate(t.createdAt)}</td>
                  <td>
                    <StatusBadge status={t.approvalStatus} />
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex gap-1">
                      <button
                        className="btn btn-success btn-xs"
                        disabled={t.approvalStatus === 'approved'}
                        onClick={() => set(t._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error btn-xs btn-outline"
                        disabled={t.approvalStatus === 'rejected'}
                        onClick={() => set(t._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
