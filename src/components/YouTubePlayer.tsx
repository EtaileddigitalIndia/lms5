import React from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  width?: string;
  height?: string;
  autoplay?: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  width = "100%",
  height = "315",
  autoplay = false
}) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;

  return (
    <div className="relative" style={{ width, height }}>
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    </div>
  );
};

export default YouTubePlayer;