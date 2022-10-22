const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/moviesdb' } = process.env; // пока что по умолчанию, потом скрыть

// Импортируем мидлвэры
const error = require('./middlewares/error');

// Импортируем роутеры
const routers = require('./routes/index');

// Подключение к серверу mongoDB
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

// Временная авторизация
app.use('/', (req, res, next) => {
  req.user = {
    _id: '63515924da185ce2f0a8217c',
  };

  next();
});

// Основные роуты
app.use(routers);

// Централизованный обработчик ошибок (основные ошибки + celebrate)
app.use(error);

app.listen(PORT);
