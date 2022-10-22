const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const {
  NODE_ENV, PORT, MONGODB_URL, JWT_SECRET_KEY,
} = process.env;

module.exports = {
  JWT_SECRET_KEY: NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
  MONGODB_URL:
    NODE_ENV === 'production'
      ? MONGODB_URL
      : 'mongodb://localhost:27017/moviesdb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
};
