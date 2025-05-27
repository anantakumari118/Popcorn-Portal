// src/pages/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getMoviePosterUrl,
  getBackdropUrl
} from '../api/tmdb';
import MovieDetailSkeleton from '../components/MovieDetailSkeleton'; // Import skeleton
import CastCard from '../components/CastCard'; // Import CastCard
import VideoPlayer from '../components/VideoPlayer'; // Import VideoPlayer
import MovieCarousel from '../components/MovieCarousel'; // Import MovieCarousel
import { addToWatchlist, removeFromWatchlist, isMovieInWatchlist } from '../utils/localStorage'; // Import watchlist utils

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);


  useEffect(() => {
    const fetchAllDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieData = await getMovieDetails(id);
        const creditsData = await getMovieCredits(id);
        const videosData = await getMovieVideos(id);
        const similarMoviesData = await getSimilarMovies(id);

        setMovie(movieData);
        setCredits(creditsData);
        // Filter for YouTube trailers/teasers. TMDB's video.type can vary.
        setVideos(videosData.filter(video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')));
        setSimilarMovies(similarMoviesData);
        setIsInWatchlist(isMovieInWatchlist(movieData)); // Check watchlist status when movie data is loaded

      } catch (err) {
        setError("Failed to load movie details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllDetails();
    }
  }, [id]); // Re-run effect when movie ID changes

  const handleWatchlistToggle = () => {
    if (movie) { // Ensure movie data is available before toggling watchlist
      if (isInWatchlist) {
        removeFromWatchlist(movie.id);
      } else {
        addToWatchlist(movie);
      }
      setIsInWatchlist(!isInWatchlist); // Toggle local state immediately
    }
  };

  // Generate image URLs
  const posterUrl = movie ? getMoviePosterUrl(movie.poster_path, 'w300') : ''; // Smaller poster for detail page
  const backdropUrl = movie ? getBackdropUrl(movie.backdrop_path, 'w1280') : ''; // Large backdrop for background

  // Helper function to format currency (e.g., for Budget and Revenue)
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === 0) return 'N/A'; // Handle 0 explicitly as N/A often
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Conditional rendering for loading, error, and no movie found states
  if (loading) {
    return <MovieDetailSkeleton />; // Display skeleton while loading
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">Error: {error}</div>
    );
  }

  if (!movie) {
    return (
      <div className="text-white text-center p-8">Movie not found.</div>
    );
  }

  // Process credits data
  const topCast = credits?.cast?.slice(0, 10) || []; // Get top 10 cast members, or empty array if no cast
  const director = credits?.crew?.find(person => person.job === 'Director'); // Find the director
  const mainTrailer = videos[0]; // Get the first available trailer

  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-inter">
      {/* Background overlay with movie backdrop */}
      {backdropUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10"> {/* Ensure content is above the backdrop */}
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-64 h-auto rounded-lg shadow-lg"
              // Add a fallback for broken poster images
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'; }}
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
            <p className="text-purple-400 text-xl mb-4">{movie.tagline}</p>

            {/* Rating and Release Date */}
            <div className="flex flex-wrap items-center text-gray-300 text-lg mb-4 gap-x-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Rating:</span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Release Date:</span>
                {movie.release_date || 'N/A'}
              </div>
            </div>

            {/* Overview */}
            <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>

            {/* Genres */}
            <div className="mb-4">
              <span className="font-semibold text-gray-300 mr-2">Genres:</span>
              {movie.genres && movie.genres.length > 0 ? (
                movie.genres.map((genre) => (
                  <span key={genre.id} className="inline-block bg-purple-600 text-white text-sm px-3 py-1 rounded-full mr-2 mb-2">
                    {genre.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>

            {/* Runtime */}
            <div className="mb-4">
              <span className="font-semibold text-gray-300 mr-2">Runtime:</span>
              {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}
            </div>

            {/* Budget */}
            <div className="mb-4">
              <span className="font-semibold text-gray-300 mr-2">Budget:</span>
              {formatCurrency(movie.budget)}
            </div>

            {/* Revenue */}
            <div className="mb-4">
              <span className="font-semibold text-gray-300 mr-2">Revenue:</span>
              {formatCurrency(movie.revenue)}
            </div>

            {/* Director */}
            <div className="mb-4">
              <span className="font-semibold text-gray-300 mr-2">Director:</span>
              {director ? director.name : 'N/A'}
            </div>

            {/* Production Companies */}
            <div className="mb-6">
              <span className="font-semibold text-gray-300 mr-2">Production Companies:</span>
              {movie.production_companies && movie.production_companies.length > 0 ? (
                movie.production_companies.map((company, index) => (
                  <span key={company.id || index} className="inline-block text-gray-400 text-sm mr-2 mb-2">
                    {company.name}
                    {index < movie.production_companies.length - 1 ? ',' : ''}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>

            {/* Action Buttons: Back to Home and Watchlist Toggle */}
            <div className="flex space-x-4">
              <Link
                to="/"
                className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Back to Home
              </Link>
              <button
                onClick={handleWatchlistToggle}
                className={`inline-block font-bold py-2 px-6 rounded-lg transition-colors duration-300 ${
                  isInWatchlist ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {topCast.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Top Cast</h3>
            <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
              {topCast.map(member => (
                <CastCard key={member.id} cast={member} />
              ))}
            </div>
          </div>
        )}

        {/* Trailer Section */}
        {mainTrailer && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Trailer</h3>
            <VideoPlayer videoKey={mainTrailer.key} title={mainTrailer.name} />
          </div>
        )}

        {/* Similar Movies Section */}
        <MovieCarousel title="Similar Movies" movies={similarMovies} />
      </div>
    </div>
  );
};

export default MovieDetail;