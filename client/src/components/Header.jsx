import React from 'react';
import { assets } from '../assets/assets'; 
import { IoAirplaneOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { RxCaretDown } from "react-icons/rx";
import { GoLocation } from "react-icons/go";

const Header = () => {
  return (
    <header className="bg-white px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-200 font-sans sticky top-0 z-50">
      
      {/* TOP ROW */}
      <div className="hidden md:flex justify-between items-center mb-3">
        <div className="flex gap-4 items-center">
          <img 
            src={assets.flipkartLogo} 
            alt="Flipkart" 
            className="h-8 w-auto object-contain cursor-pointer" 
          />
          <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full font-bold text-sm text-gray-700 hover:bg-gray-100 transition border-none cursor-pointer">
             <IoAirplaneOutline className="text-lg text-blue-600" />
             Travel
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full font-bold text-sm text-gray-700 hover:bg-gray-100 transition border-none cursor-pointer">
             <MdOutlineLocalGroceryStore className="text-lg text-green-600" />
             Grocery
          </button>
        </div>
        
        <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
          <GoLocation className="text-gray-500" />
          140401 
          <span className="text-[#2874f0] cursor-pointer ml-1 hover:underline">
            Select delivery location &gt;
          </span>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 sm:gap-6 justify-between">
        <div className="md:hidden flex items-center">
           <img 
            src={assets.flipkartLogo} 
            alt="Flipkart" 
            className="h-6 w-auto object-contain cursor-pointer" 
          />
        </div>
        
        <div className="order-3 md:order-1 w-full md:flex-1 flex items-center bg-blue-50 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus-within:bg-white focus-within:shadow-md focus-within:border focus-within:border-gray-300 transition-all">
          <FiSearch className="text-gray-500 text-lg" />
          <input 
            type="text" 
            placeholder="Search for Products, Brands and More" 
            className="border-none bg-transparent w-full outline-none text-sm sm:text-base ml-2 sm:ml-3 text-gray-700"
          />
        </div>

        <div className="order-2 flex items-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-700">
          <button className="flex items-center gap-1 sm:gap-2 hover:bg-[#2874f0] hover:text-white text-gray-800 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium transition cursor-pointer">
            <FaRegUserCircle className="text-xl sm:text-xl" />
            <span className="hidden sm:inline">Login</span>
            <RxCaretDown className="hidden sm:inline text-lg" />
          </button>
          
          <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-[#2874f0] transition font-medium">
            <span>More</span>
            <RxCaretDown className="text-lg" />
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-[#2874f0] transition font-medium">
            <img src={assets.flipkartCart} alt="Cart" className="h-5 w-5 object-contain" />
            <span className="hidden sm:inline">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;