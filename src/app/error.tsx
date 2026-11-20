'use client';
import { useEffect } from 'react';
import Link from 'next/link';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="container grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Something went wrong</h1>
        <p className="mt-2 text-slate-500">
          Please try again, or return to the home page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
