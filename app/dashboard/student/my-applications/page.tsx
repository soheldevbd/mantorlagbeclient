"use client";
import Link from "next/link";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { PageHeader, Spinner, Empty, StatusBadge } from "@/components/ui";
import { money, fmtDate } from "@/lib/constants";
import type { Application } from "@/lib/types";

export default function MyApplications() {
  const { data, loading, error, reload } = useApi<Application[]>("/api/applications/mine");
  async function cancel(id: string) {
    if (!confirm("Cancel this application?")) return;
    try { await api(`/api/applications/${id}`, { method: "DELETE" }); toast.success("Application cancelled"); reload(); }
    catch (e: any) { toast.error(e.message); }
  }
  if (loading) return <Spinner />;
  if (error) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="My Applications" sub="Cancel an application while it is still pending" />
      {!data?.length ? <Empty text="You have not applied to any tuition yet."><Link href="/tuitions" className="btn btn-primary btn-sm">Browse Tuitions</Link></Empty> : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead><tr><th>Tuition</th><th>Tutor</th><th>Fee</th><th>Applied</th><th>Status</th><th /></tr></thead>
            <tbody>{data.map((a) => (
              <tr key={a._id}>
                <td className="min-w-52 font-medium">{a.tuitionTitle}</td>
                <td><p>{a.tutorName}</p><p className="text-xs opacity-60">{a.tutorEmail}</p></td>
                <td>{money(a.monthlyFee)}</td><td className="whitespace-nowrap">{fmtDate(a.appliedAt)}</td>
                <td><StatusBadge status={a.status} /></td>
                <td>{a.status === "pending" && <button onClick={() => cancel(a._id)} className="btn btn-ghost btn-sm text-error" aria-label="Cancel"><Trash2 size={16} /></button>}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
