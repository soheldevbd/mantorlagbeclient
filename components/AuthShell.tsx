import type { ReactNode } from 'react';
export default function AuthShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-[75vh] place-items-center bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 px-4 py-12">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">{title}</h1>
            <p className="text-sm opacity-70">{sub}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
