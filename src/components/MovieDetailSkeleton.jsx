// src/components/MovieDetailSkeleton.jsx
import React from 'react';

const MovieDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-white animate-pulse">
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
        <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0 w-64 h-96 bg-gray-700 rounded-lg"></div>
        <div className="flex-grow w-full">
          <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div> {/* Title */}
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-6"></div> {/* Tagline */}
          <div className="flex flex-wrap gap-x-4 mb-4">
            <div className="h-6 bg-gray-700 rounded w-24"></div> {/* Rating */}
            <div className="h-6 bg-gray-700 rounded w-32"></div> {/* Release Date */}
          </div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div> {/* Overview line 1 */}
          <div className="h-4 bg-gray-700 rounded w-11/12 mb-2"></div> {/* Overview line 2 */}
          <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div> {/* Overview line 3 */}

          <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div> {/* Genres */}
          <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div> {/* Runtime */}
          <div className="h-6 bg-gray-700 rounded w-40 mb-4"></div> {/* Budget */}
          <div className="h-6 bg-gray-700 rounded w-40 mb-4"></div> {/* Revenue */}
          <div className="h-6 bg-gray-700 rounded w-60 mb-8"></div> {/* Production Companies */}

          <div className="h-10 bg-gray-700 rounded w-40"></div> {/* Back button */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;