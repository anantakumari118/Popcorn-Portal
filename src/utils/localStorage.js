// src/utils/localStorage.js

const WATCHLIST_KEY = 'movieBrowserWatchlist';

// Get watchlist from local storage
export const getWatchlist = () => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error("Error reading watchlist from local storage:", error);
    return [];
  }
};

// Save watchlist to local storage
const saveWatchlist = (watchlist) => {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error("Error saving watchlist to local storage:", error);
  }
};

// Add a movie to the watchlist
export const addToWatchlist = (movie) => {
  const watchlist = getWatchlist();
  if (!watchlist.some(m => m.id === movie.id)) {
    watchlist.push(movie);
    saveWatchlist(watchlist);
  }
};

// Remove a movie from the watchlist
export const removeFromWatchlist = (movieId) => {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter(movie => movie.id !== movieId);
  saveWatchlist(watchlist);
};

// Check if a movie is in the watchlist
export const isMovieInWatchlist = (movie) => {
  const watchlist = getWatchlist();
  return watchlist.some(m => m.id === movie.id);
};