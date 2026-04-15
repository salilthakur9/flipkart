import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillThunderbolt } from "react-icons/ai";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { assets } from '../assets/assets';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/item/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading Product...</div>;
  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  return (
    <div className="bg-white mt-2 p-3 sm:p-8 flex flex-col md:flex-row gap-8 shadow-sm rounded-sm">
      
      {/* Left: Sticky Image Section */}
      <div className="w-full md:w-2/5 flex flex-col gap-3">
        <div className="border border-gray-200 p-4 flex justify-center items-center h-[400px]">
          <img 
            src={assets[product.image_url] || product.image_url} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        <div className="flex gap-2 w-full">
          <button className="flex-1 bg-[#ff9f00] text-white py-4 px-2 font-bold rounded-sm flex items-center justify-center gap-2 hover:bg-orange-500 transition shadow-md uppercase text-sm">
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="flex-1 bg-[#fb641b] text-white py-4 px-2 font-bold rounded-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition shadow-md uppercase text-sm">
            <AiFillThunderbolt className="text-xl" /> Buy Now
          </button>
        </div>
      </div>

      {/* Right: Details Section */}
      <div className="flex-1 flex flex-col gap-4">
        <nav className="text-xs text-gray-500 flex gap-2">
          <span>Home</span> {'>'} <span>{product.category}</span> {'>'} <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        <h1 className="text-lg md:text-xl font-medium text-gray-900 leading-6">
          {product.title}
        </h1>

        <div className="flex items-center gap-3">
          <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
            {product.rating} <FaStar className="text-[10px]" />
          </span>
          <span className="text-gray-500 text-sm font-bold">{product.reviews} Ratings & Reviews</span>
        </div>

        <div className="flex items-end gap-3 mt-2">
          <span className="text-2xl md:text-3xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-gray-500 line-through">₹{product.original_price}</span>
          <span className="text-green-600 font-bold">{product.discount}% off</span>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description || "No description available for this product. High-quality build and legendary performance guaranteed by the brand."}
          </p>
        </div>

        {/* Offers placeholder like Flipkart */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-900 mb-2">Available offers</h3>
          <div className="flex flex-col gap-2">
            {["Bank Offer 10% off on SBI Credit Card", "Special Price Get extra 20% off", "Partner Offer Sign up for Flipkart Pay Later"].map((offer, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-800">
                <span className="text-green-600">🏷️</span> {offer}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetailPage;