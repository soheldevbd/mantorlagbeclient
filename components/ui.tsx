import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export const Spinner = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 opacity-70"><Loader2 className="animate-spin" size={32} /><span className="text-sm">{label}</span></div>
);

export const SkeletonGrid = ({ n = 6 }: { n?: number }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton h-80 w-full" />)}</div>
);

export const StatusBadge = ({ status }: { status: string }) => {
  const c: Record<string, string> = { pending: "badge-warning", approved: "badge-success", accepted: "badge-success", rejected: "badge-error", closed: "badge-neutral", paid: "badge-success" };
  return <span className={`badge badge-soft capitalize ${c[status] || "badge-ghost"}`}>{status}</span>;
};

export const StatCard = ({ label, value, icon }: { label: string; value: ReactNode; icon?: ReactNode }) => (
  <div className="card bg-base-100 border border-base-300 h-full">
    <div className="card-body flex-row items-center gap-4 p-5">
      {icon && <div className="rounded-xl bg-primary/10 text-primary p-3">{icon}</div>}
      <div><p className="text-sm opacity-60">{label}</p><p className="text-2xl font-bold capitalize">{value}</p></div>
    </div>
  </div>
);

export const PageHeader = ({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div><h1 className="text-2xl font-bold">{title}</h1>{sub && <p className="opacity-60 text-sm mt-1">{sub}</p>}</div>{action}
  </div>
);

export const Empty = ({ text, children }: { text: string; children?: ReactNode }) => (
  <div className="rounded-2xl border border-dashed border-base-300 py-14 text-center"><p className="opacity-60">{text}</p>{children && <div className="mt-4">{children}</div>}</div>
);

export const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
