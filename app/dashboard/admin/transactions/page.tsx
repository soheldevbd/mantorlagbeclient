"use client";
import { useApi } from "@/hooks/useApi";
import { PageHeader, Spinner, Empty } from "@/components/ui";
import { fmtDate } from "@/lib/constants";
import type { Payment } from "@/lib/types";

export default function Transactions() {
  const { data, loading, error } = useApi<Payment[]>("/api/admin/transactions");
  if (loading) return <Spinner />;
  if (error) return <p className="text-error">{error}</p>;
  return (
    <>
      <PageHeader title="Transactions" sub="Stripe Pro plan payments" />
      {!data?.length ? <Empty text="No payments yet." /> : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead><tr><th>User</th><th>Role</th><th>Plan</th><th>Amount</th><th>Transaction ID</th><th>Date</th></tr></thead>
            <tbody>{data.map((p) => (
              <tr key={p._id}>
                <td><p className="font-medium">{p.userName}</p><p className="text-xs opacity-60">{p.userEmail}</p></td>
                <td className="capitalize">{p.userRole}</td><td>{p.planName}</td>
                <td className="font-semibold">${p.amount} <span className="text-xs uppercase opacity-60">{p.currency}</span></td>
                <td className="max-w-44 truncate font-mono text-xs">{p.transactionId}</td>
                <td className="whitespace-nowrap">{fmtDate(p.paidAt)}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
