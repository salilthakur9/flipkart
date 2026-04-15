import React, { useRef } from 'react';
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { assets } from '../assets/assets';

const banners = [
  assets.banner1,
  assets.banner2,
  assets.banner3,
  assets.banner4,
  assets.banner5,
  assets.banner6,
];

const BannerCarousel = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full mt-2 sm:mt-4 bg-transparent group pb-4">
      
      <div className="hidden group-hover:block absolute top-[40%] -translate-y-[50%] left-0 z-10 text-2xl rounded-r-md p-2 bg-white shadow-md cursor-pointer text-gray-800 py-6 border border-gray-200">
        <RxChevronLeft onClick={scrollLeft} />
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto css-scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className="min-w-[85%] sm:min-w-[48%] md:min-w-[32%] flex-shrink-0 snap-center"
          >
            <img 
              src={banner} 
              alt={`Promo Banner ${index + 1}`} 
              className="w-120 h-60 rounded-xl object-cover cursor-pointer shadow-sm"
            />
          </div>
        ))}
      </div>

      <div className="hidden group-hover:block absolute top-[40%] -translate-y-[50%] right-0 z-10 text-2xl rounded-l-md p-2 bg-white shadow-md cursor-pointer text-gray-800 py-6 border border-gray-200">
        <RxChevronRight onClick={scrollRight} />
      </div>

    </div>
  );
};

export default BannerCarousel;