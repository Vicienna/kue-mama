import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Cake } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <Cake size={120} className="text-pink-200 absolute -top-10 -left-10 rotate-12" />
        <h1 className="text-9xl font-black text-pink-400 opacity-50">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-800">Ups! Kuenya Hilang!</p>
        </div>
      </div>
      <p className="text-gray-500 mt-8 mb-10 max-w-md">Sepertinya halaman yang kamu cari sudah dimakan seseorang. Yuk, balik ke katalog aja!</p>
      <Link to="/shop"><Button variant="primary" size="lg">Kembali ke Katalog 🍰</Button></Link>
    </div>
  );
}