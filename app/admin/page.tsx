import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSupabase } from '../../lib/supabase';
import { LayoutDashboard, Package, TrendingUp, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white border-r border-pink-100 p-6 flex flex-col shadow-sm">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-pink-500 tracking-tight">Kue <span className="text-gray-800">Mama</span></h2>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="space-y-3 flex-1">
          <Link to="/admin" className="flex items-center gap-3 p-4 bg-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-pink-200 transition-all hover:bg-pink-600"><TrendingUp size={20} /> Statistik Toko</Link>
          <Link to="/admin/products" className="flex items-center gap-3 p-4 text-gray-500 hover:bg-pink-50 hover:text-pink-500 rounded-2xl font-medium transition-all"><Package size={20} /> Kelola Produk</Link>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all text-left font-medium mt-auto"><LogOut size={20} /> Keluar Sesi</button>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div><h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">Halo, Mama! 👋</h1><p className="text-gray-500 text-base md:text-lg">Selamat datang kembali di pusat kendali kue manis.</p></div>
          <div className="text-left md:text-right"><span className="text-xs font-bold text-pink-400 bg-pink-50 px-4 py-2 rounded-full border border-pink-100">Status: Active</span></div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Produk" value="12" trend="+2 bulan ini" color="bg-gradient-to-br from-blue-400 to-blue-600" />
          <StatCard title="Stok Tersedia" value="145" trend="Sangat Aman" color="bg-gradient-to-br from-emerald-400 to-emerald-600" />
          <StatCard title="Kue Terlaris" value="Fudgy Brownies" trend="Best Seller" color="bg-gradient-to-br from-pink-400 to-pink-600" />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, color }: any) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
      <div className={`w-12 h-12 rounded-2xl ${color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}></div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl md:text-3xl font-black text-gray-800 mb-2">{value}</p>
      <p className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md w-fit">{trend}</p>
    </div>
  );
}