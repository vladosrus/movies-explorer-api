const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Создание сервера
const express = require('express');

const app = express();

const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env; // пока что по умолчанию, потом скрыть
const mongoose = require('mongoose');

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

// Основные роуты
app.use('/', routerSignUp);
app.use('/', routerSignIn);
app.use('/', routerUsers);
app.use('/', routerMovies);

// Обработка неправильного пути
app.use('*', routerError);

app.listen(PORT);
