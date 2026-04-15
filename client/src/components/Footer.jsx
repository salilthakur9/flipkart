import React from 'react';
import { FaFacebookSquare, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white font-sans mt-10">
      <div className="max-w-[1400px] mx-auto px-5 py-10 flex flex-wrap gap-8 justify-between border-b border-gray-700">
        
        <div className="flex flex-col gap-2 min-w-[150px]">
          <h2 className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">About</h2>
          <a href="#" className="text-xs hover:underline">Contact Us</a>
          <a href="#" className="text-xs hover:underline">About Us</a>
          <a href="#" className="text-xs hover:underline">Careers</a>
          <a href="#" className="text-xs hover:underline">Flipkart Stories</a>
          <a href="#" className="text-xs hover:underline">Press</a>
        </div>

        <div className="flex flex-col gap-2 min-w-[150px]">
          <h2 className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Help</h2>
          <a href="#" className="text-xs hover:underline">Payments</a>
          <a href="#" className="text-xs hover:underline">Shipping</a>
          <a href="#" className="text-xs hover:underline">Cancellation & Returns</a>
          <a href="#" className="text-xs hover:underline">FAQ</a>
        </div>

        <div className="flex flex-col gap-2 min-w-[150px]">
          <h2 className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Consumer Policy</h2>
          <a href="#" className="text-xs hover:underline">Return Policy</a>
          <a href="#" className="text-xs hover:underline">Terms Of Use</a>
          <a href="#" className="text-xs hover:underline">Security</a>
          <a href="#" className="text-xs hover:underline">Privacy</a>
        </div>

        <div className="flex flex-col gap-2 min-w-[150px]">
          <h2 className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Social</h2>
          <div className="flex gap-2 items-center text-sm">
             <FaFacebookSquare /> <a href="#" className="text-xs hover:underline">Facebook</a>
          </div>
          <div className="flex gap-2 items-center text-sm">
             <FaTwitter /> <a href="#" className="text-xs hover:underline">Twitter</a>
          </div>
          <div className="flex gap-2 items-center text-sm">
             <FaYoutube /> <a href="#" className="text-xs hover:underline">YouTube</a>
          </div>
        </div>

        <div className="hidden lg:block border-l border-gray-600 h-40 mx-4"></div>

        <div className="flex flex-col gap-2 max-w-[250px]">
          <h2 className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Registered Office Address:</h2>
          <p className="text-xs leading-5">
            Flipkart Internet Private Limited, <br />
            Buildings Alyssa, Begonia & <br />
            Clove Embassy Tech Village, <br />
            Outer Ring Road, Devarabeesanahalli Village, <br />
            Bengaluru, 560103, <br />
            Karnataka, India
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 py-6 flex flex-wrap gap-6 justify-between items-center text-xs">
        <div className="flex gap-8 flex-wrap">
          <span className="flex items-center gap-1 cursor-pointer">💼 <span className="hover:underline">Become a Seller</span></span>
          <span className="flex items-center gap-1 cursor-pointer">⭐ <span className="hover:underline">Advertise</span></span>
          <span className="flex items-center gap-1 cursor-pointer">🎁 <span className="hover:underline">Gift Cards</span></span>
          <span className="flex items-center gap-1 cursor-pointer">❓ <span className="hover:underline">Help Center</span></span>
        </div>
        
        <div className="text-gray-300">
          © 2007-2026 Flipkart.com
        </div>

        <div className="flex items-center gap-4 grayscale opacity-70">
          <span className="font-bold italic">VISA</span>
          <span className="font-bold italic">MasterCard</span>
          <span className="font-bold italic">Maestro</span>
          <span className="font-bold italic">Rupay</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;