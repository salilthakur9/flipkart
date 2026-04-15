import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductGrid = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // If category is provided (like 'fashion'), fetch that. 
        // Otherwise, fetch all products for the 'Suggested' section.
        const url = category 
          ? `http://localhost:5000/api/products/category/${category}`
          : `http://localhost:5000/api/products`;
          
        const res = await axios.get(url);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-runs if the category changes

  if (loading) return <div className="p-10 text-center">Loading Products...</div>;

  return (
    <div className="bg-white mt-2 sm:mt-4 p-3 sm:p-4 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {category ? `${category.toUpperCase()}` : "Suggested For You"}
        </h2>
        <button className="bg-[#2874f0] text-white p-1.5 rounded-full shadow-md">
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