import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; 
import { IoAirplaneOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { RxCaretDown } from "react-icons/rx";
import { GoLocation } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './Auth/AuthModal';

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // 🔥 ADD THIS
  localStorage.setItem('manualLogout', 'true');

  window.location.reload();
};
const [query, setQuery] = useState('');

  return (
    <header className="bg-white px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-200 sticky top-0 z-50">
      
      {/* TOP ROW */}
      <div className="hidden md:flex justify-between items-center mb-3">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <img src={assets.flipkartLogo} className="h-8 cursor-pointer" />
          </Link>

          <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full font-bold text-sm">
            <IoAirplaneOutline className="text-blue-600" />
            Travel
          </button>

          <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full font-bold text-sm">
            <MdOutlineLocalGroceryStore className="text-green-600" />
            Grocery
          </button>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <GoLocation />
          140401 
          <span className="text-[#2874f0] ml-1 cursor-pointer">
            Select delivery location &gt;
          </span>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex items-center gap-4 justify-between">
        
        {/* LOGO MOBILE */}
        <div className="md:hidden">
          <Link to="/">
            <img src={assets.flipkartLogo} className="h-6" />
          </Link>
        </div>

        {/* SEARCH */}
        <div className="flex-1 flex items-center bg-blue-50 px-4 py-2 rounded-lg">
          <FiSearch />
          <input 
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${query}`);
    }
  }}
  placeholder="Search for Products..."
  className="bg-transparent outline-none w-full ml-2"
/>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* LOGIN */}
          <div className="relative group">
            <button 
              onClick={() => !user && setIsAuthOpen(true)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[#2874f0] hover:text-white rounded-md"
            >
              <FaRegUserCircle />
              {user ? user.name : "Login"}
              <RxCaretDown />
            </button>

            {user && (
              <div className="absolute top-full left-0 bg-white shadow-lg w-40 hidden group-hover:block">
                <ul className="text-sm">

                  {/* ✅ ORDER HISTORY */}
                  <li 
                    onClick={() => navigate('/orders')}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                  >
                    My Orders
                  </li>

                  <li 
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* ✅ REPLACED MORE → ORDERS */}
          <button 
            onClick={() => navigate('/orders')}
            className="font-medium hover:text-[#2874f0]"
          >
            Orders
          </button>

          {/* CART */}
          <Link to="/cart" className="flex items-center gap-2">
            <img src={assets.flipkartCart} className="h-5" />
            Cart
          </Link>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

export default Header;