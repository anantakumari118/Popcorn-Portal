// src/components/MovieCardSkeleton.jsx
import React from 'react';

const MovieCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-72 bg-gray-700"></div> {/* Image placeholder */}
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div> {/* Title placeholder */}
        <div className="h-4 bg-gray-700 rounded w-1/2"></div> {/* Year placeholder */}
      </div>
    </div>
  );
};

export default MovieCardSkeleton;