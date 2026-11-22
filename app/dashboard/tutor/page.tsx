"use client";
import Link from "next/link";
import { BookOpen, BadgeCheck, Users, Crown } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { PageHeader, StatCard, Spinner } from "@/components/ui";

export default function TutorOverview() {
  const { data, loading, error } = useApi<{ total: number; active: number; applicants: number; plan: string }>("/api/tutor/stats");
  if (loading) return <Spinner />;
  if (error || !data) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="Tutor Overview" sub="Your tuitions and applicants" action={<Link href="/dashboard/tutor/post-tuition" className="btn btn-primary btn-sm">Post a Tuition</Link>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tuitions Posted" value={data.total} icon={<BookOpen />} />
        <StatCard label="Active / Approved" value={data.active} icon={<BadgeCheck />} />
        <StatCard label="Applicants Received" value={data.applicants} icon={<Users />} />
        <StatCard label="Current Plan" value={data.plan} icon={<Crown />} />
      </div>
      {data.plan === "free" && <div role="alert" className="alert alert-info alert-soft mt-6">Free plan: up to 2 tuition posts. Go Pro for $15 to post unlimited. <Link href="/pricing" className="link font-semibold">See plans</Link></div>}
    </>
  );
}
