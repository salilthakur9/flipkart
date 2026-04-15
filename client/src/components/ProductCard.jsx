import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col p-2 bg-white cursor-pointer hover:shadow-lg transition-shadow border border-gray-100 group"
    >
      <div className="h-48 w-full flex justify-center items-center mb-2 overflow-hidden">
        <img 
          src={assets[product.image_url] || product.image} 
  alt={product.title}
          className="h-full object-contain group-hover:scale-105 transition-transform" 
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium line-clamp-1 group-hover:text-[#2874f0]">{product.title}</h3>
        <div className="flex items-center gap-2">
          <span className="bg-green-700 text-white text-[10px] px-1.5 py-0.5 rounded-sm flex items-center gap-1">
            {product.rating} <FaStar className="text-[8px]" />
          </span>
          <span className="text-gray-400 text-xs">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold">₹{product.price}</span>
          <span className="text-gray-400 line-through text-xs">₹{product.original_price}</span>
          <span className="text-green-700 text-xs font-bold">{product.discount}% off</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;