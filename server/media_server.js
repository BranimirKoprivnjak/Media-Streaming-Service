import config from './config/default.js';
import NodeMediaServer from 'node-media-server';

import {
  checkIfStreamKeyExists,
  generateStreamThumbnail,
} from './helpers/helpers.js';

const nodeMediaServer = new NodeMediaServer(config.rtmp_server);

nodeMediaServer.on('prePublish', (id, StreamPath, args) => {
  const streamKey = getStreamKeyFromStreamPath(StreamPath);

  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );

  checkIfStreamKeyExists(streamKey, 'users').then(streamKeyExists => {
    if (!streamKeyExists) {
      const session = nodeMediaServer.getSession(id);
      session.reject();
    } else {
      generateStreamThumbnail(streamKey);
    }
  });
});

const getStreamKeyFromStreamPath = path => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export default nodeMediaServer;
