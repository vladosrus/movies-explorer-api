const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Создание сервера
const express = require('express');

const app = express();

const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env; // пока что по умолчанию, потом скрыть
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Импортируем роутеры
const routerSignUp = require('./routes/signUp');
const routerSignIn = require('./routes/signIn');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const routerError = require('./routes/error');

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
app.use('/', routerSignUp);
app.use('/', routerSignIn);
app.use('/', routerUsers);
app.use('/', routerMovies);

// Обработка неправильного пути
app.use('*', routerError);

app.listen(PORT);
