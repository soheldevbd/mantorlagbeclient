'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import TuitionForm from '@/components/TuitionForm';
import { PageHeader } from '@/components/ui';

export default function PostTuition() {
  const router = useRouter();
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Post a Tuition"
        sub="New posts go to admin review before they appear publicly"
      />
      <div className="card border border-base-300 bg-base-100">
        <div className="card-body">
          <TuitionForm
            label="Submit for Approval"
            onSubmit={async v => {
              await api('/api/tutor/tuitions', { method: 'POST', json: v });
              toast.success('Tuition submitted for approval');
              router.push('/dashboard/tutor/my-tuitions');
            }}
          />
        </div>
      </div>
    </div>
  );
}
