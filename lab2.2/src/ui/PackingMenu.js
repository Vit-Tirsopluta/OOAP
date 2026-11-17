import { formatMoney } from "../money.js";
import { CandyType } from "../CandyType.js";

/** Меню оператора пакувальної лінії. */
export class PackingMenu {
  #builders;
  #packingLine;
  #io;

  /**
   * @param {{
   *   builders: import("../builders/BoxBuilder.js").BoxBuilder[],
   *   packingLine: import("../PackingLine.js").PackingLine,
   *   io: import("./ConsoleIO.js").ConsoleIO,
   * }} params
   */
  constructor({ builders, packingLine, io }) {
    this.#builders = builders;
    this.#packingLine = packingLine;
    this.#io = io;
  }

  async run() {
    this.#io.print("=== Пакування подарункових наборів ===");
    this.#io.print(`Вартість 1 кг солодощів: ${formatMoney(this.#packingLine.pricePerKg)}`);

    while (true) {
      this.#io.print();
      this.#builders.forEach((builder, index) => {
        this.#io.print(`${index + 1}. ${builder.name}`);
      });
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Який набір запустити на пакування: ", 0, this.#builders.length);

      if (choice === 0) {
        return;
      }

      this.#io.print();
      this.#printBox(this.#packingLine.pack(this.#builders[choice - 1]));
    }
  }

  /**
   * @param {import("../GiftBox.js").GiftBox} box
   */
  #printBox(box) {
    this.#io.print(`--- Набір «${box.name}» ---`);
    this.#io.printTable(
      ["Вид солодощів", "Штук", "Вага, г"],
      CandyType.values().map((type) => [
        type.title,
        box.getPieces(type),
        box.getWeightOf(type),
      ]),
    );
    this.#io.print();
    this.#io.print(`Загальна вага: ${box.getWeight()} г`);
    this.#io.print(`Ціна набору:   ${formatMoney(box.getPrice())}`);
  }
}
