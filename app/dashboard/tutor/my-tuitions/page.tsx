"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import TuitionForm from "@/components/TuitionForm";
import { PageHeader, Spinner, Empty, StatusBadge } from "@/components/ui";
import { money } from "@/lib/constants";
import type { Tuition } from "@/lib/types";

export default function MyTuitions() {
  const { data, loading, error, reload } = useApi<Tuition[]>("/api/tutor/tuitions");
  const [edit, setEdit] = useState<Tuition | null>(null);

  async function run(fn: () => Promise<unknown>, msg: string) {
    try { await fn(); toast.success(msg); reload(); } catch (e: any) { toast.error(e.message); }
  }
  if (loading) return <Spinner />;
  if (error) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="My Tuitions" sub="Edit, close or delete your posts. Editing sends a post back to admin review." action={<Link href="/dashboard/tutor/post-tuition" className="btn btn-primary btn-sm">Post New</Link>} />
      {!data?.length ? <Empty text="You have not posted any tuition yet." /> : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead><tr><th>Tuition</th><th>Fee</th><th>Approval</th><th>Active</th><th /></tr></thead>
            <tbody>{data.map((t) => (
              <tr key={t._id}>
                <td className="min-w-56"><p className="font-medium">{t.title}</p><p className="text-xs opacity-60">{t.subject} · {t.classLevel} · {t.mode}</p></td>
                <td>{money(t.monthlyFee)}</td>
                <td><StatusBadge status={t.approvalStatus} /></td>
                <td><input type="checkbox" className="toggle toggle-primary toggle-sm" checked={t.isActive} aria-label="Active"
                  onChange={() => run(() => api(`/api/tutor/tuitions/${t._id}/toggle`, { method: "PATCH" }), t.isActive ? "Tuition closed" : "Tuition re-opened")} /></td>
                <td className="whitespace-nowrap">
                  <button className="btn btn-ghost btn-sm" onClick={() => setEdit(t)} aria-label="Edit"><Pencil size={16} /></button>
                  <button className="btn btn-ghost btn-sm text-error" aria-label="Delete" onClick={() => confirm("Delete this tuition and its applications?") && run(() => api(`/api/tutor/tuitions/${t._id}`, { method: "DELETE" }), "Tuition deleted")}><Trash2 size={16} /></button>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      )}
      {edit && (
        <div className="modal modal-open"><div className="modal-box max-w-3xl">
          <h3 className="mb-4 text-lg font-bold">Edit tuition</h3>
          <TuitionForm initial={edit} label="Save and Resubmit" onSubmit={async (v) => { await api(`/api/tutor/tuitions/${edit._id}`, { method: "PATCH", json: v }); toast.success("Updated and sent for review"); setEdit(null); reload(); }} />
          <div className="modal-action"><button className="btn" onClick={() => setEdit(null)}>Close</button></div>
        </div><div className="modal-backdrop" onClick={() => setEdit(null)} /></div>
      )}
    </>
  );
}
