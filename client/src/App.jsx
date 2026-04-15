import React from 'react';
import HomePage from './Pages/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#f1f2f4]">
        <div className="pt-2 px-2 sm:px-4">
          <HomePage />
          <Footer />
        </div>
      </div>
      
  );
}

export default App;