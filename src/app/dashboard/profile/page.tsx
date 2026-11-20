'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export default function Profile() {
  const [f, setF] = useState<any>({ name: '', phone: '', bio: '', image: '' });
  useEffect(() => {
    api<any>('/profile/me')
      .then(x =>
        setF({
          name: x.name || '',
          phone: x.phone || '',
          bio: x.bio || '',
          image: x.image || '',
        }),
      )
      .catch(() => {});
  }, []);
  async function upload(file?: File) {
    if (!file) return;
    const d = new FormData();
    d.append('image', file);
    try {
      const r = await api<any>('/upload', { method: 'POST', body: d });
      setF((x: any) => ({ ...x, image: r.url }));
      toast.success('Photo uploaded');
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api('/profile/me', { method: 'PATCH', body: JSON.stringify(f) });
      toast.success('Profile updated');
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <form onSubmit={save} className="card max-w-2xl space-y-4 p-6">
      <h2 className="text-xl font-extrabold">Update profile</h2>
      <label className="block text-sm font-bold">
        Full name
        <input
          className="field mt-2"
          required
          value={f.name}
          onChange={e => setF({ ...f, name: e.target.value })}
        />
      </label>
      <label className="block text-sm font-bold">
        Phone
        <input
          className="field mt-2"
          value={f.phone}
          onChange={e => setF({ ...f, phone: e.target.value })}
        />
      </label>
      <label className="block text-sm font-bold">
        Bio
        <textarea
          className="field mt-2 min-h-28"
          value={f.bio}
          onChange={e => setF({ ...f, bio: e.target.value })}
        />
      </label>
      <label className="block text-sm font-bold">
        Profile photo
        <input
          className="field mt-2"
          type="file"
          accept="image/*"
          onChange={e => upload(e.target.files?.[0])}
        />
      </label>
      {f.image && (
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            src={f.image}
            fill
            unoptimized
            className="object-cover"
            alt="Profile"
            sizes="80px"
          />
        </div>
      )}
      <button className="btn btn-primary">Save changes</button>
    </form>
  );
}
