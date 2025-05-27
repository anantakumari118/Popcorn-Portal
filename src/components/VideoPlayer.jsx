// src/components/VideoPlayer.jsx
import React from 'react';

const VideoPlayer = ({ videoKey, title }) => {
  if (!videoKey) {
    return <p className="text-gray-400 text-center">No video available.</p>;
  }

  const youtubeUrl = `https://www.youtube.com/embed/${videoKey}`;

  return (
    <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
      {/* 16:9 Aspect Ratio */}
      <iframe
        src={youtubeUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;