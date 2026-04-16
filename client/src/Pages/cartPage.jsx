import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import Header from '../components/Header';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
    else setCartItems([]);
  }, [token]);

  // 🔥 REMOVE ITEM
  const handleRemove = async (cart_id) => {
    try {
      await axios.delete(`${API}/cart/remove/${cart_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  // 🔥 PRICE CALCULATION
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + ((item.original_price - item.price) * item.quantity),
    0
  );

  // 🔥 PLACE ORDER
  const handleOrderClick = () => {
  if (!token) {
    alert("Please login first!");
  } else {
    navigate('/checkout');
  }
};

  const handleQuantityChange = async (cart_id, newQuantity) => {
  try {
    await axios.put(
      `${API}/cart/update`,
      { cart_id, quantity: newQuantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchCart(); // refresh
  } catch (err) {
    console.error("Update failed", err);
  }
};

  return (
    <>
      <Header />

      <div className="bg-[#f1f2f4] min-h-screen py-4 px-2 sm:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-4">

          {/* LEFT */}
          <div className="flex-1 bg-white shadow-sm rounded-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">Cart ({cartItems.length})</h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                  className="w-40 opacity-80"
                  alt="empty"
                />
                <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-gray-500">Add items to get started</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cart_id}
                  className="p-4 border-b flex gap-6 hover:bg-gray-50 transition"
                >

                  {/* IMAGE */}
                  <div className="w-28 h-28 bg-white p-2 rounded shadow-sm">
                    <img
  src={assets[item.image_url]}
  alt={item.title}
  className="w-full h-full object-contain"
/>
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h3 className="text-md font-medium line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Seller: Flipkart
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-gray-400 line-through text-sm">
                        ₹{item.original_price * item.quantity}
                      </span>

                      <span className="text-lg font-bold">
                        ₹{item.price * item.quantity}
                      </span>

                      <span className="text-green-600 text-sm font-semibold">
                        {item.discount}% off
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-4">

  {/* ➖ BUTTON */}
  <button
    onClick={() => handleQuantityChange(item.cart_id, item.quantity - 1)}
    className="w-8 h-8 border flex items-center justify-center font-bold"
  >
    -
  </button>

  {/* QUANTITY */}
  <span className="px-3">{item.quantity}</span>

  {/* ➕ BUTTON */}
  <button
    onClick={() => handleQuantityChange(item.cart_id, item.quantity + 1)}
    className="w-8 h-8 border flex items-center justify-center font-bold"
  >
    +
  </button>

</div>

                    <button
                      onClick={() => handleRemove(item.cart_id)}
                      className="mt-4 text-red-500 flex items-center gap-1 text-sm font-semibold hover:underline"
                    >
                      <AiOutlineDelete /> Remove
                    </button>
                  </div>

                  {/* DELIVERY */}
                  <div className="text-sm text-gray-600">
                    Delivery in 2-3 days <br />
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="p-4 flex justify-end border-t">
                <button
                  onClick={handleOrderClick}
                  className="bg-[#fb641b] text-white px-8 py-3 font-bold rounded-sm uppercase hover:bg-[#f05a18] transition"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-96 bg-white shadow-sm rounded-sm sticky top-4">

            <h2 className="p-4 text-gray-500 font-bold uppercase border-b">
              Price Details
            </h2>

            <div className="p-4 flex flex-col gap-4 border-b text-sm">

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

              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <p className="p-4 text-green-600 font-bold text-sm">
              You will save ₹{totalDiscount}
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default CartPage;