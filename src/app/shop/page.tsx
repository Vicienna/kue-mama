'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/shop/ProductCard';
import { Product } from '@/types';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    alert(`Kue ${product.name} masuk ke keranjang!`);
    // Nanti logic cart akan gue tambahkan di putaran berikutnya
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center text-pink-500 font-medium">
      Sedang menyiapkan kue manis untukmu...
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-50 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Katalog <span className="text-pink-400">Kue Mama</span> 🍰
        </h1>
        <p className="text-gray-600 text-lg">Dibuat dengan cinta, dikirim dengan bahagia.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            Belum ada kue yang tersedia. Cek lagi nanti ya!
          </div>
        )}
      </main>
    </div>
  );
}