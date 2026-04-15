import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import BannerCarousel from '../components/BannerCarousel';
import ProductGrid from '../components/ProductGrid';
import Feature from '../components/Feature';
import axios from 'axios';
const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
  const fetchAll = async () => {
    const res = await axios.get('http://localhost:5000/api/products'); // Fetch everything
    setProducts(res.data);
  };
  fetchAll();
}, []);
  return (
    <div className="min-h-screen bg-[#f1f2f4]">
      <Header />
      
      <div className="max-w-[1400px] mx-auto pt-2 px-2 sm:px-4">
        <CategoryBar />
        <BannerCarousel />
        <ProductGrid />
        <Feature />
      </div>
    </div>
  );
};

export default HomePage;