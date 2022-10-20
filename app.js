const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Создание сервера
const express = require('express');

const app = express();

const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env; // пока что по умолчанию, потом скрыть
const mongoose = require('mongoose');

// Подключение к серверу mongoDB
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => console.log('запущено'));
