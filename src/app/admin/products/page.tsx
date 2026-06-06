import React, { useState, useEffect } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { Product } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Link } from 'react-router-dom';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: '', price: 0, description: '', category: 'Cake', is_po: false, po_days: 0, image_url: '' });

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    try {
      const supabase = getSupabase();
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  const openModal = (product: Product | null = null) => {
    if (product) { setEditingProduct(product); setFormData({ ...product }); } 
    else { setEditingProduct(null); setFormData({ name: '', price: 0, description: '', category: 'Cake', is_po: false, po_days: 0, image_url: '' }); }
    setIsModalOpen(true);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabase();
    if (editingProduct) { await supabase.from('products').update(formData).eq('id', editingProduct.id); } 
    else { await supabase.from('products').insert([formData]); }
    setIsModalOpen(false);
    fetchProducts();
  }

  async function deleteProduct(id: string) {
    if (confirm('Hapus kue ini?')) {
      const supabase = getSupabase();
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="text-xl font-bold text-pink-500 mb-10">Admin Panel</div>
        <nav className="space-y-2">
          <Link to="/admin" className="block p-3 text-gray-600 hover:bg-pink-50 rounded-xl">Statistik</Link>
          <Link to="/admin/products" className="block p-3 bg-pink-50 text-pink-600 rounded-xl font-medium">Kelola Produk</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Kelola Produk</h1>
          <Button variant="primary" onClick={() => openModal()}>+ Tambah Kue</Button>
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-600">
                  <th className="p-4 font-semibold">Produk</th><th className="p-4 font-semibold">Harga</th><th className="p-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{p.name}</td><td className="p-4">Rp {p.price.toLocaleString('id-ID')}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => openModal(p)} className="text-blue-500 text-sm font-bold">[Edit]</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-500 text-sm font-bold">[Hapus]</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden grid grid-cols-1 gap-4 p-4">
            {products.map(p => (
              <div key={p.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex justify-between items-center">
                <div><p className="font-bold text-gray-800">{p.name}</p><p className="text-sm text-gray-500">Rp {p.price.toLocaleString('id-ID')}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(p)} className="p-2 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="p-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? "Edit Kue" : "Tambah Kue"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full p-3 rounded-xl border" placeholder="Nama Kue" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="number" className="w-full p-3 rounded-xl border" placeholder="Harga" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})} required />
            <select className="w-full p-3 rounded-xl border" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Cake">Cake</option><option value="Brownies">Brownies</option><option value="Cookies">Cookies</option>
            </select>
            <input className="w-full p-3 rounded-xl border" placeholder="URL Foto" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
            <div className="flex items-center gap-2 p-2">
              <input type="checkbox" checked={formData.is_po} onChange={e => setFormData({...formData, is_po: e.target.checked})} />
              <span className="text-sm">Sistem PO?</span>
            </div>
            {formData.is_po && <input type="number" className="w-full p-3 rounded-xl border" placeholder="H-X Hari" value={formData.po_days} onChange={e => setFormData({...formData, po_days: parseInt(e.target.value)})} />}
            <Button variant="primary" className="w-full py-3" type="submit">Simpan Produk</Button>
          </form>
        </Modal>
      </main>
    </div>
  );
}