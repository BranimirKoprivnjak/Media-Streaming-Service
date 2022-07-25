import { ffmpegCommand } from '../ffmpeg/command.js';

const config = {
  http_server: {
    port: 8080,
  },
  rtmp_server: {
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
      mediaroot: './server/media',
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
  },
};

export default config;
