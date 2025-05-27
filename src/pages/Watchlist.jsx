// src/pages/Watchlist.jsx
import React, { useState, useEffect } from 'react';
import { getWatchlist, removeFromWatchlist } from '../utils/localStorage';
import MovieCard from '../components/MovieCard'; // Re-use MovieCard

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    setWatchlistMovies(getWatchlist());
  }, []);

  const handleRemove = (movieId) => {
    removeFromWatchlist(movieId);
    setWatchlistMovies(getWatchlist()); // Refresh the list
  };

  if (watchlistMovies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">Your Watchlist</h2>
        <p className="text-lg">Your watchlist is empty. Add some movies!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Watchlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlistMovies.map((movie) => (
          <div key={movie.id} className="relative">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-xs font-bold transition-colors shadow-lg"
              title="Remove from Watchlist"
            >
              &times; {/* Simple 'x' icon */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;