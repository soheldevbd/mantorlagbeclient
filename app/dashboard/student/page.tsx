"use client";
import Link from "next/link";
import { FileText, CheckCircle2, Clock, Crown } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { PageHeader, StatCard, Spinner } from "@/components/ui";

export default function StudentOverview() {
  const { data, loading, error } = useApi<{ total: number; accepted: number; pending: number; plan: string }>("/api/student/stats");
  if (loading) return <Spinner />;
  if (error || !data) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="Student Overview" sub="Your applications at a glance" action={<Link href="/tuitions" className="btn btn-primary btn-sm">Find Tuitions</Link>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Applied" value={data.total} icon={<FileText />} />
        <StatCard label="Accepted" value={data.accepted} icon={<CheckCircle2 />} />
        <StatCard label="Pending" value={data.pending} icon={<Clock />} />
        <StatCard label="Current Plan" value={data.plan} icon={<Crown />} />
      </div>
      {data.plan === "free" && <div role="alert" className="alert alert-info alert-soft mt-6">Go Pro for $10: unlimited saved tuitions and priority booking. <Link href="/pricing" className="link font-semibold">See plans</Link></div>}
    </>
  );
}
