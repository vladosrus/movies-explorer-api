// Статусы ошибок
const badRequest = '400';
const unauthorized = '401';
const forbidden = '403';
const notFound = '404';
const conflict = '409';
const internalServerError = '500';

// Сообщения статусов ошибок
const badRequestErrorMessage = 'Переданы некорректные данные';
const unauthorizedErrorMessage = 'Необходимо авторизоваться';
const forbiddenErrorMessage = 'Нельзя удалять чужие фильмы';
const notFoundErrorMessage = 'Объект c указанным _id не найден';
const wrongPathErrorMessage = 'Неправильный путь';
const conflictErrorMessage = 'Пользователь с таким email уже зарегистрирован';
const internalServerErrorMessage = 'Произошла ошибка';
const invalidEmailOrPasswordMessage = 'Неправильные почта или пароль';
const invalidIdErrorMessage = 'Передан неправильный id';
const invalidUrlErrorMessage = 'Передан неправильный url';
const invalidEmailFieldErrorMessage = 'Поле email заполнено неверно';
const minLengthNameErrorMessage = 'Минимальная длина поля name - 2 символа';
const maxLengthNameErrorMessage = 'Максимальная длина поля name - 30 символов';

// Сообщения ответов
const successAuthMessage = 'Авторизация прошла успешно';
const successSignoutMessage = 'Пользователь покинул систему';
const successDeleteFilmMessage = 'Фильм удален';

// Создание сообщения об обязательном поле
const requiredErrorMessage = (field) => `Поле ${field} должно быть заполнено`;

// Создание сообщения о пустом поле
const emptyErrorMessage = (field) => `Поле ${field} не должно быть пустым`;

module.exports = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  internalServerError,
  badRequestErrorMessage,
  unauthorizedErrorMessage,
  forbiddenErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
  internalServerErrorMessage,
  wrongPathErrorMessage,
  invalidEmailOrPasswordMessage,
  invalidIdErrorMessage,
  invalidUrlErrorMessage,
  minLengthNameErrorMessage,
  maxLengthNameErrorMessage,
  invalidEmailFieldErrorMessage,
  successAuthMessage,
  successSignoutMessage,
  successDeleteFilmMessage,
  requiredErrorMessage,
  emptyErrorMessage,
};
