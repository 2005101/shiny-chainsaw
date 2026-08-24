const fs = require('fs');
const path = require('path');

const commandsRoot = path.join(__dirname, '..', 'commands');

function discoverCommands(directory = commandsRoot) {
  const commands = new Map();

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      for (const [name, command] of discoverCommands(entryPath)) commands.set(name, command);
      continue;
    }
    if (!entry.name.endsWith('.js')) continue;
    const command = require(entryPath);
    if (!command.name || typeof command.execute !== 'function') {
      throw new Error(`Invalid command module: ${entryPath}`);
    }
    commands.set(command.name.toLowerCase(), command);
  }

  return commands;
}

module.exports = { discoverCommands };