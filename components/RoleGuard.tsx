'use client';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from './MeProvider';
import { Spinner } from './ui';

export default function RoleGuard({
  role,
  children,
}: {
  role: string;
  children: ReactNode;
}) {
  const { me } = useMe();
  const router = useRouter();
  useEffect(() => {
    if (me.role !== role) router.replace(`/dashboard/${me.role}`);
  }, [me.role, role, router]);
  return me.role === role ? <>{children}</> : <Spinner />;
}
