import React from 'react';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrderPage'; 
import OrderSuccess from './pages/OrderSuccess';
import { useEffect } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

function App() {

  useEffect(() => {
  const autoLogin = async () => {
    const token = localStorage.getItem('token');
    const manualLogout = localStorage.getItem('manualLogout');

    // ❌ DO NOT auto login if user logged out manually
    if (!token && !manualLogout) {
      try {
        const res = await axios.get(`${API}/auth/guest`);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        window.location.reload();
      } catch (err) {
        console.error("Guest login failed");
      }
    }
  };

  autoLogin();
}, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#f1f2f4] flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full flex-grow">
          <div className="pt-2 px-2 sm:px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:category" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;