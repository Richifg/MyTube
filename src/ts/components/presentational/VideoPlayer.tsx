import * as React from 'react';

interface IVideoPlayer { videoId?: string; }

const VideoPlayer = ({ videoId }: IVideoPlayer) => (
  <div className="video-ratio">
    <iframe
      className="video-player border-bottom border-dark"
      src={`https://www.youtube.com/embed/${videoId}?&allowfullscreeen=1&autoplay=1`}
      frameBorder={0}
      allowFullScreen
      allow="autoplay"
    />
  </div>
);

export default VideoPlayer;
