import { Book } from "../Book.js";
import { AccessDeniedError } from "../access/AccessLog.js";

const pad = (value) => String(value).padStart(2, "0");
const formatTime = (date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

/**
 * Client: меню бібліотеки. Працює з колекцією лише через інтерфейс
 * BookCollection і не знає, що за ним стоїть заступник.
 */
export class LibraryMenu {
  #users;
  #openCollection;
  #log;
  #io;
  /** @type {import("../collection/BookCollection.js").BookCollection} */
  #collection = null;
  /** @type {import("../access/User.js").User} */
  #user = null;

  /**
   * @param {{
   *   users: import("../access/User.js").User[],
   *   openCollection: (user: import("../access/User.js").User) =>
   *     import("../collection/BookCollection.js").BookCollection,
   *   log: import("../access/AccessLog.js").AccessLog,
   *   io: import("./ConsoleIO.js").ConsoleIO,
   * }} params openCollection — видає колекцію для роботи від імені користувача
   */
  constructor({ users, openCollection, log, io }) {
    this.#users = users;
    this.#openCollection = openCollection;
    this.#log = log;
    this.#io = io;
  }

  async run() {
    this.#io.print("=== Бібліотека: список книг ===");
    await this.#chooseUser();

    while (true) {
      this.#io.print();
      this.#io.print(`Користувач: ${this.#user}. Книг у колекції: ${this.#collection.size}`);
      this.#io.print("1. Усі книги");
      this.#io.print("2. Пошук за автором");
      this.#io.print("3. Додати книгу");
      this.#io.print("4. Видалити книгу");
      this.#io.print("5. Журнал доступу");
      this.#io.print("6. Змінити користувача");
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Ваш вибір: ", 0, 6);
      this.#io.print();

      if (choice === 0) {
        return;
      }

      try {
        if (choice === 1) {
          this.#printBooks(this.#collection.getAll());
        } else if (choice === 2) {
          await this.#search();
        } else if (choice === 3) {
          await this.#addBook();
        } else if (choice === 4) {
          await this.#removeBook();
        } else if (choice === 5) {
          this.#showLog();
        } else {
          await this.#chooseUser();
        }
      } catch (error) {
        // Відмова в доступі — єдиний новий вид винятку, який з'являється через заступника.
        if (!(error instanceof AccessDeniedError) && !(error instanceof RangeError)) {
          throw error;
        }

        this.#io.print(error.message);
      }
    }
  }

  async #chooseUser() {
    this.#io.print("Хто працює з колекцією:");
    this.#users.forEach((user, index) => {
      this.#io.print(`  ${index + 1}. ${user}`);
    });

    const number = await this.#io.askInteger("Номер користувача: ", 1, this.#users.length);
    this.#user = this.#users[number - 1];
    this.#collection = this.#openCollection(this.#user);
  }

  /**
   * @param {readonly Book[]} books
   */
  #printBooks(books) {
    if (books.length === 0) {
      this.#io.print("Книг не знайдено.");
      return;
    }

    this.#io.printTable(
      ["№", "Автор", "Назва", "Рік"],
      books.map((book, index) => [index + 1, book.author, book.title, book.year]),
    );
  }

  async #search() {
    const author = await this.#io.askText("Автор (можна частину імені): ");
    const books = this.#collection.findByAuthor(author);

    this.#io.print();
    this.#io.print(`Знайдено книг: ${books.length}`);
    this.#printBooks(books);
  }

  async #addBook() {
    const title = await this.#io.askText("Назва: ");
    const author = await this.#io.askText("Автор: ");
    const year = await this.#io.askInteger(
      "Рік видання: ",
      Book.MIN_YEAR,
      new Date().getFullYear(),
    );
    const book = new Book(title, author, year);

    try {
      this.#collection.add(book);
      this.#io.print(`Додано: ${book}`);
    } catch (error) {
      if (error instanceof AccessDeniedError) {
        throw error;
      }

      this.#io.print(error.message);
    }
  }

  async #removeBook() {
    const books = this.#collection.getAll();
    this.#printBooks(books);

    if (books.length === 0) {
      return;
    }

    const number = await this.#io.askInteger(
      "Номер книги для видалення (0 — назад): ",
      0,
      books.length,
    );

    if (number === 0) {
      return;
    }

    const book = books[number - 1];

    if (!(await this.#io.confirm(`Видалити ${book}?`))) {
      return;
    }

    this.#io.print(this.#collection.remove(book) ? "Книгу видалено." : "Книги вже немає в колекції.");
  }

  #showLog() {
    const { entries } = this.#log;

    if (entries.length === 0) {
      this.#io.print("Звернень ще не було.");
      return;
    }

    this.#io.printTable(
      ["Час", "Користувач", "Операція", "Деталі", "Доступ"],
      entries.map((entry) => [
        formatTime(entry.time),
        entry.user,
        entry.operation,
        entry.details,
        entry.allowed ? "дозволено" : "відмовлено",
      ]),
    );
  }
}
