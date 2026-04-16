import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { assets } from '../assets/assets';

const API = import.meta.env.VITE_API_URL;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />

      <div className="bg-[#f1f2f4] min-h-screen p-4">
        <div className="max-w-[1000px] mx-auto">

          <h2 className="text-xl font-bold mb-4">My Orders</h2>

          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white p-4 mb-4 shadow-sm">

                <div className="flex justify-between mb-2">
                  <span>Order ID: {order.id}</span>
                  <span className="text-green-600 font-bold">{order.status}</span>
                </div>

                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 border-t py-3">

                    {/* 🔥 IMAGE FIX */}
                    <img 
                      src={assets[item.image_url]} 
                      className="w-20 h-20 object-contain"
                    />

                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.price_at_purchase}</p>
                    </div>
                  </div>
                ))}

              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
};

export default OrdersPage;