import React from 'react';
import { Button } from '../components/ui/Button';
import { Cake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center pt-20">
      <div className="bg-white p-12 rounded-full shadow-pink-200 shadow-2xl mb-8 animate-bounce">
        <Cake size={64} className="text-pink-400" />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
        Kue <span className="text-pink-400">Mama</span>
      </h1>
      <p className="text-gray-600 text-xl mb-10 max-w-md">
        Kue homemade premium, dibuat dengan cinta.
      </p>
      <div className="flex gap-4">
        <Link to="/shop">
          <Button variant="primary" size="lg" className="px-10">Lihat Katalog 🍰</Button>
        </Link>
      </div>
    </div>
  );
}