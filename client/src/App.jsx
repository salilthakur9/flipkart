import React from 'react';
import HomePage from './Pages/HomePage';

function App() {
  return (
    // The entire browser screen gets the gray background
    <div className="min-h-screen bg-[#f1f2f4]">
        <div className="pt-2 px-2 sm:px-4">
          <HomePage />
        </div>
      </div>
      
  );
}

export default App;