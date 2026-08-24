const config = require('../config/config');
const { discoverCommands } = require('./commands');
const { parseCommand } = require('./functions');

function createDispatcher(commands = discoverCommands()) {
  async function dispatch(message = {}) {
    const text = message.text || '';
    const parsed = parseCommand(text);
    if (!parsed) return null;

    const command = commands.get(parsed.name);
    if (!command) return { ok: false, error: `Unknown command: ${parsed.name}` };

    const context = {
      ...message,
      args: parsed.args,
      command: parsed.name,
      prefix: config.prefix,
      reply: message.reply || (async response => response)
    };
    const result = await command.execute(context);
    return result === undefined ? { ok: true, command: parsed.name } : result;
  }

  return { commands, dispatch };
}

module.exports = { createDispatcher };