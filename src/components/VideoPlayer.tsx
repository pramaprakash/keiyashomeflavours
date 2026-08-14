"use client";

import { useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  coverImageUrl: string;
  title: string;
  onClose?: () => void;
  initialPlaying?: boolean;
}

export default function VideoPlayer({
  videoUrl,
  coverImageUrl,
  title,
  onClose,
  initialPlaying = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);

  // Helper to parse YouTube IDs and return embed URL
  const getYoutubeEmbedUrl = (url: string): string => {
    if (!url) {
      return "https://www.youtube-nocookie.com/embed/5r-zZ5v9X0c?rel=0&enablejsapi=1";
    }

    let videoId: string | null = null;

    if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
      videoId = url;
    } else {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);

      if (match && match[2] && match[2].length === 11) {
        videoId = match[2];
      } else if (url.includes("/embed/")) {
        const parts = url.split("/embed/")[1]?.split("?")[0];
        if (parts && parts.length === 11) {
          videoId = parts;
        }
      }
    }

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&enablejsapi=1`;
    }

    return url;
  };

  const formattedVideoUrl = getYoutubeEmbedUrl(videoUrl);
  const isYouTube = formattedVideoUrl.includes("youtube.com/embed") || formattedVideoUrl.includes("youtube-nocookie.com/embed");

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  if (!isPlaying) {
    return (
      <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-black" onClick={handlePlayClick}>
        {/* Poster Image */}
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-surface/90 backdrop-blur-sm text-primary flex items-center justify-center shadow-2xl transform scale-95 group-hover:scale-100 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="absolute bottom-6 left-6 right-6 text-on-primary text-shadow-sm flex items-center justify-between">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[10px] uppercase tracking-wider mb-2 font-bold">
              Watch Cooking Class
            </span>
            <h4 className="font-headline-sm text-headline-sm text-white drop-shadow">{title}</h4>
          </div>
          <span className="material-symbols-outlined text-white text-3xl">smart_display</span>
        </div>
      </div>
    );
  }

  // If playing, render actual video source
  return (
    <div className="relative w-full h-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
      {isYouTube ? (
        <iframe
          src={formattedVideoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full h-full absolute inset-0 z-0"
        ></iframe>
      ) : (
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="w-full h-full absolute inset-0 z-0 object-cover"
          poster={coverImageUrl}
        >
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Close/Stop video button */}
      <button
        onClick={() => {
          setIsPlaying(false);
          if (onClose) onClose();
        }}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center z-10 transition-colors"
        aria-label="Close video"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}
