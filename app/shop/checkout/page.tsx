import React, { useState, useEffect } from 'react';
import { useCart } from '../../../hooks/useCart';
import { formatWhatsAppMessage } from '../../../lib/po-logic';
import { Button } from '../../../components/ui/Button';
import { ShoppingBag, User, Trash2, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [formData, setFormData] = useState({ name: '', address: '', deliveryDate: '', notes: '', shipping: 'Sameday' });
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const maxPoDays = Math.max(...cart.map(item => item.po_days || 0), 0);
    const date = new Date();
    date.setDate(date.getDate() + maxPoDays);
    setMinDate(date.toISOString().split('T')[0]);
  }, [cart]);

  const shippingCosts = { 'Sameday': 15000, 'Instant': 25000, 'Reguler': 10000 };
  const finalTotal = totalPrice + shippingCosts[formData.shipping];

  const handleWhatsAppOrder = () => {
    const orderData = {
      customerName: formData.name,
      items: cart.map(item => ({ name: item.name, qty: item.quantity })),
      deliveryDate: formData.deliveryDate,
      notes: `${formData.notes} | Kurir: ${formData.shipping}`,
      totalPrice: finalTotal,
    };
    window.location.href = formatWhatsAppMessage(orderData);
  };

  if (cart.length === 0) return <div className="p-10 text-center pt-24">Keranjang kosong!</div>;

  return (
    <div className="min-h-screen bg-pink-50 p-6 md:p-12 pt-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShoppingBag className="text-pink-400" /> Pesanan Anda</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-pink-50 rounded-2xl">
                  <div className="flex-1"><p className="font-bold text-gray-800">{item.name}</p><p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p></div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-pink-500"><Minus size={14}/></button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-pink-500"><Plus size={14}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6 h-fit">
          <h2 className="text-2xl font-bold flex items-center gap-2"><User className="text-pink-400" /> Checkout</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Nama Lengkap" className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-300" onChange={e => setFormData({...formData, name: e.target.value})} />
            <textarea placeholder="Alamat Lengkap" className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-300" rows={3} onChange={e => setFormData({...formData, address: e.target.value})} />
            <input type="date" min={minDate} className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-300" onChange={e => setFormData({...formData, deliveryDate: e.target.value})} />
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Pilih Kurir:</label>
              <select className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-300" value={formData.shipping} onChange={e => setFormData({...formData, shipping: e.target.value})}>
                <option value="Sameday">Sameday (Rp 15rb)</option>
                <option value="Instant">Instant (Rp 25rb)</option>
                <option value="Reguler">Reguler (Rp 10rb)</option>
              </select>
            </div>
            <input type="text" placeholder="Catatan" className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-pink-300" onChange={e => setFormData({...formData, notes: e.target.value})} />
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>Rp {totalPrice.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between text-gray-500"><span>Ongkir</span><span>Rp {shippingCosts[formData.shipping].toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between font-black text-2xl text-pink-500 pt-2"><span>Total</span><span>Rp {finalTotal.toLocaleString('id-ID')}</span></div>
          </div>
          <Button variant="primary" className="w-full py-4 text-lg" onClick={handleWhatsAppOrder}>Kirim via WhatsApp</Button>
        </div>
      </div>
    </div>
  );
}