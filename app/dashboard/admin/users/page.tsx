"use client";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { useMe } from "@/components/MeProvider";
import { PageHeader, Spinner } from "@/components/ui";
import { fmtDate } from "@/lib/constants";

type U = { _id: string; name: string; email: string; image?: string; role: string; plan?: string; createdAt: string };

export default function AdminUsers() {
  const { me } = useMe();
  const { data, loading, error, reload } = useApi<U[]>("/api/admin/users");
  async function setRole(id: string, role: string) {
    try { await api(`/api/admin/users/${id}/role`, { method: "PATCH", json: { role } }); toast.success("Role updated"); reload(); }
    catch (e: any) { toast.error(e.message); }
  }
  if (loading) return <Spinner />;
  if (error) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="User Management" sub={`${data?.length || 0} registered users`} />
      <div className="overflow-x-auto rounded-2xl border border-base-300">
        <table className="table">
          <thead><tr><th>User</th><th>Plan</th><th>Joined</th><th>Role</th></tr></thead>
          <tbody>{data?.map((u) => (
            <tr key={u._id}>
              <td><p className="font-medium">{u.name}</p><p className="text-xs opacity-60">{u.email}</p></td>
              <td><span className={`badge badge-soft capitalize ${u.plan === "pro" ? "badge-secondary" : "badge-ghost"}`}>{u.plan || "free"}</span></td>
              <td className="whitespace-nowrap">{u.createdAt ? fmtDate(u.createdAt) : "-"}</td>
              <td><select className="select select-bordered select-sm capitalize" value={u.role} disabled={u._id === me.id} onChange={(e) => setRole(u._id, e.target.value)}>
                <option>student</option><option>tutor</option><option>admin</option></select></td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </>
  );
}
