// src/api/tmdb.js
import axios from 'axios';

// Ensure your .env file has REACT_APP_TMDB_API_KEY=YOUR_API_KEY
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'; // Use w500 for general, original for backdrop
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'; // For high-res backdrops
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185'; // For cast/crew profiles

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdb.get('/movie/popular', {
      params: { page: page },
    });
    return response.data; // Returns { results, page, total_pages, total_results }
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdb.get('/search/movie', {
      params: {
        query: query,
        page: page,
      },
    });
    return response.data; // Returns { results, page, total_pages, total_results }
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw error;
  }
};

// NEW: Get Movie Credits (Cast & Crew)
export const getMovieCredits = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/credits`);
    return response.data; // Contains 'cast' and 'crew' arrays
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${id}:`, error);
    throw error;
  }
};

// NEW: Get Movie Videos (Trailers, Teasers)
export const getMovieVideos = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/videos`);
    return response.data.results; // Array of video objects
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${id}:`, error);
    throw error;
  }
};

// NEW: Get Similar Movies
export const getSimilarMovies = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/similar`);
    return response.data.results; // Array of movie objects
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${id}:`, error);
    throw error;
  }
};

export const getMoviePosterUrl = (posterPath, size = 'w500') => {
  if (!posterPath) {
    return 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder for missing images
  }
  return `${IMAGE_BASE_URL}${size}${posterPath}`;
};

export const getBackdropUrl = (backdropPath) => {
  if (!backdropPath) {
    return 'https://via.placeholder.com/1280x720?text=No+Backdrop';
  }
  // FIX: Corrected template literal syntax.
  // The previous code had `<span class="math-inline">\{BACKDROP\_BASE\_URL\}</span>{backdropPath}` which is not valid JavaScript.
  // It should use backticks (`) and ${variable} syntax.
  return `${BACKDROP_BASE_URL}${backdropPath}`;
};

export const getProfilePictureUrl = (profilePath, size = 'w185') => {
  if (!profilePath) {
    return 'https://via.placeholder.com/185x278?text=No+Photo';
  }
  return `${PROFILE_BASE_URL}${profilePath}`; // Note: PROFILE_BASE_URL already contains the size
};

export default tmdb;