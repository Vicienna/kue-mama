'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Edit, Trash, Plus } from 'lucide-react';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    if (confirm('Yakin mau hapus kue ini?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  }

  if (loading) return <div className="p-10 text-center">Loading data kue...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Sama dengan Dashboard) */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="text-xl font-bold text-pink-500 mb-10">Admin Panel</div>
        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 rounded-xl">Statistik</Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-xl font-medium">Kelola Produk</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Kelola Produk</h1>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} /> Tambah Kue
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Produk</th>
                <th className="p-4 font-semibold text-gray-600">Harga</th>
                <th className="p-4 font-semibold text-gray-600">PO (H-X)</th>
                <th className="p-4 font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">Rp {p.price.toLocaleString('id-ID')}</td>
                  <td className="p-4">{p.is_po ? `H-${p.po_days}` : 'Ready'}</td>
                  <td className="p-4 flex gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Helper Link component for admin
function Link({ href, children, className }: any) {
  return <a href={href} className={className}>{children}</a>;
}