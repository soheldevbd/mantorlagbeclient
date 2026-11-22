"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";

function Form() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const [f, setF] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return toast.error("Enter a valid email address");
    if (f.password.length < 6) return toast.error("Password must be at least 6 characters");
    setBusy(true);
    const { error } = await authClient.signIn.email(f);
    setBusy(false);
    if (error) return toast.error(error.message || "Invalid email or password");
    toast.success("Welcome back!");
    router.push(next && next.startsWith("/") ? next : "/dashboard");
    router.refresh();
  }
  return (
    <AuthShell title="Welcome back" sub="Sign in to your MentorLagbe account">
      <form onSubmit={submit} className="space-y-3">
        <input type="email" className="input input-bordered w-full" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />
        <input type="password" className="input input-bordered w-full" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="current-password" />
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Sign In"}</button>
      </form>
      <p className="text-center text-sm opacity-70">New here? <Link href="/sign-up" className="link link-primary">Create an account</Link></p>
    </AuthShell>
  );
}
export default function SignIn() { return <Suspense><Form /></Suspense>; }
