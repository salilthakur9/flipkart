import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation for active state
import { 
  TbShoppingBag, TbShirt, TbDeviceMobile, TbSparkles, 
  TbDeviceLaptop, TbHome, TbDeviceTvOld, 
  TbBottle, TbCar, TbMoped, TbBallFootball, TbBook, TbArmchair 
} from "react-icons/tb";

const categories = [
  { title: 'For You', Icon: TbShoppingBag, path: '/' }, // HomePage path
  { title: 'Fashion', Icon: TbShirt },
  { title: 'Mobiles', Icon: TbDeviceMobile },
  { title: 'Beauty', Icon: TbSparkles },
  { title: 'Electronics', Icon: TbDeviceLaptop },
  { title: 'Home', Icon: TbHome },
  { title: 'Appliances', Icon: TbDeviceTvOld },
  { title: 'Food & H...', Icon: TbBottle },
  { title: 'Auto Acc...', Icon: TbCar },
  { title: '2 Wheele...', Icon: TbMoped },
  { title: 'Sports & ...', Icon: TbBallFootball },
  { title: 'Books & ...', Icon: TbBook },
  { title: 'Furniture', Icon: TbArmchair },
];

const CategoryBar = () => {
  const location = useLocation(); // Hook to get current path

  return (
    <div className="bg-white px-2 py-3 shadow-sm font-sans rounded-sm">
      <div className="flex justify-between items-center overflow-x-auto gap-2 sm:gap-6 pb-1 css-scrollbar-hide">
        
        {categories.map((category, index) => {
          const IconComponent = category.Icon;
          
          // Logic: If it's "For You", path is "/", otherwise it's "/products/title"
          const categoryPath = category.path || `/products/${category.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
          
          // Determine if this specific link is currently active
          const isActive = location.pathname === categoryPath;

          return (
            <Link 
              to={categoryPath}
              key={index} 
              className={`flex flex-col items-center justify-center cursor-pointer min-w-[65px] border-b-2 transition-all duration-200 
                ${isActive ? 'border-[#2874f0] text-[#2874f0]' : 'border-transparent text-gray-800 hover:text-[#2874f0]'}`}
            >
              <div className="mb-1">
                <IconComponent className="text-2xl sm:text-[28px] stroke-[1.5]" />
              </div>
              
              <span className={`text-[11px] sm:text-sm font-medium whitespace-nowrap mb-1 
                ${isActive ? 'text-[#2874f0]' : 'text-gray-800'}`}>
                {category.title}
              </span>
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default CategoryBar;