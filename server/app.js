import http from 'http';
import NodeMediaServer from './media_server.js';

import { writeKeyToDatabase } from './helpers/helpers.js';

http
  .createServer((request, response) => {
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
  })
  .listen(8080);

NodeMediaServer.run();
