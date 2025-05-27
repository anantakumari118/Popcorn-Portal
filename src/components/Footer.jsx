// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-8 shadow-inner">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Popcorn Portal. All rights reserved.</p>
        <p className="text-sm mt-1">Data provided by The Movie Database (TMDB)</p>
      </div>
    </footer>
  );
};

export default Footer;