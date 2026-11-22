"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";

export default function SignUp() {
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "", role: "student" });
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (f.name.trim().length < 2) return toast.error("Enter your full name");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return toast.error("Enter a valid email address");
    if (f.password.length < 6) return toast.error("Password must be at least 6 characters");
    setBusy(true);
    const { error } = await authClient.signUp.email(f);
    setBusy(false);
    if (error) return toast.error(error.message || "Could not create your account");
    toast.success("Account created. Welcome to MentorLagbe!");
    router.push("/dashboard");
    router.refresh();
  }
  return (
    <AuthShell title="Create your account" sub="Join as a student or a tutor">
      <form onSubmit={submit} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
        <input type="email" className="input input-bordered w-full" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />
        <input type="password" className="input input-bordered w-full" placeholder="Password (min 6 characters)" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="new-password" />
        <div className="grid grid-cols-2 gap-3">
          {(["student", "tutor"] as const).map((r) => (
            <label key={r} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 capitalize ${f.role === r ? "border-primary bg-primary/10" : "border-base-300"}`}>
              <input type="radio" name="role" className="radio radio-primary radio-sm" checked={f.role === r} onChange={() => setF({ ...f, role: r })} />{r}
            </label>
          ))}
        </div>
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Sign Up"}</button>
      </form>
      <p className="text-center text-sm opacity-70">Already have an account? <Link href="/sign-in" className="link link-primary">Sign in</Link></p>
    </AuthShell>
  );
}
