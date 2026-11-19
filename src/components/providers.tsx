"use client";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { syncToken } from "@/lib/api";
export function Providers({children}:{children:React.ReactNode}){
 const {data:session}=authClient.useSession();
 useEffect(()=>{ if(session?.user) syncToken().catch(()=>{}); else if(session===null) localStorage.removeItem("mentorlagbe_token"); },[session]);
 return <>{children}<Toaster richColors position="top-right"/></>;
}
