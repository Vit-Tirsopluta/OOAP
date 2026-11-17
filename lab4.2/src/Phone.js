/**
 * Інтерфейс телефону, яким користується програма. Метод makeCall — «Зробити виклик».
 */
export class Phone {
  constructor() {
    if (new.target === Phone) {
      throw new TypeError("Phone — інтерфейс, його не можна створити напряму.");
    }
  }

  /**
   * @abstract
   * @param {string} contact кому дзвонимо
   * @returns {string} опис виконаного дзвінка
   */
  makeCall(contact) {
    throw new Error("Метод makeCall не реалізовано.");
  }
}
