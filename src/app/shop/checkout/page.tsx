import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatWhatsAppMessage } from '@/lib/po-logic';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Calendar, User, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    deliveryDate: '',
    notes: '',
  });
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const maxPoDays = Math.max(...cart.map(item => item.po_days || 0), 0);
    const date = new Date();
    date.setDate(date.getDate() + maxPoDays);
    setMinDate(date.toISOString().split('T')[0]);
  }, [cart]);

  const handleWhatsAppOrder = () => {
    const orderData = {
      customerName: formData.name,
      items: cart.map(item => ({ name: item.name, qty: item.quantity })),
      deliveryDate: formData.deliveryDate,
      notes: formData.notes,
      totalPrice: totalPrice,
    };
    
    window.location.href = formatWhatsAppMessage(orderData);
  };

  if (cart.length === 0) return <div className="p-10 text-center">Keranjang kosong, yuk belanja dulu!</div>;

  return (
    <div className="min-h-screen bg-pink-50 p-6 md:p-12 pt-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="text-pink-400" /> Ringkasan Pesanan
          </h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-pink-50 rounded-xl">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-medium">Total Bayar</span>
            <span className="text-2xl font-bold text-pink-500">Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <User className="text-pink-400" /> Detail Pengiriman
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 outline-none"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea 
                  className="w-full p-3 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 outline-none"
                  rows={3}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pengiriman</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="date" 
                  min={minDate}
                  className="w-full p-3 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 outline-none"
                  onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                />
              </div>
              <p className="text-xs text-pink-400 mt-1">*Minimal order H-{Math.max(...cart.map(i => i.po_days || 0), 0)} hari</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (Custom Tulisan/Rasa)</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 outline-none"
                placeholder="Contoh: Tulisan Happy Birthday Mama"
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            <Button 
              variant="primary" 
              className="w-full py-4 text-lg" 
              onClick={handleWhatsAppOrder}
            >
              Kirim Pesanan via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}