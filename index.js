const config = require('./config/config');
const { createDispatcher } = require('./lib/dispatcher');
const { executeCommand } = require('./lib/command-handler');

function createBot() {
  const dispatcher = createDispatcher();
  for (const [name, command] of dispatcher.commands) {
    command.execute = context => executeCommand(name, { ...context, commandCount: dispatcher.commands.size });
  }
  return dispatcher;
}

function start() {
  const bot = createBot();
  console.log(`${config.botName} is ready on port ${config.port} with ${bot.commands.size} commands.`);
  return bot;
}

if (require.main === module) start();

module.exports = { createBot, start };
