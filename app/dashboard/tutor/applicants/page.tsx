"use client";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { PageHeader, Spinner, Empty, StatusBadge } from "@/components/ui";
import type { Application } from "@/lib/types";

export default function Applicants() {
  const { data, loading, error, reload } = useApi<Application[]>("/api/tutor/applicants");
  async function set(id: string, status: "accepted" | "rejected") {
    try { await api(`/api/tutor/applicants/${id}`, { method: "PATCH", json: { status } }); toast.success(`Application ${status}`); reload(); }
    catch (e: any) { toast.error(e.message); }
  }
  if (loading) return <Spinner />;
  if (error) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="Applicants" sub="Students who applied to your tuitions" />
      {!data?.length ? <Empty text="No applicants yet." /> : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead><tr><th>Student</th><th>Phone</th><th>Tuition</th><th>Schedule and note</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{data.map((a) => (
              <tr key={a._id}>
                <td><p className="font-medium">{a.studentName}</p><p className="text-xs opacity-60">{a.studentEmail}</p></td>
                <td className="whitespace-nowrap">{a.studentPhone}</td>
                <td className="min-w-44">{a.tuitionTitle}</td>
                <td className="min-w-52 text-sm"><p>{a.preferredSchedule}</p>{a.studentNote && <p className="opacity-60">{a.studentNote}</p>}</td>
                <td><StatusBadge status={a.status} /></td>
                <td className="whitespace-nowrap"><div className="flex gap-1">
                  <button className="btn btn-success btn-xs" disabled={a.status === "accepted"} onClick={() => set(a._id, "accepted")}>Accept</button>
                  <button className="btn btn-error btn-xs btn-outline" disabled={a.status === "rejected"} onClick={() => set(a._id, "rejected")}>Reject</button>
                </div></td>
              </tr>))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
