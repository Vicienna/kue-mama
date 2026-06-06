import React, { useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-pink-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Kue Mama</h1>
          <p className="text-gray-500">Silahkan login untuk mengelola toko</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-300" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button variant="primary" className="w-full py-3" disabled={loading}>{loading ? 'Loading...' : 'Masuk Dashboard'}</Button>
        </form>
      </div>
    </div>
  );
}