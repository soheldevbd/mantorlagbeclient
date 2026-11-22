"use client";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useMe } from "@/components/MeProvider";
import ImageUpload from "@/components/ImageUpload";
import { PageHeader } from "@/components/ui";

export default function Profile() {
  const { me, reload } = useMe();
  const [f, setF] = useState({ name: me.name, phone: me.phone || "", bio: me.bio || "", image: me.image || "" });
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (f.name.trim().length < 2) return toast.error("Name must be at least 2 characters");
    if (f.phone && !/^[0-9+\-\s]{7,20}$/.test(f.phone)) return toast.error("Enter a valid phone number");
    if (f.image && !/^https?:\/\/\S+$/i.test(f.image)) return toast.error("Image must be a valid URL");
    setBusy(true);
    const { error } = await authClient.updateUser({ name: f.name.trim(), phone: f.phone, bio: f.bio, image: f.image || undefined });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not update profile");
    toast.success("Profile updated");
    reload();
  }
  return (
    <div className="max-w-2xl">
      <PageHeader title="Update Profile" sub="Your name, phone, bio and profile picture" />
      <form onSubmit={save} className="card border border-base-300 bg-base-100"><div className="card-body gap-4">
        <div><p className="mb-1 text-sm font-medium">Profile picture</p><ImageUpload round value={f.image} onChange={(u) => setF({ ...f, image: u })} /></div>
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">Full name</span><input className="input input-bordered w-full" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">Email</span><input className="input input-bordered w-full" value={me.email} disabled /></label>
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">Phone</span><input className="input input-bordered w-full" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">Bio</span><textarea rows={4} className="textarea textarea-bordered w-full" value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} /></label>
        <button className="btn btn-primary w-fit" disabled={busy}>{busy ? <span className="loading loading-spinner" /> : "Save Changes"}</button>
      </div></form>
    </div>
  );
}
