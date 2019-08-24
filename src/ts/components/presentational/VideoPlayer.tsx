import * as React from 'react';

interface IVideoPlayer { videoId?: string; }

const VideoPlayer = ({ videoId }: IVideoPlayer) => (
  <div className="video-ratio">
    <iframe
      className="video-player"
      src={`https://www.youtube.com/embed/${videoId}?&allowfullscreeen=1`}
      frameBorder={0}
      allowFullScreen
    />
  </div>
);

export default VideoPlayer;
