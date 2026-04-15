import React from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
const HomePage = () => {
  return (
    // The whole page gets the Flipkart default gray background
    <div className="min-h-screen bg-[#f1f2f4]">
      <Header />
      
      {/* This is the magic wrapper! 
          max-w-[1400px] stops it from stretching too wide on big screens.
          mx-auto centers it, giving you that even left/right spacing.
      */}
      <div className="max-w-[1400px] mx-auto pt-2 px-2 sm:px-4">
        <CategoryBar />
        
        {/* Next up:
          <BannerCarousel />
          <ProductGrid />
        */}
      </div>
    </div>
  );
};

export default HomePage;