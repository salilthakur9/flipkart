import React from 'react';
import { assets } from '../assets/assets';

const FeatureMore = () => {
  return (
    <div className="bg-white mt-2 sm:mt-4 p-5 sm:p-8 shadow-md mb-6 border border-gray-100 flex flex-col md:flex-row gap-8 sm:gap-12 items-stretch rounded-lg">
      
      {/* LEFT IMAGE */}
      <div className="w-full md:w-3/5 flex justify-center items-center overflow-hidden rounded-md border border-gray-100 bg-gray-50">
        <img 
          src={assets.ritik1} 
          alt="Ritik Roshan Sunglasses Style" 
          className="w-full md:w-auto h-auto md:h-full max-h-[400px] sm:max-h-[600px] md:max-h-[700px] lg:max-h-[800px] xl:max-h-[900px] object-contain rounded-md shadow-sm transition-all duration-300 ease-in-out md:scale-105" 
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-start pl-1 sm:pl-3">
        
        {/* BRAND / LOGO */}
        <img 
          src={assets.ritik2} 
          alt="HRX Sunglasses" 
          className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain self-start mb-5" 
        />
        
        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mb-4 leading-tight">
          Celebrity Picks
        </h2>
        
        {/* DESCRIPTION */}
        <p className="text-gray-700 mb-8 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
          Upgrade your style with Hrithik Roshan’s signature sunglasses collection. 
          Bold designs, premium comfort, and unmatched attitude—made to stand out.
        </p>

        {/* SUBTITLE */}
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          Featured shades in this drop
        </h3>
        
        {/* SECOND IMAGE */}
        <div className="mb-8 w-full pr-0 md:pr-4"> 
          <img 
            src={assets.ritik2} 
            alt="Sunglasses Style" 
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200" 
          />
        </div>

        {/* BUTTON */}
        <button className="bg-gray-950 text-white px-10 py-4 lg:px-12 rounded-full font-bold text-base sm:text-lg lg:text-xl hover:bg-gray-800 transition w-max shadow-md hover:shadow-lg scale-100 hover:scale-[1.03] transition-transform duration-300">
          Shop The Collection
        </button>
      </div>

    </div>
  );
};

export default FeatureMore;