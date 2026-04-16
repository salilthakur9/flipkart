import React from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import BannerCarousel from '../components/BannerCarousel';
import ProductGrid from '../components/ProductGrid';
import Feature from '../components/Feature';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f1f2f4]">
      <Header />
      
      <div className="max-w-[1400px] mx-auto pt-2 px-2 sm:px-4">
        <CategoryBar />
        <BannerCarousel />
        <ProductGrid /> {/* already fetches products */}
        <Feature />
      </div>
    </div>
  );
};

export default HomePage;