import config from './config/default.js';
import NodeMediaServer from 'node-media-server';

import { checkIfStreamKeyExists } from './helpers/helpers.js';

const nodeMediaServer = new NodeMediaServer(config.rtmp_server);

nodeMediaServer.on('prePublish', (id, StreamPath, args) => {
  const streamKey = getStreamKeyFromStreamPath(StreamPath);

  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );

  checkIfStreamKeyExists(streamKey, 'users').then(streamKeyExists => {
    console.log(typeof streamKeyExists);
    if (!streamKeyExists) {
      const session = nodeMediaServer.getSession(id);
      session.reject();
    } else {
      // generate stream thumbnail
    }
  });
});

const getStreamKeyFromStreamPath = path => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export default nodeMediaServer;
