const config = require('../config/config');

function buildMenu(categories = {}) {
  return Object.entries(categories)
    .map(([name, commands]) => `${name}: ${commands.map(command => `${config.prefix}${command}`).join(', ')}`)
    .join('\n');
}

module.exports = { buildMenu };
