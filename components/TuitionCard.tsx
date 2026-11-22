import Link from 'next/link';
import { MapPin, Monitor, GraduationCap } from 'lucide-react';
import type { Tuition } from '@/lib/types';
import { money } from '@/lib/constants';

// All cards are the same height: fixed 16:9 image, flexible body, button pinned to the bottom
export default function TuitionCard({ t }: { t: Tuition }) {
  return (
    <div className="card bg-base-100 border border-base-300 h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <figure className="aspect-video w-full bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.bannerImage}
          alt={t.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </figure>
      <div className="card-body flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="badge badge-primary badge-soft">{t.subject}</span>
          <span className="badge badge-outline gap-1">
            {t.mode === 'Online' ? <Monitor size={12} /> : <MapPin size={12} />}
            {t.mode}
          </span>
        </div>
        <h3 className="card-title text-lg leading-snug line-clamp-2 min-h-[3.2rem]">
          {t.title}
        </h3>
        <div className="flex items-center gap-2 text-sm opacity-70">
          <GraduationCap size={16} />
          {t.classLevel}
          <span>·</span>
          <span className="truncate">by {t.tutorName}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-xl font-bold text-primary">
            {money(t.monthlyFee)}
            <span className="text-xs font-normal opacity-60"> /month</span>
          </p>
          <Link href={`/tuitions/${t._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
