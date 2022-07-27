import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import NodeMediaServer from './media_server.js';

import { writeKeyToDatabase } from './helpers/helpers.js';

// https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

http
  .createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    // console.log(url, url.searchParams);
    if (request.url === '/stream_key') {
      const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:9500',
      };
      response.writeHead(200, headers);
      const streamKey = Date.now().toString();
      writeKeyToDatabase(streamKey, 'users');
      const body = { stream_key: streamKey };
      response.end(JSON.stringify(body));
    }
    if (request.url.includes('/thumbnails')) {
      const headers = {
        'Content-Type': 'image/png',
      };
      response.writeHead(200, headers);
      // const filePath = path.join(__dirname, request.url);
      // fs.readFile(filePath, (err, content) => {
      //   if (err) console.log(err);
      //   response.end(content);
      // });
      const filePath = path.join(
        __dirname,
        '/thumbnails/' + getMostRecentFile().file
      );
      console.log(filePath);
      fs.readFile(filePath, (err, content) => {
        response.end(content);
      });
    }
  })
  .listen(8080);

NodeMediaServer.run();

const dir = path.join(__dirname, '/thumbnails');

const getMostRecentFile = () => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};

const orderReccentFiles = dir => {
  return fs
    .readdirSync(dir)
    .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
    .map(file => ({ file, ctime: fs.lstatSync(path.join(dir, file)).ctime }))
    .sort((a, b) => b.ctime.getTime() - a.ctime.getTime());
};
