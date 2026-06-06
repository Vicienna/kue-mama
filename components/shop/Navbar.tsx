import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, Cake, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/shop" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Cake className="text-pink-400" />
          <span className="text-gray-800">Kue Mama</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/shop/checkout" className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-pink-100 p-6 flex flex-col gap-4 shadow-xl">
          <Link to="/" className="text-gray-600 font-medium p-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" className="text-gray-600 font-medium p-2" onClick={() => setIsOpen(false)}>Katalog</Link>
          <Link to="/shop/checkout" className="text-gray-600 font-medium p-2" onClick={() => setIsOpen(false)}>Keranjang</Link>
        </div>
      )}
    </nav>
  );
};