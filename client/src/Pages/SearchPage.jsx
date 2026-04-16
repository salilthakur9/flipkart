import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const API = import.meta.env.VITE_API_URL;

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(`${API}/products/search?q=${query}`);
      setProducts(res.data);
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <>
      <Header />

      <div className="p-4 bg-[#f1f2f4] min-h-screen">
        <h2 className="text-lg font-bold mb-4">
          Search Results for "{query}"
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;