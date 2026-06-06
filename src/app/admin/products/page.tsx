import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Edit, Trash, Plus } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Link } from 'react-router-dom';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '', price: 0, description: '', category: 'Cake', is_po: false, po_days: 0, image_url: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
    setLoading(false);
  }

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: 0, description: '', category: 'Cake', is_po: false, po_days: 0, image_url: '' });
    }
    setIsModalOpen(true);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingProduct) {
      await supabase.from('products').update(formData).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([formData]);
    }
    setIsModalOpen(false);
    fetchProducts();
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
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="text-xl font-bold text-pink-500 mb-10">Admin Panel</div>
        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 rounded-xl">Statistik</Link>
          <Link to="/admin/products" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-xl font-medium">Kelola Produk</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Kelola Produk</h1>
          <Button variant="primary" className="flex items-center gap-2" onClick={() => openModal()}>
            <Plus size={18} /> Tambah Kue
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600">
                <th className="p-4 font-semibold">Produk</th>
                <th className="p-4 font-semibold">Harga</th>
                <th className="p-4 font-semibold">PO (H-X)</th>
                <th className="p-4 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">Rp {p.price.toLocaleString('id-ID')}</td>
                  <td className="p-4">{p.is_po ? `H-${p.po_days}` : 'Ready'}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openModal(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={editingProduct ? "Edit Kue" : "Tambah Kue Baru"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kue</label>
              <input 
                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input 
                  type="number" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300"
                  value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})} required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select 
                  className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300"
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Cake">Cake</option>
                  <option value="Brownies">Brownies</option>
                  <option value="Cookies">Cookies</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto Kue</label>
              <input 
                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              />
            </div>
            <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
              <input 
                type="checkbox" id="is_po" 
                checked={formData.is_po} onChange={(e) => setFormData({...formData, is_po: e.target.checked})}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor="is_po" className="text-sm font-medium text-gray-700">Sistem Pre-Order (PO)</label>
            </div>
            {formData.is_po && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline PO (H-X Hari)</label>
                <input 
                  type="number" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300"
                  value={formData.po_days} onChange={(e) => setFormData({...formData, po_days: parseInt(e.target.value)})}
                />
              </div>
            )}
            <Button variant="primary" className="w-full py-3 mt-4">Simpan Produk</Button>
          </form>
        </Modal>
      </main>
    </div>
  );
}