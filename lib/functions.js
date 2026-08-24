const config = require('../config/config');

function getCommandName(text = '') {
  const value = text.trim();
  if (!value.startsWith(config.prefix)) return '';
  return value.slice(config.prefix.length).split(/\s+/)[0].toLowerCase();
}

function parseCommand(text = '') {
  const value = text.trim();
  const name = getCommandName(value);
  if (!name) return null;
  const parts = value.slice(config.prefix.length).trim().split(/\s+/);
  return { name: parts.shift().toLowerCase(), args: parts };
}

function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

module.exports = { formatDuration, getCommandName, parseCommand };
