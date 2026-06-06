import React, { useState, useEffect } from 'react';
import { getSupabase } from '../../lib/supabase';
import { ProductCard } from '../../components/shop/ProductCard';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);
  if (loading) return <div className="flex h-screen items-center justify-center text-pink-500 pt-20">Sedang menyiapkan kue manis...</div>;
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-pink-50 p-6 md:p-12 pt-24">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Katalog <span className="text-pink-400">Kue Mama</span> 🍰</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-pink-400 text-white shadow-md' : 'bg-white text-gray-600 border border-pink-200'}`}>{cat}</button>
          ))}
        </div>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={addToCart} />)}
      </main>
    </div>
  );
}