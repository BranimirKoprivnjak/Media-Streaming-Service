import NodeMediaServer from 'node-media-server';
import { spawn } from 'node:child_process';
import { access, mkdir } from 'node:fs';

import { getFfmpegCommandLineArgs } from './ffmpeg/get-ffmpeg-clargs.js';

const config = {
  logType: 3,

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
};

const server = new NodeMediaServer(config);
server.run();

server.on('prePublish', (id, streamPath, args) => {
  const directory = `./media/live/${id}`;
  access(directory, error => {
    if (error) {
      mkdir(directory, { recursive: true }, error => {
        if (error) {
          console.log(error);
        }
      });
    }
  });

  const ffmpeg = 'C:\\ffmpeg\\bin\\ffmpeg.exe';
  const proc = spawn(
    ffmpeg,
    getFfmpegCommandLineArgs(id, streamPath, config.http.mediaroot)
  );

  proc.stdout.on('data', data => {
    console.log(data);
  });

  proc.stderr.setEncoding('utf8');
  proc.stderr.on('data', data => {
    console.log(data);
  });
});
