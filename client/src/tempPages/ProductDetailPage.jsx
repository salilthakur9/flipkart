import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { assets } from '../assets/assets';

const API = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 ADD TO CART
  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post(
        `${API}/cart/add`,
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <Header />

      <div className="bg-[#f1f2f4] min-h-screen py-6 px-2 sm:px-8">
        <div className="max-w-[1200px] mx-auto bg-white p-6 rounded shadow-sm flex flex-col lg:flex-row gap-10">

          {/* LEFT: IMAGE */}
          <div className="flex-1 flex justify-center items-center bg-white p-6 border rounded">
            <img
              src={assets[product.image_url] || assets.shoe1}
              alt={product.title}
              className="w-[300px] h-[300px] object-contain hover:scale-105 transition"
            />
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex-1 flex flex-col gap-4">

            <h1 className="text-2xl font-semibold">{product.title}</h1>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
                {product.rating} ★
              </span>
              <span className="text-gray-500 text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-gray-400 line-through">
                ₹{product.original_price}
              </span>
              <span className="text-green-600 font-semibold">
                {product.discount}% off
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm mt-2">
              {product.description}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-[#ff9f00] text-white px-6 py-3 font-bold rounded hover:bg-[#fb8c00] transition"
              >
                ADD TO CART
              </button>

              <button
                className="bg-[#fb641b] text-white px-6 py-3 font-bold rounded hover:bg-[#f05a18] transition"
              >
                BUY NOW
              </button>
            </div>

            {/* EXTRA INFO */}
            <div className="mt-6 text-sm text-gray-500">
              <p>✔ 7 Days Replacement</p>
              <p>✔ Cash on Delivery Available</p>
              <p>✔ Free Delivery</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;