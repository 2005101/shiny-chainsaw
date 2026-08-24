const assert = require('assert/strict');
const { createBot } = require('../index');

async function main() {
  const bot = createBot();
  assert.equal(bot.commands.size, 131);

  const replies = [];
  const reply = async text => {
    replies.push(text);
    return text;
  };

  await bot.dispatch({ text: '.ping', senderId: 'smoke-test', reply });
  await bot.dispatch({ text: '.calc 2 + 3 * 4', senderId: 'smoke-test', reply });
  await bot.dispatch({ text: '.joke', senderId: 'smoke-test', reply });
  await bot.dispatch({ text: '.deposit 10', senderId: 'smoke-test', reply });
  assert.deepEqual(replies.slice(0, 3), ['Pong!', '14', 'Why did the developer go broke? Because they used up all their cache.']);
  assert.equal(replies[3], 'Insufficient funds.');
  assert.equal(await bot.dispatch({ text: 'hello' }), null);
  assert.equal((await bot.dispatch({ text: '.missing', reply }))?.ok, false);
  console.log(`Smoke tests passed for ${bot.commands.size} commands.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});