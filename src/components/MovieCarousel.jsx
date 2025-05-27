// src/components/MovieCarousel.jsx
import React from 'react';
import MovieCard from './MovieCard'; // Re-use MovieCard for carousel items

const MovieCarousel = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null; // Don't render if no movies
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-40"> {/* Fixed width for carousel items */}
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;