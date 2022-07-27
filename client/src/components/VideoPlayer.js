import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import VideoJS from './VideoJS.js';

const VideoPlayer = () => {
  const playerRef = useRef(null);
  const params = useParams();

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fluid: true,
    sources: [
      {
        src: 'http://127.0.0.1:8000/live/' + params.streamKey + '/index.m3u8',
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
