// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Watchlist from './pages/Watchlist'; // Import Watchlist component

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 font-inter">
        <Navbar onSearch={handleSearchSubmit} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} /> {/* NEW ROUTE */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;