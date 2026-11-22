'use client';
import {
  Users,
  GraduationCap,
  Hourglass,
  BadgeCheck,
  DollarSign,
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { PageHeader, StatCard, Spinner } from '@/components/ui';

export default function AdminOverview() {
  const { data, loading, error } = useApi<{
    totalUsers: number;
    totalTutors: number;
    pending: number;
    approved: number;
    revenue: number;
  }>('/api/admin/stats');
  if (loading) return <Spinner />;
  if (error || !data) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="Admin Overview" sub="Platform statistics" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Users"
          value={data.totalUsers}
          icon={<Users />}
        />
        <StatCard
          label="Total Tutors"
          value={data.totalTutors}
          icon={<GraduationCap />}
        />
        <StatCard
          label="Pending Tuitions"
          value={data.pending}
          icon={<Hourglass />}
        />
        <StatCard
          label="Approved Tuitions"
          value={data.approved}
          icon={<BadgeCheck />}
        />
        <StatCard
          label="Stripe Revenue"
          value={`$${data.revenue}`}
          icon={<DollarSign />}
        />
      </div>
    </>
  );
}
