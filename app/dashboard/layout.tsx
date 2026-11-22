"use client";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Bookmark, UserCircle, PlusSquare, BookOpen, Users, ShieldCheck, CreditCard, Menu, PanelLeftClose, PanelLeftOpen, Home, ClipboardList } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { MeProvider } from "@/components/MeProvider";
import { Spinner } from "@/components/ui";
import ThemeToggle from "@/components/ThemeToggle";
import type { Me } from "@/lib/types";

const profile = { href: "/dashboard/profile", label: "Update Profile", icon: UserCircle };
const NAV: Record<string, { href: string; label: string; icon: any }[]> = {
  student: [{ href: "/dashboard/student", label: "Overview", icon: LayoutDashboard }, { href: "/dashboard/student/my-applications", label: "My Applications", icon: FileText }, { href: "/dashboard/student/saved", label: "Saved Tuitions", icon: Bookmark }, profile],
  tutor: [{ href: "/dashboard/tutor", label: "Overview", icon: LayoutDashboard }, { href: "/dashboard/tutor/post-tuition", label: "Post a Tuition", icon: PlusSquare }, { href: "/dashboard/tutor/my-tuitions", label: "My Tuitions", icon: BookOpen }, { href: "/dashboard/tutor/applicants", label: "Applicants", icon: ClipboardList }, profile],
  admin: [{ href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard }, { href: "/dashboard/admin/users", label: "Users", icon: Users }, { href: "/dashboard/admin/tuitions", label: "Tuition Approval", icon: ShieldCheck }, { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard }, profile],
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();
  const [me, setMe] = useState<Me | null>(null);
  const [err, setErr] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const uid = session?.user?.id;

  const load = useCallback(async () => {
    try { setMe(await api<Me>("/api/users/me")); setErr(""); } catch (e: any) { setErr(e.message); }
  }, []);

  // While the session is still loading we show a spinner (never redirect), so a page reload keeps you on the same private route
  useEffect(() => {
    if (isPending) return;
    if (!uid) router.replace(`/sign-in?next=${encodeURIComponent(path)}`);
    else load();
  }, [isPending, uid, load, router, path]);

  if (err) return <div className="py-24 text-center"><p className="text-error">{err}</p><button className="btn btn-primary mt-4" onClick={load}>Try again</button></div>;
  if (!me) return <Spinner label="Loading your dashboard..." />;

  const items = NAV[me.role] || [profile];
  const active = (h: string) => (h.split("/").length <= 3 ? path === h : path.startsWith(h)) || path === h;
  const side = (
    <div className="flex h-full flex-col gap-1 p-3">
      <div className={`mb-3 flex items-center gap-3 rounded-2xl bg-base-200 p-3 ${collapsed ? "lg:justify-center lg:p-2" : ""}`}>
        {me.image
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={me.image} alt={me.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
          : <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-content">{me.name[0]?.toUpperCase()}</span>}
        <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
          <p className="truncate text-sm font-semibold">{me.name}</p>
          <div className="mt-0.5 flex gap-1"><span className="badge badge-primary badge-xs capitalize">{me.role}</span><span className={`badge badge-xs capitalize ${me.plan === "pro" ? "badge-secondary" : "badge-ghost"}`}>{me.plan}</span></div>
        </div>
      </div>
      {items.map((i) => (
        <Link key={i.href} href={i.href} onClick={() => setOpen(false)} title={i.label}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active(i.href) ? "bg-primary text-primary-content" : "hover:bg-base-200"} ${collapsed ? "lg:justify-center" : ""}`}>
          <i.icon size={18} className="shrink-0" /><span className={collapsed ? "lg:hidden" : ""}>{i.label}</span>
        </Link>
      ))}
      <Link href="/" className={`mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-base-200 ${collapsed ? "lg:justify-center" : ""}`}><Home size={18} /><span className={collapsed ? "lg:hidden" : ""}>Back to Home</span></Link>
    </div>
  );

  return (
    <MeProvider me={me} reload={load}>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-base-300 bg-base-100 pt-16 transition-transform lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:pt-0 ${open ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-20" : "lg:w-64"}`}>{side}</aside>
        <div className="min-w-0 flex-1">
          <div className="sticky top-16 z-20 flex items-center gap-2 border-b border-base-300 bg-base-100/90 px-4 py-2 backdrop-blur">
            <button className="btn btn-ghost btn-square lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
            <button className="btn btn-ghost btn-square hidden lg:inline-flex" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</button>
            <p className="flex-1 text-sm font-semibold capitalize">{me.role} dashboard</p>
            <ThemeToggle />
          </div>
          <div className="w-full p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </MeProvider>
  );
}
