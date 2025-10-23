// import json from '../../package.json' assert { type: 'json' };
// import { isNewerVersion } from '../../helpers';
// import mongodb from 'mongodb';
// const { ObjectId } = mongodb;

import { $ } from 'bun';

// const { version: serverVersion } = json;

export default async ({ minXp, maxXp, count }, { mongo }) => {
  const collection = mongo.collection('game-states');

  const matches = await collection
    .find({
      $expr: { $gte: [{ $size: '$characters' }, count] },
      experience: {
        $gte: minXp,
        $lte: maxXp
      }
    })
    .toArray();

  if (matches.length !== 0) {
    const randomOpponent = matches[Math.floor(Math.random() * matches.length)];

    return randomOpponent.characters;
  }

  return [];
};
