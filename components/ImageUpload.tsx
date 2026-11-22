"use client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { api } from "@/lib/api";

// Challenge 3: direct file upload (server forwards it to ImgBB). A pasted URL also works.
export default function ImageUpload({ value, onChange, round = false }: { value: string; onChange: (url: string) => void; round?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(file?: File) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5 MB");
    const fd = new FormData();
    fd.append("image", file);
    setBusy(true);
    try { const { url } = await api<{ url: string }>("/api/upload", { method: "POST", body: fd }); onChange(url); toast.success("Image uploaded"); }
    catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); if (ref.current) ref.current.value = ""; }
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className={`grid shrink-0 place-items-center overflow-hidden border border-dashed border-base-300 bg-base-200 ${round ? "h-24 w-24 rounded-full" : "aspect-video w-48 rounded-xl"}`}>
        {value
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={value} alt="Preview" className="h-full w-full object-cover" />
          : <ImagePlus className="opacity-40" />}
      </div>
      <div className="flex-1 space-y-2">
        <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        <button type="button" className="btn btn-outline btn-sm" disabled={busy} onClick={() => ref.current?.click()}>{busy ? <span className="loading loading-spinner loading-xs" /> : "Upload image"}</button>
        <input className="input input-bordered input-sm w-full" placeholder="...or paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
