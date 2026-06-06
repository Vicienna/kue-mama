import React from 'react';
import { Product } from '@/types';
import { Button } from '../ui/Button';
import { Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-pink-100">
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.is_po && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-pink-600">
            <Clock size={12} />
            PO H-{product.po_days}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onAddToCart(product)}
          >
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};