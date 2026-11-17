/**
 * Subject: спільний інтерфейс колекції книг.
 * Його реалізують і справжня колекція, і заступник, тому клієнт не знає,
 * з яким із двох об'єктів працює.
 */
export class BookCollection {
  constructor() {
    if (new.target === BookCollection) {
      throw new TypeError("BookCollection — інтерфейс, його не можна створити напряму.");
    }
  }

  /**
   * @abstract
   * @param {import("../Book.js").Book} book
   */
  add(book) {
    throw new Error("Метод add не реалізовано.");
  }

  /**
   * @abstract
   * @param {string} author ім'я автора або його частина, без урахування регістру
   * @returns {import("../Book.js").Book[]}
   */
  findByAuthor(author) {
    throw new Error("Метод findByAuthor не реалізовано.");
  }

  /**
   * @abstract
   * @param {import("../Book.js").Book} book
   * @returns {boolean} чи була книга в колекції
   */
  remove(book) {
    throw new Error("Метод remove не реалізовано.");
  }

  /**
   * @abstract
   * @returns {import("../Book.js").Book[]}
   */
  getAll() {
    throw new Error("Метод getAll не реалізовано.");
  }

  /**
   * @abstract
   * @returns {number}
   */
  get size() {
    throw new Error("Властивість size не реалізовано.");
  }
}
