require('dotenv').config();

module.exports = {
  prefix: process.env.PREFIX || '.',
  owner: process.env.OWNER || '',
  botName: process.env.BOT_NAME || 'TANISHA-MD',
  port: Number(process.env.PORT || 3000)
};
