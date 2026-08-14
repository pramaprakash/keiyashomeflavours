"use client";

interface VideoPlayerProps {
  videoUrl: string;
  coverImageUrl?: string;
  title: string;
  onClose?: () => void;
  initialPlaying?: boolean;
}

export default function VideoPlayer({
  videoUrl,
  coverImageUrl,
  title,
}: VideoPlayerProps) {
  // Helper to parse YouTube IDs and return embed URL
  const getYoutubeEmbedUrl = (url: string): string => {
    let videoId = "ArPdf_X5wKs";
    if (url && typeof url === "string" && url.trim()) {
      const cleanUrl = url.trim();
      if (cleanUrl.length === 11 && !cleanUrl.includes("/") && !cleanUrl.includes(".")) {
        videoId = cleanUrl;
      } else {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = cleanUrl.match(regExp);

        if (match && match[2] && match[2].length === 11) {
          videoId = match[2];
        } else if (cleanUrl.includes("/embed/")) {
          const parts = cleanUrl.split("/embed/")[1]?.split("?")[0];
          if (parts && parts.length === 11) {
            videoId = parts;
          }
        }
      }
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&rel=0`;
  };

  const formattedVideoUrl = getYoutubeEmbedUrl(videoUrl);
  const isYouTube = formattedVideoUrl.includes("youtube.com/embed") || formattedVideoUrl.includes("youtube-nocookie.com/embed");

  return (
    <div className="relative w-full h-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
      {isYouTube ? (
        <iframe
          src={formattedVideoUrl}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full absolute inset-0 z-0 border-0"
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
    </div>
  );
}
