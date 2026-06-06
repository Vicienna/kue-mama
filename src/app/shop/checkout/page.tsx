import React, { useState, useEffect } from 'react';
import { useCart } from '../../../hooks/useCart';
import { formatWhatsAppMessage } from '../../../lib/po-logic';
import { Button } from '../../../components/ui/Button';
import { ShoppingBag, Calendar, User, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [formData, setFormData] = useState({ name: '', address: '', deliveryDate: '', notes: '' });
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

  if (cart.length === 0) return <div className="p-10 text-center">Keranjang kosong!</div>;

  return (
    <div className="min-h-screen bg-pink-50 p-6 md:p-12 pt-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShoppingBag className="text-pink-400" /> Ringkasan</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between p-3 bg-pink-50 rounded-xl">
                <span>{item.name} (x{item.quantity})</span>
                <span className="font-bold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-xl text-pink-500">
            <span>Total</span><span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 space-y-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><User className="text-pink-400" /> Pengiriman</h2>
          <input type="text" placeholder="Nama" className="w-full p-3 rounded-xl border" onChange={e => setFormData({...formData, name: e.target.value})} />
          <textarea placeholder="Alamat" className="w-full p-3 rounded-xl border" rows={3} onChange={e => setFormData({...formData, address: e.target.value})} />
          <div className="relative">
            <input type="date" min={minDate} className="w-full p-3 rounded-xl border" onChange={e => setFormData({...formData, deliveryDate: e.target.value})} />
          </div>
          <input type="text" placeholder="Catatan" className="w-full p-3 rounded-xl border" onChange={e => setFormData({...formData, notes: e.target.value})} />
          <Button variant="primary" className="w-full py-4" onClick={handleWhatsAppOrder}>Kirim via WhatsApp</Button>
        </div>
      </div>
    </div>
  );
}