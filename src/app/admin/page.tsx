import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="text-xl font-bold text-pink-500 mb-10 flex items-center gap-2">
          <LayoutDashboard /> Admin Panel
        </div>
        <nav className="space-y-2 flex-1">
          <Link to="/admin" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-xl font-medium">
            <TrendingUp size={20} /> Statistik
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-all">
            <Package size={20} /> Kelola Produk
          </Link>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-auto"
        >
          <LogOut size={20} /> Keluar
        </button>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Halo, Mama! 👋</h1>
          <p className="text-gray-500">Berikut adalah ringkasan toko kue hari ini.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Produk" value="12" icon={<Package className="text-blue-500" />} color="bg-blue-50" />
          <StatCard title="Stok Tersedia" value="145" icon={<ShoppingCart className="text-green-500" />} color="bg-green-50" />
          <StatCard title="Kue Terlaris" value="Fudgy Brownies" icon={<TrendingUp className="text-pink-500" />} color="bg-pink-50" />
        </div>

        <div className="mt-10 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Aktivitas Terbaru</h2>
          <div className="text-gray-500 italic">Belum ada aktivitas tercatat hari ini.</div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}