import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API = import.meta.env.VITE_API_URL;

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const token = localStorage.getItem('token');

  // 🔥 FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    };

    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // 🔥 PAYMENT (NEXT STEP)
  const handlePayment = async () => {
    alert("Razorpay coming next 🚀");
  };

  return (
    <>
      <Header />

      <div className="bg-[#f1f2f4] min-h-screen p-4">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4">

          {/* LEFT: ADDRESS */}
          <div className="flex-1 bg-white p-6 shadow-sm rounded">
            <h2 className="text-lg font-bold mb-4">Delivery Address</h2>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-2 mb-3"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border p-2 mb-3"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="w-full lg:w-96 bg-white p-6 shadow-sm rounded">
            <h2 className="font-bold mb-4">Order Summary</h2>

            {cartItems.map(item => (
              <div key={item.cart_id} className="flex justify-between text-sm mb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="border-t mt-4 pt-4 font-bold flex justify-between">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-[#fb641b] text-white py-3 mt-6 font-bold"
            >
              Proceed to Payment
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CheckoutPage;