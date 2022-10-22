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
};
