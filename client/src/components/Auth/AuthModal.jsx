import React, { useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login'); // login, register, verify
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name, email: formData.email, password: formData.password
      });
      alert(res.data.message);
      setView('verify'); // Move to OTP screen
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: formData.email, otp: formData.otp
      });
      alert(res.data.message);
      setView('login');
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email, password: formData.password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Login Successful!");
      onClose();
      window.location.reload(); // Refresh to update header state
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-[750px] h-[520px] flex rounded-sm overflow-hidden relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-white md:text-gray-400 text-2xl z-10"><RxCross2 /></button>

        {/* Left Side: Branding */}
        <div className="hidden md:flex w-2/5 bg-[#2874f0] p-10 flex-col text-white">
          <h2 className="text-3xl font-bold mb-4">
            {view === 'login' ? 'Login' : view === 'register' ? 'Looks like you\'re new here!' : 'Verify OTP'}
          </h2>
          <p className="text-lg text-gray-200">
            {view === 'login' ? 'Get access to your Orders, Wishlist and Recommendations' : 'Sign up with your mobile number to get started'}
          </p>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="login" className="mt-auto" />
        </div>

        {/* Right Side: Forms */}
        <div className="flex-1 p-10 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
            
            {view === 'register' && (
              <input name="name" onChange={handleInputChange} type="text" placeholder="Enter Name" className="border-b border-gray-300 focus:border-[#2874f0] outline-none py-1 text-sm" />
            )}
            
            <input name="email" onChange={handleInputChange} type="email" placeholder="Enter Email" className="border-b border-gray-300 focus:border-[#2874f0] outline-none py-1 text-sm" />
            
            {view !== 'verify' && (
              <input name="password" onChange={handleInputChange} type="password" placeholder="Enter Password" className="border-b border-gray-300 focus:border-[#2874f0] outline-none py-1 text-sm" />
            )}

            {view === 'verify' && (
              <input name="otp" onChange={handleInputChange} type="text" placeholder="Enter 6-digit OTP" className="border-b border-gray-300 focus:border-[#2874f0] outline-none py-1 text-sm" />
            )}

            <p className="text-[12px] text-gray-500 leading-4">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
            
            <button 
              onClick={view === 'login' ? handleLogin : view === 'register' ? handleRegister : handleVerify}
              className="bg-[#fb641b] text-white py-3 font-bold rounded-sm shadow-sm"
            >
              {view === 'login' ? 'Login' : view === 'register' ? 'CONTINUE' : 'VERIFY'}
            </button>
          </div>

          <p 
            onClick={() => setView(view === 'login' ? 'register' : 'login')}
            className="text-[#2874f0] text-center text-sm font-bold cursor-pointer"
          >
            {view === 'login' ? 'New to Flipkart? Create an account' : 'Existing User? Log in'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;