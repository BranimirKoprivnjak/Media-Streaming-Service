import client from '../database/database.js';

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
