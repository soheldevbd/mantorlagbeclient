'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Menu, GraduationCap } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { clearToken } from '@/lib/api';
import ThemeToggle from './ThemeToggle';

const links = [
  ['/', 'Home'],
  ['/tuitions', 'Browse Tuitions'],
  ['/pricing', 'Pricing'],
  ['/about', 'How It Works'],
];

export const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"
  >
    <span className="rounded-xl bg-primary p-1.5 text-primary-content">
      <GraduationCap size={22} />
    </span>
    <span>
      Mentor<span className="text-primary">Lagbe</span>
    </span>
  </Link>
);

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const path = usePathname();
  const router = useRouter();
  const user: any = session?.user;

  async function logout() {
    await authClient.signOut();
    clearToken();
    toast.success('Signed out');
    router.push('/');
    router.refresh();
  }
  const nav = links.map(([href, label]) => (
    <li key={href}>
      <Link
        href={href}
        className={path === href ? 'text-primary font-semibold' : ''}
      >
        {label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Menu"
            >
              <Menu />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
            >
              {nav}
            </ul>
          </div>
          <Logo />
        </div>
        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{nav}</ul>
        </nav>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="flex items-center gap-2 rounded-full border border-base-300 py-1 pl-1 pr-3 hover:bg-base-200"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-primary-content">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                )}
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block max-w-28 truncate text-sm font-semibold">
                    {user.name}
                  </span>
                  <span className="badge badge-primary badge-xs capitalize">
                    {user.role}
                  </span>
                </span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
              >
                <li className="menu-title sm:hidden">
                  {user.name} · {user.role}
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/dashboard/profile">Update Profile</Link>
                </li>
                <li>
                  <button onClick={logout} className="text-error">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-ghost btn-sm sm:btn-md">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="btn btn-primary btn-sm sm:btn-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
