import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import { assets } from '../assets/assets';

const cartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  // Price Calculation Logic
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + ((item.original_price - item.price) * item.quantity), 0);


  const handlePlaceOrder = async () => {
  try {
    await axios.post('http://localhost:5000/api/orders/place', 
      { total_amount: totalPrice },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Order Placed! Thank you for shopping.");
    window.location.href = "/"; // Send them home or to an "Orders" page
  } catch (err) {
    alert("Checkout failed.");
  }
};
const handleOrderClick = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, we need to tell the user to login. 
    // Usually, you'd trigger your AuthModal here.
    alert("Please Login to place your order!");
    // setIsAuthOpen(true); <--- If you pass the state down
  } else {
    // If logged in, proceed to checkout
    handlePlaceOrder(); 
  }
};

  return (
    <div className="bg-[#f1f2f4] min-h-screen py-4 px-2 sm:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4">
        
        {/* Left: Item List */}
        <div className="flex-1 bg-white shadow-sm rounded-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">Flipkart ({cartItems.length})</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/empty-cart_ee6143.png" alt="empty" className="w-64" />
              <p className="mt-4 text-lg">Your cart is empty!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cart_id} className="p-4 border-b flex flex-col sm:flex-row gap-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img src={assets[item.image_url]} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-md font-medium truncate max-w-md">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">Seller: Appario Retail</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-gray-400 line-through text-sm">₹{item.original_price * item.quantity}</span>
                    <span className="text-xl font-bold">₹{item.price * item.quantity}</span>
                    <span className="text-green-600 font-bold text-sm">{item.discount}% Off</span>
                  </div>
                  <button className="mt-4 flex items-center gap-1 font-bold text-gray-700 hover:text-red-500 transition uppercase text-sm">
                    <AiOutlineDelete className="text-lg" /> Remove
                  </button>
                </div>
                <div className="text-sm">Delivery by Sat Apr 18 | <span className="text-green-600">Free</span></div>
              </div>
            ))
          )}
          
          {cartItems.length > 0 && (
            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
  <button 
    onClick={handleOrderClick}
    className="bg-[#fb641b] text-white px-12 py-3 font-bold rounded-sm uppercase tracking-wider hover:bg-[#f05a18] transition-colors"
  >
    Place Order
  </button>
</div>
          )}
        </div>

        {/* Right: Price Details */}
        <div className="w-full lg:w-96 bg-white h-fit shadow-sm rounded-sm sticky top-4">
          <h2 className="p-4 text-gray-500 font-bold uppercase border-b">Price Details</h2>
          <div className="p-4 flex flex-col gap-4 border-b">
            <div className="flex justify-between">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalPrice + totalDiscount}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">- ₹{totalDiscount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-dashed pt-4">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <p className="p-4 text-green-600 font-bold text-sm">You will save ₹{totalDiscount} on this order</p>
        </div>

      </div>
    </div>
  );
};

export default cartPage;