const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const app = express();
const { PORT, MONGODB_URL } = require('./utils/config');

// Импортируем мидлвэры
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limit');

// Импортируем роутеры
const routers = require('./routes/index');

// Подключение к серверу mongoDB
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

// Логгер запросов
app.use(requestLogger);

// Основные роуты
app.use(routers);

// Логгер ошибок
app.use(errorLogger);

// Централизованный обработчик ошибок ( celebrate + основные ошибки)
app.use(errors());
app.use(error);

app.listen(PORT);
