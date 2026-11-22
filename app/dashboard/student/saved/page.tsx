'use client';
import Link from 'next/link';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { api } from '@/lib/api';
import { useApi } from '@/hooks/useApi';
import TuitionCard from '@/components/TuitionCard';
import { PageHeader, Spinner, Empty } from '@/components/ui';
import type { Tuition } from '@/lib/types';

export default function Saved() {
  const { data, loading, error, reload } = useApi<Tuition[]>('/api/bookmarks');
  async function remove(id: string) {
    try {
      await api(`/api/bookmarks/${id}`, { method: 'POST' });
      toast.success('Removed from saved');
      reload();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  if (loading) return <Spinner />;
  if (error) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader
        title="Saved Tuitions"
        sub="Free plan: up to 5 saved. Pro: unlimited."
      />
      {!data?.length ? (
        <Empty text="Nothing saved yet.">
          <Link href="/tuitions" className="btn btn-primary btn-sm">
            Browse Tuitions
          </Link>
        </Empty>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.map(t => (
            <div key={t._id} className="relative h-full">
              <TuitionCard t={t} />
              <button
                onClick={() => remove(t._id)}
                className="btn btn-circle btn-sm absolute right-3 top-3"
                aria-label="Remove"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
