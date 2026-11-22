import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Navbar";
import { XLogo } from "./ui";


export default function Footer() {
  return (
    <footer className="mt-20 border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm opacity-70">Find verified tutors and mentorship batches by subject, level and budget, online or near you.</p>
          <div className="flex gap-2">
            <a href="https://x.com" aria-label="X" className="btn btn-circle btn-sm btn-outline"><XLogo size={15} /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="btn btn-circle btn-sm btn-outline text-sm font-bold">f</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="btn btn-circle btn-sm btn-outline text-xs font-bold">in</a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/tuitions" className="hover:text-primary">Browse Tuitions</Link></li>
            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-primary">How It Works</Link></li>
            <li><Link href="/sign-up" className="hover:text-primary">Become a Tutor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">For You</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/sign-up" className="hover:text-primary">Student Sign Up</Link></li>
            <li><Link href="/sign-in" className="hover:text-primary">Sign In</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail size={16} />support@mentorlagbe.com</li>
            <li className="flex items-center gap-2"><Phone size={16} />+880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin size={16} />Dhanmondi, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-base-300 py-5 text-center text-sm opacity-60">© {new Date().getFullYear()} MentorLagbe. All rights reserved.</div>
    </footer>
  );
}
