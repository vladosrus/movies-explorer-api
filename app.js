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
const cors = require('./middlewares/cors');

// Импортируем роутеры
const routers = require('./routes');

// Подключение к серверу mongoDB
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

// Логгер запросов
app.use(requestLogger);

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

// Основные роуты
app.use('/diploma/api/', routers);

// Логгер ошибок
app.use(errorLogger);

// Централизованный обработчик ошибок ( celebrate + основные ошибки)
app.use(errors());
app.use(error);

app.listen(PORT);
