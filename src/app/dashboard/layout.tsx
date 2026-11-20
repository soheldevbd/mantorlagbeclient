'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Settings,
  ShieldCheck,
  Menu,
  LogOut,
  Bookmark,
} from 'lucide-react';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const [role, setRole] = useState('student'),
    [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session) router.replace('/sign-in');
    if (session) {
      api<any>('/profile/me')
        .then(u => setRole(u.role))
        .catch(() => {});
    }
  }, [session, isPending, router]);
  const common = [
    ['Overview', '/dashboard', LayoutDashboard],
    ['Update profile', '/dashboard/profile', Settings],
  ];
  const menus: any = {
    student: [
      ...common,
      ['My applications', '/dashboard/student/my-applications', ClipboardList],
      ['Saved tuitions', '/dashboard/student/saved', Bookmark],
    ],
    tutor: [
      ...common,
      ['Post a tuition', '/dashboard/tutor/post-tuition', BookOpen],
      ['My tuitions', '/dashboard/tutor/my-tuitions', ClipboardList],
      ['Applicants', '/dashboard/tutor/applicants', Users],
    ],
    admin: [
      ...common,
      ['Users', '/dashboard/admin/users', Users],
      ['Tuition review', '/dashboard/admin/tuitions', BookOpen],
      ['Transactions', '/dashboard/admin/transactions', ClipboardList],
    ],
  };
  if (isPending || !session)
    return (
      <div className="container py-24 text-center text-slate-500">
        Loading your workspace…
      </div>
    );
  return (
    <div className="min-h-[75vh] bg-[#f7f8fc]">
      <div className="container grid gap-6 py-7 lg:grid-cols-[250px_1fr]">
        <aside className={`card h-fit p-4 ${collapsed ? 'lg:w-19' : ''}`}>
          <div className="mb-5 flex items-center justify-between">
            <b className={collapsed ? 'hidden' : 'text-sm'}>WORKSPACE</b>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <Menu size={18} />
            </button>
          </div>
          <nav className="space-y-1">
            {(menus[role] || menus.student).map(([label, href, Icon]: any) => (
              <Link
                key={href}
                href={href}
                title={label}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${path === href ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Icon size={18} />
                {!collapsed && label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 border-t pt-4">
            <button
              onClick={async () => {
                await authClient.signOut();
                localStorage.removeItem('mentorlagbe_token');
                router.push('/');
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-rose-600"
            >
              <LogOut size={18} />
              {!collapsed && 'Sign out'}
            </button>
          </div>
        </aside>
        <section className="min-w-0">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {role} workspace
              </p>
              <h1 className="mt-1 text-2xl font-extrabold">Your dashboard</h1>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-500">
              {session.user.name}
            </span>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
