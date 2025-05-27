// src/components/CastCard.jsx
import React from 'react';
import { getProfilePictureUrl } from '../api/tmdb'; // Correct path to tmdb

const CastCard = ({ cast }) => {
  // Ensure 'cast' object is not null/undefined and has 'profile_path', 'name', 'character'
  const profileUrl = getProfilePictureUrl(cast.profile_path);

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={profileUrl}
        alt={cast.name} // Ensure alt text is present
        className="w-24 h-24 object-cover rounded-full border-2 border-gray-700 shadow-md"
        // Add an onError handler to debug image loading
        onError={(e) => { e.target.src = 'https://via.placeholder.com/185x278?text=No+Photo'; console.log('Image failed to load for:', cast.name, e); }}
      />
      <p className="text-white text-sm font-semibold mt-2">{cast.name}</p>
      <p className="text-gray-400 text-xs italic">{cast.character}</p>
    </div>
  );
};

export default CastCard;