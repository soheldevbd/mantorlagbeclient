"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap, LogOut, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
export function Navbar(){
 const [open,setOpen]=useState(false); const {data:session}=authClient.useSession();
 const user=session?.user as any;
 const links=[["Home","/"],["Browse Tuitions","/tuitions"],["Pricing","/pricing"],["How it works","/#how-it-works"]];
 async function logout(){await authClient.signOut();localStorage.removeItem("mentorlagbe_token");location.href="/";}
 return <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
  <div className="container flex h-[76px] items-center justify-between">
   <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-white"><GraduationCap size={22}/></span>Mentor<span className="text-blue-700">Lagbe</span></Link>
   <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">{links.map(([n,h])=><Link key={h} href={h} className="hover:text-blue-700">{n}</Link>)}</nav>
   <div className="hidden items-center gap-3 md:flex">{user?<><Link className="btn btn-light" href="/dashboard"><LayoutDashboard size={16}/>Dashboard</Link><button className="btn btn-outline" onClick={logout}><LogOut size={16}/>Sign out</button></>:<><Link href="/sign-in" className="px-3 py-2 text-sm font-bold">Sign in</Link><Link href="/sign-up" className="btn btn-primary">Get started</Link></>}</div>
   <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<div className="container flex flex-col gap-4 border-t py-5 md:hidden">{links.map(([n,h])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{n}</Link>)}<Link href={user?"/dashboard":"/sign-in"} className="btn btn-primary">{user?"Dashboard":"Sign in"}</Link></div>}
 </header>
}
