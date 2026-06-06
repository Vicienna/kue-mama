'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Cake } from 'lucide-react';

export const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/shop" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Cake className="text-pink-400" />
          <span>Kue <span className="text-pink-400">Mama</span></span>
        </Link>

        <Link 
          href="/shop/checkout" 
          className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors"
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-pink-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};