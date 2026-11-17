import { BookCollection } from "./BookCollection.js";
import { AccessDeniedError } from "../access/AccessLog.js";
import { Operation } from "../access/User.js";

/**
 * Proxy (заступник): має той самий інтерфейс, що й BookList,
 * і делегує йому всі операції, але перед цим перевіряє права користувача
 * та записує кожне звернення в журнал. Списки книг повертає замороженими,
 * тож змінити колекцію можна лише через методи заступника.
 */
export class BookCollectionProxy extends BookCollection {
  #realCollection;
  #user;
  #log;

  /**
   * @param {BookCollection} realCollection об'єкт, що надає сервіс
   * @param {import("../access/User.js").User} user від чийого імені звертаються
   * @param {import("../access/AccessLog.js").AccessLog} log
   */
  constructor(realCollection, user, log) {
    super();
    this.#realCollection = realCollection;
    this.#user = user;
    this.#log = log;
  }

  get user() {
    return this.#user;
  }

  add(book) {
    this.#checkAccess(Operation.ADD, String(book));
    this.#realCollection.add(book);
  }

  findByAuthor(author) {
    this.#checkAccess(Operation.READ, `пошук за автором «${author}»`);
    return Object.freeze(this.#realCollection.findByAuthor(author));
  }

  remove(book) {
    this.#checkAccess(Operation.REMOVE, String(book));
    return this.#realCollection.remove(book);
  }

  getAll() {
    this.#checkAccess(Operation.READ, "список усіх книг");
    return Object.freeze(this.#realCollection.getAll());
  }

  get size() {
    return this.#realCollection.size;
  }

  /**
   * Політика доступу: операцію виконано лише тоді, коли роль користувача її дозволяє.
   * @param {string} operation
   * @param {string} details
   */
  #checkAccess(operation, details) {
    const allowed = this.#user.can(operation);
    this.#log.record(this.#user, operation, details, allowed);

    if (!allowed) {
      throw new AccessDeniedError(this.#user, operation);
    }
  }
}
