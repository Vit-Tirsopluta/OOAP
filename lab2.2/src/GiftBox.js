import { roundMoney } from "./money.js";

export const BOX_WEIGHT = 500;
export const WEIGHT_TOLERANCE = 10;

/**
 * Product: готовий подарунковий набір.
 * Створюється лише через будівельника, тому конструктор перевіряє вагу.
 */
export class GiftBox {
  /** @type {Map<import("./CandyType.js").CandyType, number>} */
  #pieces;

  /**
   * @param {string} name назва набору
   * @param {Map<import("./CandyType.js").CandyType, number>} pieces кількість штук кожного виду
   * @param {number} pricePerKg вартість 1 кг солодощів, грн
   */
  constructor(name, pieces, pricePerKg) {
    this.name = name;
    this.pricePerKg = pricePerKg;
    this.#pieces = new Map(pieces);

    if (Math.abs(this.getWeight() - BOX_WEIGHT) > WEIGHT_TOLERANCE) {
      throw new RangeError(
        `Вага набору «${name}» ${this.getWeight()} г виходить за межі ${BOX_WEIGHT} ± ${WEIGHT_TOLERANCE} г.`,
      );
    }

    Object.freeze(this);
  }

  /**
   * @param {import("./CandyType.js").CandyType} type
   * @returns {number} кількість штук
   */
  getPieces(type) {
    return this.#pieces.get(type) ?? 0;
  }

  /**
   * @param {import("./CandyType.js").CandyType} type
   * @returns {number} вага виду солодощів, г
   */
  getWeightOf(type) {
    return this.getPieces(type) * type.pieceWeight;
  }

  /** @returns {number} загальна вага набору, г */
  getWeight() {
    return [...this.#pieces.keys()].reduce((sum, type) => sum + this.getWeightOf(type), 0);
  }

  /** @returns {number} вартість набору, грн */
  getPrice() {
    return roundMoney((this.getWeight() / 1000) * this.pricePerKg);
  }
}
