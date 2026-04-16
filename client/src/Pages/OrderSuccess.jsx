import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f1f2f4]">
        
        <div className="bg-white p-8 shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-2">
            Your Order ID:
          </p>

          <p className="text-xl font-bold mb-6">
            #{id}
          </p>

          <Link 
            to="/orders"
            className="bg-[#2874f0] text-white px-6 py-2 rounded"
          >
            View Orders
          </Link>
        </div>

      </div>
    </>
  );
};

export default OrderSuccess;