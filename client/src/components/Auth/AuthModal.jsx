import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";

const API = import.meta.env.VITE_API_URL;

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login'); // login | register | verify
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔥 SEND OTP (LOGIN OR REGISTER)
  const handleRequestOTP = async () => {
  const { email, password, name } = formData;

  if (!email || !password) {
    return setError("Email and Password required");
  }

  setLoading(true);
  setError('');

  try {
    const endpoint =
      view === 'register' ? '/auth/register' : '/auth/login';

    const res = await axios.post(`${API}${endpoint}`, {
      name,
      email,
      password
    });

    alert(res.data.message);
    setView('verify');
  } catch (err) {
    setError(err.response?.data?.error || "Failed to send OTP");
  } finally {
    setLoading(false);
  }
};

  // 🔥 VERIFY OTP
  const handleVerify = async () => {
    if (!formData.otp) return setError("Enter OTP");

    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.removeItem('manualLogout');
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

        {/* LEFT */}
        <div className="hidden sm:flex flex-col w-[40%] bg-[#2874f0] p-10 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {view === 'login' && 'Login'}
            {view === 'register' && 'Register'}
            {view === 'verify' && 'Verify OTP'}
          </h2>
          <p className="text-gray-200 text-lg">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-2xl">
            <IoCloseOutline />
          </button>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-2 mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5 mt-6">

            {view === 'register' && (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="border-b py-2 outline-none"
              />
            )}

            {(view === 'login' || view === 'register') && (
              <>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="border-b py-2 outline-none"
                />

                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="border-b py-2 outline-none"
                />
              </>
            )}

            {view === 'verify' && (
              <>
                <input
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="border-b py-2 text-center tracking-widest outline-none"
                />
                <p className="text-xs text-gray-400">
                  OTP sent to {formData.email}
                </p>
              </>
            )}
          </div>

          <button
            disabled={loading}
            onClick={view === 'verify' ? handleVerify : handleRequestOTP}
            className="w-full bg-[#fb641b] text-white py-3 mt-6 font-bold"
          >
            {loading
              ? 'Processing...'
              : view === 'verify'
              ? 'Verify OTP'
              : 'Send OTP'}
          </button>

          {/* TOGGLE */}
          <div className="mt-auto text-center border-t pt-4">
            {view === 'login' ? (
              <button onClick={() => setView('register')}>
                New user? Register
              </button>
            ) : (
              <button onClick={() => setView('login')}>
                Already have account? Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;