// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="flex-grow p-2 rounded-l-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;