import { spawn } from 'child_process';
import config from '../config/default.js';

import client from '../database/database.js';

const cmd = config.rtmp_server.trans.ffmpeg;

const db = client.db('db');

export const writeKeyToDatabase = async (key, collectionString) => {
  const collection = db.collection(collectionString);
  await collection.insertOne({ stream_key: key });
};

export const checkIfStreamKeyExists = async (key, collectionString) => {
  const collection = db.collection(collectionString);
  const filteredDocs = await collection.find({ stream_key: key }).toArray();
  return filteredDocs.length > 0 ? true : false;
};

export const generateStreamThumbnail = streamKey => {
  const args = [
    '-i',
    'rtmp://127.0.0.1:1935/live/' + streamKey,
    '-vf',
    'fps=1/6,scale=440:-1',
    'server/thumbnails/' + streamKey + '_%02d.png',
  ];

  spawn(cmd, args, {
    detached: true,
    stdio: 'ignore',
  }).unref();
};
