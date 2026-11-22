import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-8xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 opacity-70">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn btn-primary mt-8">Back to Home</Link>
    </div>
  );
}
