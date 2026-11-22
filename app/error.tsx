'use client';
import Link from 'next/link';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-6xl font-extrabold text-error">Oops</p>
      <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 opacity-70">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="btn btn-outline">
          Try again
        </button>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
