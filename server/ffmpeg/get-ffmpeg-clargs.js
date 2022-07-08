import { getCommand } from './command.js';

export const getFfmpegCommandLineArgs = (id, streamPath, mediaRoot) => {
  let command = getCommand(id, streamPath, mediaRoot);
  command = command.replace('ffmpeg', '');
  const commandLineArgs = [];
  let currentArg = [],
    isOneCommand = false;
  for (const char of command) {
    if (char === '"') {
      isOneCommand = !isOneCommand;
    } else if (char === ' ' && !isOneCommand) {
      commandLineArgs.push(currentArg.join(''));
      currentArg = [];
    } else {
      currentArg.push(char);
    }
  }
  commandLineArgs.push(currentArg.join(''));
  return commandLineArgs.filter(arg => arg.length > 0 && arg !== '\n');
};
