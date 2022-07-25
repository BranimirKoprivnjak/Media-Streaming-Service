import { useRef } from 'react';

import VideoJS from './VideoJS.js';

const VideoPlayer = () => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: 'muted',
    controls: false,
    fluid: true,
    sources: [
      {
        src: 'http://127.0.0.1:8000/live/example/playlist.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
  };

  const handlePlayerReady = player => {
    playerRef.current = player;
  };

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
};

export default VideoPlayer;
