const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export function getToken(){ if(typeof window==="undefined") return ""; return localStorage.getItem("mentorlagbe_token") || ""; }
export async function api<T=any>(path:string, options:RequestInit={}):Promise<T>{
 const headers = new Headers(options.headers);
 if(!(options.body instanceof FormData)) headers.set("Content-Type","application/json");
 const token=getToken(); if(token) headers.set("Authorization",`Bearer ${token}`);
 const response=await fetch(`${BASE}/api${path}`,{...options,headers,cache:"no-store"});
 const data=await response.json().catch(()=>({message:"Unexpected server response"}));
 if(!response.ok) throw new Error(data.message || "Request failed");
 return data as T;
}
export async function syncToken(){
 const data=await api<{token:string,user:any}>("/auth-tools/token");
 localStorage.setItem("mentorlagbe_token",data.token); return data.user;
}
