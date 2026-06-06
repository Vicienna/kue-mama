export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  is_po: boolean;
  po_days: number; // H-X
  created_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  total_price: number;
  shipping_cost: number;
  delivery_date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
  notes: string;
};

export type OrderItem = {
  product_id: string;
  quantity: number;
  variant: string;
  custom_note: string;
};