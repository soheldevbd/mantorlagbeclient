"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

export default function CheckoutButton({ role }: { role: "tutor" | "student" }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const user: any = session?.user;
  const wrongRole = !!user && user.role !== role;

  async function go() {
    if (!user) return router.push("/sign-in?next=/pricing");
    setBusy(true);
    try {
      const { url } = await api<{ url: string }>("/api/payments/checkout", { method: "POST" });
      window.location.href = url;
    } catch (e: any) { toast.error(e.message); setBusy(false); }
  }
  const label = user?.plan === "pro" && !wrongRole ? "You are on Pro" : wrongRole ? (user.role === "admin" ? "Not for admins" : `For ${role}s only`) : "Subscribe with Stripe";
  return <button onClick={go} disabled={busy || wrongRole || user?.plan === "pro"} className="btn btn-primary w-full">{busy ? <span className="loading loading-spinner" /> : label}</button>;
}
