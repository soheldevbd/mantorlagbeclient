"use client";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui";
import { money } from "@/lib/constants";
import type { Payment } from "@/lib/types";

function Verify() {
  const sessionId = useSearchParams().get("session_id");
  const { data: session, isPending } = authClient.useSession();
  const ran = useRef(false);
  const [state, setState] = useState<{ ok?: Payment; error?: string }>({});

  useEffect(() => {
    if (isPending || ran.current) return;
    if (!session || !sessionId) return void setState({ error: !sessionId ? "Missing payment session." : "Please sign in to confirm your payment." });
    ran.current = true;
    api<{ payment: Payment }>("/api/payments/verify", { method: "POST", json: { sessionId } })
      .then((r) => setState({ ok: r.payment }))
      .catch((e) => setState({ error: e.message }));
  }, [isPending, session, sessionId]);

  if (!state.ok && !state.error) return <Spinner label="Confirming your payment..." />;
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      {state.ok ? <CheckCircle2 size={64} className="text-success" /> : <XCircle size={64} className="text-error" />}
      <h1 className="mt-4 text-2xl font-extrabold">{state.ok ? "Payment successful" : "Payment not confirmed"}</h1>
      {state.ok ? (
        <div className="mt-4 w-full rounded-2xl border border-base-300 p-5 text-left text-sm">
          <p className="flex justify-between"><span className="opacity-60">Plan</span><b>{state.ok.planName}</b></p>
          <p className="mt-2 flex justify-between"><span className="opacity-60">Amount</span><b>{money(state.ok.amount).replace("৳", "$")}</b></p>
          <p className="mt-2 flex justify-between gap-4"><span className="opacity-60">Transaction</span><b className="truncate">{state.ok.transactionId}</b></p>
        </div>
      ) : <p className="mt-2 opacity-70">{state.error}</p>}
      <Link href="/dashboard" className="btn btn-primary mt-8">Go to Dashboard</Link>
    </div>
  );
}
export default function Success() { return <Suspense fallback={<Spinner />}><Verify /></Suspense>; }
