/**
 * Director: пакувальна лінія. Знає порядок кроків, але не знає, який саме
 * набір складається. Будівельника отримує ззовні.
 */
export class PackingLine {
  #pricePerKg;

  /**
   * @param {number} pricePerKg вартість 1 кг солодощів, грн; задається при запуску
   */
  constructor(pricePerKg) {
    this.#pricePerKg = pricePerKg;
  }

  get pricePerKg() {
    return this.#pricePerKg;
  }

  /**
   * @param {import("./builders/BoxBuilder.js").BoxBuilder} builder
   * @returns {import("./GiftBox.js").GiftBox}
   */
  pack(builder) {
    builder.reset();
    builder.addLollipops();
    builder.addChocolates();
    builder.addWaffles();
    builder.addDragee();

    return builder.getResult(this.#pricePerKg);
  }
}