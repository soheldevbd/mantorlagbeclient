'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { Me } from '@/lib/types';

const Ctx = createContext<{ me: Me; reload: () => void } | null>(null);
export const MeProvider = ({
  me,
  reload,
  children,
}: {
  me: Me;
  reload: () => void;
  children: ReactNode;
}) => <Ctx.Provider value={{ me, reload }}>{children}</Ctx.Provider>;
export const useMe = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useMe must be used inside the dashboard');
  return c;
};
