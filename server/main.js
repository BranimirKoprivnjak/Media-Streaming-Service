import NodeMediaServer from 'node-media-server';

import { ffmpegCommand } from './ffmpeg/command.js';

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: './media',
  },
  trans: {
    ffmpeg: 'C:\\ffmpeg\\bin\\ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        hls: true,
        raw: ffmpegCommand,
      },
    ],
  },
};

const server = new NodeMediaServer(config);
server.run();
