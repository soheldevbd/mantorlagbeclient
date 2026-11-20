'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
export default function AdminUsers() {
  const [items, setItems] = useState<any[]>([]);
  async function load() {
    try {
      setItems(await api('/admin/users'));
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function role(id: string, role: string) {
    try {
      await api(`/admin/users/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      });
      toast.success('Role updated');
      load();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <div className="card overflow-hidden">
      {items.map(x => (
        <div
          key={x._id}
          className="flex flex-wrap items-center justify-between gap-3 border-b p-4"
        >
          <div>
            <b>{x.name}</b>
            <p className="text-xs text-slate-500">{x.email}</p>
          </div>
          <select
            className="field max-w-40"
            value={x.role}
            onChange={e => role(x._id, e.target.value)}
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
}
