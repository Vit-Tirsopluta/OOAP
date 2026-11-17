import { Book } from "./Book.js";
import { AccessLog } from "./access/AccessLog.js";
import { Role, User } from "./access/User.js";
import { BookCollectionProxy } from "./collection/BookCollectionProxy.js";
import { BookList } from "./collection/BookList.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";
import { LibraryMenu } from "./ui/LibraryMenu.js";

function createBookList() {
  const books = new BookList();

  for (const book of [
    new Book("Кобзар", "Тарас Шевченко", 1840),
    new Book("Гайдамаки", "Тарас Шевченко", 1841),
    new Book("Захар Беркут", "Іван Франко", 1883),
    new Book("Украдене щастя", "Іван Франко", 1893),
    new Book("Лісова пісня", "Леся Українка", 1911),
    new Book("Тіні забутих предків", "Михайло Коцюбинський", 1911),
    new Book("Маруся Чурай", "Ліна Костенко", 1979),
  ]) {
    books.add(book);
  }

  return books;
}

async function main() {
  // Справжню колекцію бачить лише main: клієнт отримує тільки заступників.
  const books = createBookList();
  const log = new AccessLog();
  const io = new ConsoleIO();

  const menu = new LibraryMenu({
    users: [
      new User("Андрій Коваль", Role.READER),
      new User("Олена Мельник", Role.LIBRARIAN),
    ],
    openCollection: (user) => new BookCollectionProxy(books, user, log),
    log,
    io,
  });

  try {
    await menu.run();
    io.print("Роботу завершено.");
  } catch (error) {
    if (!(error instanceof InputClosedError)) {
      throw error;
    }

    io.print("\nВвід завершено — вихід.");
  } finally {
    io.close();
  }
}

await main();
