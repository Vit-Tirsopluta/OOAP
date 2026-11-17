/**
 * Книга. Об'єкт заморожений, тому, отримавши посилання на книгу з колекції,
 * клієнт не може змінити її дані в обхід заступника.
 */
export class Book {
  static MIN_YEAR = 1450;

  /**
   * @param {string} title
   * @param {string} author
   * @param {number} year рік видання
   */
  constructor(title, author, year) {
    if (title.trim() === "" || author.trim() === "") {
      throw new RangeError("Назва й автор книги не можуть бути порожніми.");
    }

    if (!Number.isInteger(year) || year < Book.MIN_YEAR || year > new Date().getFullYear()) {
      throw new RangeError(`Рік видання має бути цілим числом від ${Book.MIN_YEAR} до поточного.`);
    }

    this.title = title.trim();
    this.author = author.trim();
    this.year = year;
    Object.freeze(this);
  }

  toString() {
    return `${this.author} — «${this.title}» (${this.year})`;
  }
}
