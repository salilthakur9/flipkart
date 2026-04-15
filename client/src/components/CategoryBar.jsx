import React from 'react';
// Using Tabler icons (Tb) because they have that perfect, thin, un-filled look
import { 
  TbShoppingBag, TbShirt, TbDeviceMobile, TbSparkles, 
  TbDeviceLaptop, TbHome, TbDeviceTvOld, 
  TbBottle, TbCar, TbMoped, TbBallFootball, TbBook, TbArmchair 
} from "react-icons/tb";

const categories = [
  { title: 'For You', Icon: TbShoppingBag, isActive: true }, // Added isActive flag
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
  return (
    <div className="bg-white px-2 py-3 shadow-sm font-sans rounded-sm">
      <div className="flex justify-between items-center overflow-x-auto gap-2 sm:gap-6 pb-1 css-scrollbar-hide">
        
        {categories.map((category, index) => {
          const IconComponent = category.Icon;
          return (
            <div 
              key={index} 
              // Removed the group-hover colors and background circles
              className={`flex flex-col items-center justify-center cursor-pointer min-w-[65px] border-b-2 transition-all duration-200 
                ${category.isActive ? 'border-[#2874f0] text-[#2874f0]' : 'border-transparent text-gray-800 hover:text-[#2874f0]'}`}
            >
              <div className="mb-1">
                <IconComponent className="text-2xl sm:text-[28px] stroke-[1.5]" />
              </div>
              
              <span className={`text-[11px] sm:text-sm font-medium whitespace-nowrap mb-1 
                ${category.isActive ? 'text-[#2874f0]' : 'text-gray-800'}`}>
                {category.title}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default CategoryBar;