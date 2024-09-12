import json from '../../package.json' assert { type: 'json' };
import { isNewerVersion } from '../../helpers';
const { version: serverVersion } = json;

export default async ({ token, clientVersion, isDev }, { mongo }) => {
  if (isNewerVersion(clientVersion, serverVersion) && !isDev)
    throw Error(
      `Your client is outdated, please try again soon (${clientVersion} < ${serverVersion})`
    );

  const users = mongo.collection('users');

  const user = await users.findOne({ token });

  if (!user)
    throw Error(
      "Couldn't fetch gameState, if the problem persists please contact admin on discord"
    );

  return user;
};
