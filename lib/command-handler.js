const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const { formatDuration } = require('./functions');

const databasePath = require('../config/database').path;
const startedAt = Date.now();
const games = ['rock', 'paper', 'scissors'];
const funResponses = {
  joke: 'Why did the developer go broke? Because they used up all their cache.',
  quote: 'Small, reliable steps make large systems possible.',
  fact: 'JavaScript was created in 1995 and was originally called Mocha.',
  advice: 'Name the behavior you need before choosing the abstraction.',
  compliment: 'You have excellent taste in command-line tools.'
};

function reply(context, text) {
  return context.reply(text);
}

function getUser(context) {
  const directory = path.dirname(databasePath);
  fs.mkdirSync(directory, { recursive: true });
  let users = {};
  try { users = JSON.parse(fs.readFileSync(databasePath, 'utf8') || '{}'); } catch {}
  const id = context.senderId || 'anonymous';
  users[id] = users[id] || { wallet: 0, bank: 0, inventory: [] };
  return { users, id, user: users[id] };
}

function saveUsers(users) {
  fs.writeFileSync(databasePath, JSON.stringify(users, null, 2));
}

function calculate(expression) {
  if (!/^[0-9+\-*/%().\s]+$/.test(expression)) throw new Error('Only basic arithmetic is allowed.');
  return Function(`"use strict"; return (${expression})`)();
}

async function executeCommand(name, context) {
  const args = context.args || [];
  const input = args.join(' ');

  if (name === 'ping') return reply(context, 'Pong!');
  if (name === 'runtime') return reply(context, formatDuration(Date.now() - startedAt));
  if (name === 'calc') {
    try { return reply(context, String(calculate(input))); } catch (error) { return reply(context, error.message); }
  }
  if (name === 'menu') return reply(context, `Available commands: ${context.commandCount || 'all'}\nPrefix: ${config.prefix}`);
  if (funResponses[name]) return reply(context, funResponses[name]);
  if (name === 'coinflip') return reply(context, Math.random() < 0.5 ? 'Heads' : 'Tails');
  if (name === '8ball') return reply(context, ['Yes.', 'No.', 'Ask again later.'][Math.floor(Math.random() * 3)]);
  if (name === 'rps') return reply(context, `I choose ${games[Math.floor(Math.random() * games.length)]}.`);
  if (['balance', 'wallet', 'bank', 'deposit', 'withdraw', 'daily', 'weekly', 'work'].includes(name)) {
    const account = getUser(context);
    if (name === 'deposit' || name === 'withdraw') {
      const amount = Number(args[0]);
      if (!Number.isFinite(amount) || amount <= 0) return reply(context, 'Provide a positive amount.');
      if (name === 'deposit' && account.user.wallet >= amount) { account.user.wallet -= amount; account.user.bank += amount; }
      else if (name === 'withdraw' && account.user.bank >= amount) { account.user.bank -= amount; account.user.wallet += amount; }
      else return reply(context, 'Insufficient funds.');
      saveUsers(account.users);
    }
    return reply(context, `Wallet: ${account.user.wallet}\nBank: ${account.user.bank}`);
  }

  return reply(context, `${name} is ready. Arguments: ${input || 'none'}`);
}

module.exports = { executeCommand };