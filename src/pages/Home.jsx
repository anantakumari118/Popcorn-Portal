// src/pages/Home.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { getPopularMovies, searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton'; // Import skeleton

const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedQuery, setDisplayedQuery] = useState('');

  // Use useCallback to memoize the fetch function to prevent unnecessary re-renders
  const fetchMovies = useCallback(async (query, page) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query) {
        data = await searchMovies(query, page);
        setDisplayedQuery(query);
      } else {
        data = await getPopularMovies(page);
        setDisplayedQuery('');
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    } catch (err) {
      setError("Failed to load movies. Please check your network connection or API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function reference won't change

  // Effect to fetch movies whenever searchTerm or currentPage changes
  useEffect(() => {
    fetchMovies(searchTerm, currentPage);
  }, [searchTerm, currentPage, fetchMovies]); // Added fetchMovies to dependencies

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  const skeletonCount = 20; // Number of skeleton cards to show

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">Error: {error}</div>
    );
  }

  if (movies.length === 0 && !loading && displayedQuery) {
    return (
      <div className="text-white text-center p-8">No results found for "{displayedQuery}".</div>
    );
  } else if (movies.length === 0 && !loading && !displayedQuery) {
    return (
      <div className="text-white text-center p-8">No popular movies available.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {displayedQuery ? `Search Results for "${displayedQuery}"` : "Popular Movies"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-white text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;