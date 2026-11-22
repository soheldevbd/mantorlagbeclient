"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/components/MeProvider";
import { Spinner } from "@/components/ui";

export default function DashboardHome() {
  const { me } = useMe();
  const router = useRouter();
  useEffect(() => { router.replace(`/dashboard/${me.role}`); }, [me.role, router]);
  return <Spinner />;
}
