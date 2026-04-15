import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";

const AuthModal = ({ isOpen, onClose }) => {
  // Views: 'request', 'verify'
  const [view, setView] = useState('request'); 
  const [formData, setFormData] = useState({ name: '', email: '', otp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // STEP 1: Request OTP (Handles both Login & Signup)
  const handleRequestOTP = async () => {
    if (!formData.email) return setError("Please enter your email");
    setLoading(true);
    setError('');
    try {
      // We use the register endpoint to trigger the OTP email
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name || 'User', // Default name if not provided
        email: formData.email,
        password: 'otp_login_bypass' // Sending a dummy pass since we use OTP
      });
      alert(res.data.message);
      setView('verify');
    } catch (err) {
      // If user already exists, our backend returns 400. 
      // In that case, we should still allow them to request an OTP for login.
      if (err.response?.status === 400) {
          // If you have a separate /login-otp endpoint, use it here.
          // For now, let's assume register handles the OTP trigger.
          setView('verify');
      } else {
        setError(err.response?.data?.error || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP and Login Automatically
  const handleVerify = async () => {
    if (!formData.otp) return setError("Please enter OTP");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: formData.email,
        otp: formData.otp
      });
      
      // Save data and login
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      onClose();
      window.location.reload(); 
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[750px] h-auto sm:h-[520px] flex flex-col sm:flex-row overflow-hidden relative rounded-sm shadow-2xl">
        
        {/* Left Side (Blue Branding) */}
        <div className="hidden sm:flex flex-col w-[40%] bg-[#2874f0] p-10 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {view === 'request' ? 'Login' : 'Verify OTP'}
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed">
            Get access to your Orders, Wishlist and Recommendations
          </p>
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
            alt="login" 
            className="mt-auto w-full object-contain" 
          />
        </div>

        {/* Right Side (Form) */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col relative bg-white">
          <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition-colors">
            <IoCloseOutline />
          </button>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-2 rounded-sm mb-4 border border-red-100">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-8 mt-6">
            {/* If user wants to signup with a specific name, they can enter it here */}
            {view === 'request' && (
               <div className="relative">
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    type="email" 
                    required
                    className="w-full border-b border-gray-300 outline-none py-2 focus:border-[#2874f0] transition-colors peer"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-2 text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#2874f0] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                    Enter Email/Mobile number
                  </label>
               </div>
            )}

            {view === 'verify' && (
              <div className="relative">
                <input 
                  name="otp" 
                  value={formData.otp} 
                  onChange={handleChange} 
                  type="text" 
                  maxLength="6"
                  className="w-full border-b border-gray-300 outline-none py-2 focus:border-[#2874f0] tracking-[10px] text-center text-xl font-bold"
                  placeholder="Enter OTP"
                />
                <p className="text-[10px] text-gray-400 mt-2">Enter the 6-digit code sent to {formData.email}</p>
              </div>
            )}
          </div>

          <p className="text-[11px] text-gray-500 mt-10">
            By continuing, you agree to Flipkart's <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
          </p>

          <button 
            disabled={loading}
            onClick={view === 'request' ? handleRequestOTP : handleVerify}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#fb641b]'} text-white py-3 font-bold rounded-sm mt-4 shadow-md uppercase tracking-wide transition-all active:scale-[0.98]`}
          >
            {loading ? 'Processing...' : view === 'request' ? 'Request OTP' : 'Verify & Login'}
          </button>

          {view === 'verify' && (
            <button 
              onClick={() => setView('request')} 
              className="mt-4 text-sm text-[#2874f0] font-medium hover:underline"
            >
              Resend OTP or Change Email
            </button>
          )}

          <div className="mt-auto text-center border-t pt-4">
             <button onClick={onClose} className="text-[#2874f0] font-bold text-sm">
                New to Flipkart? Create an account
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;