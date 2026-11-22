import Link from 'next/link';
import { XCircle } from 'lucide-react';
export default function Cancel() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <XCircle size={64} className="text-warning" />
      <h1 className="mt-4 text-2xl font-extrabold">Payment cancelled</h1>
      <p className="mt-2 opacity-70">
        No charge was made. You can upgrade any time from the pricing page.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/pricing" className="btn btn-primary">
          Back to Pricing
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
