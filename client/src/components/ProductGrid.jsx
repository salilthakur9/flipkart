import React from 'react';
import ProductCard from './ProductCard';
import { assets } from '../assets/assets';

const products = [
  {
    id: 1,
    title: "Reebok White Running Shoes",
    price: "3,723",
    originalPrice: "8,999",
    discount: "58",
    rating: "4.5",
    reviews: "1,234",
    image: assets.shoe1,
    isAd: true,
    isFreeDelivery: true
  },
  {
    id: 2,
    title: "Puma Blue Running Shoes",
    price: "2,199",
    originalPrice: "4,999",
    discount: "56",
    rating: "4.3",
    reviews: "892",
    image: assets.shoe2,
    isAd: true,
    isFreeDelivery: true
  },
  {
    id: 3,
    title: "REEBOK AeroSpeed Running...",
    price: "3,723",
    originalPrice: "8,999",
    discount: "58",
    rating: "4.4",
    reviews: "4,521",
    image: assets.shoe3,
    isAd: false,
    isFreeDelivery: true
  },
  {
    id: 4,
    title: "Nike Flex Run 2026",
    price: "4,500",
    originalPrice: "6,999",
    discount: "35",
    rating: "4.6",
    reviews: "3,210",
    image: assets.shoe4, 
    isAd: false,
    isFreeDelivery: true
  },
  {
    id: 5,
    title: "Adidas Ultraboost Light",
    price: "8,999",
    originalPrice: "12,999",
    discount: "30",
    rating: "4.8",
    reviews: "5,671",
    image: assets.shoe5, 
    isAd: false,
    isFreeDelivery: true
  }
];

const ProductGrid = () => {
  return (
    <div className="bg-white mt-2 sm:mt-4 p-3 sm:p-4 shadow-sm mb-8">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Suggested For You</h2>
        <button className="bg-[#2874f0] text-white p-1.5 rounded-full shadow-md hover:bg-blue-700 transition">
         
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
};

export default ProductGrid;