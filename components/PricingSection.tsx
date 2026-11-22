import { Check } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

const plans = [
  { name: "Free", price: 0, who: "For everyone", feats: ["Browse and search all tuitions", "Students: 5 saved tuitions", "Tutors: post up to 2 tuitions", "Application tracking"], pro: false },
  { name: "Pro Tutor", price: 15, who: "For tutors", feats: ["Unlimited tuition posts", "Verified tutor badge", "Priority in listings", "Applicant management tools"], pro: true },
  { name: "Pro Student", price: 10, who: "For students", feats: ["Unlimited saved tuitions", "Priority booking", "Everything in Free", "Faster tutor responses"], pro: true },
];

export default function PricingSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <div key={p.name} className={`card h-full border bg-base-100 ${p.name === "Pro Tutor" ? "border-primary shadow-lg" : "border-base-300"}`}>
          <div className="card-body">
            <div className="flex items-center justify-between"><h3 className="card-title">{p.name}</h3>{p.name === "Pro Tutor" && <span className="badge badge-primary">Popular</span>}</div>
            <p className="text-sm opacity-60">{p.who}</p>
            <p className="my-3 text-4xl font-extrabold">${p.price}<span className="text-sm font-normal opacity-60"> one-time</span></p>
            <ul className="space-y-2 text-sm">{p.feats.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="shrink-0 text-primary" />{f}</li>)}</ul>
            <div className="card-actions mt-auto pt-6">
              {p.pro ? <CheckoutButton role={p.name === "Pro Tutor" ? "tutor" : "student"} /> : <Link href="/sign-up" className="btn btn-outline w-full">Get Started Free</Link>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
