// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getMoviePosterUrl } from '../api/tmdb'; // Ensure this path is correct

const MovieCard = ({ movie }) => {
  const posterUrl = getMoviePosterUrl(movie.poster_path);

  return (
    <Link to={`/movie/${movie.id}`} className="block relative group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-72 object-cover" // Fixed height for consistency
        />
        <div className="p-4">
          <h3 className="text-white text-lg font-semibold truncate">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </p>
        </div>
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-lg font-bold group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
            View Details
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;