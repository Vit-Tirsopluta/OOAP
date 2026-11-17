import { ProductGroup } from "../ProductGroup.js";
import { SalesCounter } from "../SalesCounter.js";
import { formatMoney, formatTime } from "../format.js";

const MAX_BATCH = 50;

/** Меню продавця: продаж товарів і перегляд стану лічильника. */
export class ShopMenu {
  #registers;
  #io;
  #startedAt;

  /**
   * @param {import("../CashRegister.js").CashRegister[]} registers
   * @param {import("./ConsoleIO.js").ConsoleIO} io
   * @param {Date} startedAt момент запуску main()
   */
  constructor(registers, io, startedAt) {
    this.#registers = registers;
    this.#io = io;
    this.#startedAt = startedAt;
  }

  async run() {
    this.#io.print("=== Магазин: облік проданих товарів ===");

    while (true) {
      this.#io.print();
      this.#io.print("1. Продати товар");
      this.#io.print("2. Продати кілька випадкових товарів");
      this.#io.print("3. Стан лічильника");
      this.#io.print("4. Журнал продажів (файл)");
      this.#io.print("5. Перевірити єдиність лічильника");
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Ваш вибір: ", 0, 5);
      this.#io.print();

      if (choice === 0) {
        return;
      }

      if (choice === 1) {
        await this.#sellOne();
      } else if (choice === 2) {
        await this.#sellBatch();
      } else if (choice === 3) {
        this.#showCounter();
      } else if (choice === 4) {
        this.#showLog();
      } else {
        this.#checkSingleton();
      }
    }
  }

  async #sellOne() {
    this.#io.print("Каса:");
    this.#registers.forEach((register, index) => {
      const { title, markupPercent } = register.group;
      this.#io.print(`  ${index + 1}. ${register.title} — ${title}, надбавка ${markupPercent}%`);
    });

    const number = await this.#io.askInteger(
      "Номер каси (0 — назад): ",
      0,
      this.#registers.length,
    );

    if (number !== 0) {
      this.#sell(this.#registers[number - 1]);
    }
  }

  async #sellBatch() {
    const amount = await this.#io.askInteger(
      `Скільки товарів продати (1–${MAX_BATCH}, 0 — назад): `,
      0,
      MAX_BATCH,
    );

    for (let i = 0; i < amount; i++) {
      this.#sell(this.#registers[Math.floor(Math.random() * this.#registers.length)]);
    }
  }

  /**
   * @param {import("../CashRegister.js").CashRegister} register
   */
  #sell(register) {
    const product = register.sell();

    this.#io.print(
      `[${register.title}] ${product.name}: ${formatMoney(product.basePrice)}` +
        ` + надбавка ${product.group.markupPercent}% (${formatMoney(product.getMarkup())})` +
        ` = ${formatMoney(product.getPrice())}`,
    );
  }

  #showCounter() {
    const counter = SalesCounter.getInstance();

    this.#io.printTable(
      ["Група товарів", "Продано, шт."],
      ProductGroup.values().map((group) => [group.title, counter.getCount(group)]),
    );
    this.#io.print();
    this.#io.print(`Усього продано товарів: ${counter.totalCount}`);
    this.#io.print(`Сумарна вартість:       ${formatMoney(counter.totalCost)}`);
  }

  #showLog() {
    const counter = SalesCounter.getInstance();
    const log = counter.readLog();

    this.#io.print(`Файл журналу: ${counter.logFile}`);
    this.#io.print(log === "" ? "(продажів ще не було)" : log.trimEnd());
  }

  #checkSingleton() {
    const first = SalesCounter.getInstance();
    const second = SalesCounter.getInstance();
    let constructorResult = "створено другий екземпляр (помилка реалізації!)";

    try {
      new SalesCounter();
    } catch (error) {
      constructorResult = `відхилено — ${error.message}`;
    }

    this.#io.print(`getInstance() === getInstance(): ${first === second}`);
    this.#io.print(`new SalesCounter(): ${constructorResult}`);
    this.#io.print();
    this.#io.print(`Екземпляр створено: ${formatTime(first.createdAt)} — під час завантаження класу`);
    this.#io.print(`Початок main():     ${formatTime(this.#startedAt)}`);
    this.#io.print(
      "Рання ініціалізація: об'єкт існував ще до запуску main() і першого виклику getInstance().",
    );
  }
}
