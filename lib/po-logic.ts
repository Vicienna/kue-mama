export const isOrderPossible = (deliveryDate: string, poDays: number): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(deliveryDate);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= poDays;
};

export const formatWhatsAppMessage = (orderData: any) => {
  const baseUrl = 'https://wa.me/628xxxxxxxxxx'; 
  const text = `Halo Mama! Saya mau order kue:\n\n` + 
               `Nama: ${orderData.customerName}\n` + 
               `Pesanan: ${orderData.items.map((i: any) => `${i.name} (x${i.qty})`).join(', ')}\n` + 
               `Tanggal Kirim: ${orderData.deliveryDate}\n` + 
               `Catatan: ${orderData.notes}\n\n` + 
               `Total: Rp ${orderData.totalPrice.toLocaleString('id-ID')}`;
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
};