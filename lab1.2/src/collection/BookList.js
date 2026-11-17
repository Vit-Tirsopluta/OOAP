import { BookCollection } from "./BookCollection.js";

/**
 * RealSubject: власна колекція книг, яка реально зберігає дані.
 * Про користувачів і права доступу нічого не знає — цим займається заступник.
 */
export class BookList extends BookCollection {
  /** @type {import("../Book.js").Book[]} */
  #books = [];

  add(book) {
    const duplicate = this.#books.some(
      (stored) => stored.title === book.title && stored.author === book.author,
    );

    if (duplicate) {
      throw new Error(`Книга ${book} уже є в колекції.`);
    }

    this.#books.push(book);
  }

  findByAuthor(author) {
    const query = author.trim().toLowerCase();

    return this.#books.filter((book) => book.author.toLowerCase().includes(query));
  }

  remove(book) {
    const index = this.#books.indexOf(book);

    if (index === -1) {
      return false;
    }

    this.#books.splice(index, 1);
    return true;
  }

  getAll() {
    return [...this.#books];
  }

  get size() {
    return this.#books.length;
  }
}
