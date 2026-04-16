import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const ProductListingPage = () => {
  const { category } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/products/category/${category}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="p-10 text-center text-lg">
          Loading {category}...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f2f4] min-h-screen">
      <Header />

      <div className="p-2 sm:p-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-4">
          
          {/* Sidebar */}
          <div className="hidden md:block w-1/5 bg-white p-4 shadow-sm h-fit rounded-md">
            <h2 className="font-bold border-b pb-2 mb-4">Filters</h2>
            <p className="text-xs font-bold text-gray-400 uppercase">Category</p>
            <p className="text-[#2874f0] font-bold capitalize mt-1">{category}</p>
          </div>

          {/* Product Grid */}
          <div className="flex-1 bg-white p-4 shadow-sm min-h-[70vh] rounded-md">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">
                  No products found in "{category}" yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;