import { formatMoney } from "../money.js";

/** Меню перегляду каталогу. Працює з фабриками лише через інтерфейс JewelryFactory. */
export class CatalogMenu {
  #factories;
  #catalog;
  #io;

  /**
   * @param {{
   *   factories: import("../factories/JewelryFactory.js").JewelryFactory[],
   *   catalog: import("../JewelryModel.js").JewelryModel[],
   *   io: import("./ConsoleIO.js").ConsoleIO,
   * }} params
   */
  constructor({ factories, catalog, io }) {
    this.#factories = factories;
    this.#catalog = catalog;
    this.#io = io;
  }

  async run() {
    this.#io.print("=== Каталог ювелірних виробів ===");

    while (true) {
      this.#io.print();
      this.#factories.forEach((factory, index) => {
        this.#io.print(`${index + 1}. ${factory.title}`);
      });
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Категорія: ", 0, this.#factories.length);

      if (choice === 0) {
        return;
      }

      this.#io.print();
      this.#printCategory(this.#factories[choice - 1]);
    }
  }

  /**
   * @param {import("../factories/JewelryFactory.js").JewelryFactory} factory
   */
  #printCategory(factory) {
    const items = this.#catalog.map((model) => factory.createItem(model));

    this.#io.print(`--- Категорія «${factory.title}» (ціна ${formatMoney(factory.metal.pricePerGram)} за 1 г) ---`);
    this.#io.printTable(
      ["Модель", "Виріб", "Вага, г", "Складність", "Метал, грн", "Робота, грн", "Ціна, грн"],
      items.map((item) => [
        item.model.name,
        item.kind,
        item.model.weightGrams.toFixed(1),
        item.model.complexity,
        item.getMetalCost().toFixed(2),
        item.getLaborCost().toFixed(2),
        item.getPrice().toFixed(2),
      ]),
    );

    const total = items.reduce((sum, item) => sum + item.getPrice(), 0);
    this.#io.print();
    this.#io.print(`Виробів у категорії: ${items.length}, вартість усіх: ${formatMoney(total)}`);
  }
}
