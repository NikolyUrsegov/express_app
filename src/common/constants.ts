export const regexHttps = '^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$'

export enum CodeResponsesEnum {
  OK = 200, // Успешно
  CREATED = 201, // Успешно создано
  NO_CONTENT = 204, // Нет содержимого для отправки
  BAD_REQUEST = 400, // Ошибка в запросе
  UNAUTHORIZED = 401, // Неавторизован
  FORBIDDEN = 403, // Запрещено
  NOT_FOUND = 404, // Не найдено
  INTERNAL_SERVER_ERROR = 500, // Внутренняя ошибка сервера
}
