import React from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const ProductListingPage = () => {
  const { category } = useParams();

  // This dummy data simulates 5 products per category
  const categoryProducts = [
    { id: 1, title: `${category} Premium Model 1`, price: "12,999", originalPrice: "15,000", discount: "15", rating: "4.2", reviews: "120", image: assets.support1 },
    { id: 2, title: `${category} Standard Edition`, price: "8,499", originalPrice: "10,000", discount: "15", rating: "4.0", reviews: "85", image: assets.support2 },
    { id: 3, title: `${category} Budget Friendly`, price: "4,200", originalPrice: "6,000", discount: "30", rating: "3.8", reviews: "210", image: assets.support3 },
    { id: 4, title: `${category} Pro Max`, price: "25,000", originalPrice: "30,000", discount: "16", rating: "4.8", reviews: "500", image: assets.support4 },
    { id: 5, title: `${category} Lite Version`, price: "2,999", originalPrice: "5,000", discount: "40", rating: "3.5", reviews: "45", image: assets.support5 },
  ];

  return (
    <>
    <Header />
    <div className="flex flex-col md:flex-row gap-4 mt-2">
      {/* LEFT SIDE: Filters (Classic Flipkart Sidebar) */}
      <div className="hidden md:block w-1/4 bg-white p-4 shadow-sm h-fit rounded-sm">
        <h2 className="font-bold text-lg border-b pb-2 mb-4">Filters</h2>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase text-gray-500 mb-2">Price Range</p>
          <input type="range" className="w-full" />
        </div>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase text-gray-500 mb-2">Customer Ratings</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> 4★ & above</label>
        </div>
      </div>

      {/* RIGHT SIDE: Product List */}
      <div className="flex-1 bg-white p-4 shadow-sm rounded-sm">
        <h1 className="text-xl font-bold mb-4 capitalize">Showing results for "{category}"</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductListingPage;