import { CandyType } from "../CandyType.js";
import { GiftBox } from "../GiftBox.js";

export class BoxBuilder {
  /** @type {Map<CandyType, number>} */
  #pieces = new Map();

  constructor() {
    if (new.target === BoxBuilder) {
      throw new TypeError("BoxBuilder — абстрактний клас.");
    }
  }

  /**
   * @abstract
   * @returns {string} назва набору
   */
  get name() {
    throw new Error("Властивість name не реалізовано.");
  }

  /** Крок 1. @abstract */
  addLollipops() {
    throw new Error("Метод addLollipops не реалізовано.");
  }

  /** Крок 2. @abstract */
  addChocolates() {
    throw new Error("Метод addChocolates не реалізовано.");
  }

  /** Крок 3. @abstract */
  addWaffles() {
    throw new Error("Метод addWaffles не реалізовано.");
  }

  /** Крок 4. @abstract */
  addDragee() {
    throw new Error("Метод addDragee не реалізовано.");
  }

  /** Очищує заготовку перед складанням нового набору. */
  reset() {
    this.#pieces = new Map();
  }

  /**
   * Для конкретних будівельників: записує кількість штук виду солодощів.
   * @param {CandyType} type
   * @param {number} pieces
   */
  putPieces(type, pieces) {
    this.#pieces.set(type, pieces);
  }

  /**
   * @param {number} pricePerKg вартість 1 кг, грн
   * @returns {GiftBox}
   */
  getResult(pricePerKg) {
    const missing = CandyType.values().filter((type) => !this.#pieces.has(type));

    if (missing.length > 0) {
      throw new Error(
        `Набір «${this.name}» не готовий: не додано ${missing.map((type) => type.title).join(", ")}.`,
      );
    }

    return new GiftBox(this.name, this.#pieces, pricePerKg);
  }
}
