import type { Metadata } from 'next';
import PricingSection from '@/components/PricingSection';
export const metadata: Metadata = { title: 'Pricing' };
export default function Pricing() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="section-title">Pricing and Pro Plans</h1>
        <p className="section-sub">
          One-time secure payment with Stripe. Your plan upgrades the moment
          payment completes.
        </p>
      </div>
      <PricingSection />
    </div>
  );
}
