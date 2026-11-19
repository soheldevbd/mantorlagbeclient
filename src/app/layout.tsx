import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export const metadata:Metadata={title:"MentorLagbe — Find Your Ideal Tutor",description:"A smarter way to find trusted tutors and mentorship in Bangladesh."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Providers><Navbar/>{children}<Footer/></Providers></body></html>}
