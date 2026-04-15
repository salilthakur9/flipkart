import React from 'react';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f1f2f4] flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full flex-grow">
          <div className="pt-2 px-2 sm:px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:category" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;