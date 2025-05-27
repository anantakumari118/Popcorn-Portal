// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-6"> {/* Group branding and watchlist link */}
          <Link to="/" className="text-white text-2xl font-bold mb-3 md:mb-0 hover:text-purple-400 transition-colors duration-300">
            Popcorn Portal
          </Link>
          <Link to="/watchlist" className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-lg md:text-xl">
            Watchlist
          </Link>
        </div>
        <div className="w-full md:w-1/2 mt-3 md:mt-0"> {/* Adjusted margin for mobile */}
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;