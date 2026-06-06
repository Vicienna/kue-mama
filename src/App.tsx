import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/shop/Navbar';
import LandingPage from './app/page';
import ShopPage from './app/shop/page';
import CheckoutPage from './app/shop/checkout/page';
import AdminDashboard from './app/admin/page';
import AdminLogin from './app/admin/login/page';
import ProductManagement from './app/admin/products/page';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-pink-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/products" element={<ProductManagement />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;