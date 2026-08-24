const path = require('path');

module.exports = {
  path: process.env.DATABASE_PATH || path.join(__dirname, '..', 'database', 'users.db')
};
