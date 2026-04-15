import React from 'react';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-3 rounded-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col group relative border border-gray-100 hover:border-transparent">
      
      {product.isAd && (
        <div className="absolute top-2 left-2 bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 font-bold rounded-sm z-10">
          AD
        </div>
      )}
      
      <div className="w-full h-[150px] sm:h-[200px] mb-3 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-[13px] sm:text-sm font-medium text-gray-800 truncate mb-1 group-hover:text-[#2874f0]">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-2">
          <span className="bg-green-600 text-white text-[11px] font-bold px-1.5 py-[2px] rounded-sm flex items-center gap-1">
            {product.rating} <FaStar className="text-[9px]" />
          </span>
          <span className="text-gray-500 text-xs font-medium">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          <span className="text-xs sm:text-sm font-bold text-green-600">{product.discount}% off</span>
        </div>
        
        {product.isFreeDelivery && (
          <span className="text-xs font-medium text-gray-800 mt-auto">Free delivery</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;