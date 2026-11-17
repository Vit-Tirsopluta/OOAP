import { roundMoney } from "../money.js";

/** Вартість роботи за один рівень складності, грн. Однакова для золота і срібла. */
export const LABOR_PER_COMPLEXITY = 250;

/**
 * AbstractProduct: прикраса з певного металу.
 * Вартість = матеріал (вага × ціна металу) + робота (складність × ставка).
 */
export class Jewelry {
  /**
   * @param {import("../JewelryModel.js").JewelryModel} model
   * @param {import("../Metal.js").Metal} metal
   */
  constructor(model, metal) {
    if (new.target === Jewelry) {
      throw new TypeError("Jewelry — абстрактний клас.");
    }

    this.model = model;
    this.metal = metal;
    Object.freeze(this);
  }

  /** @returns {string} вид виробу, наприклад «Сережки» */
  get kind() {
    return this.model.kind;
  }

  /** @returns {number} вартість металу, грн */
  getMetalCost() {
    return roundMoney(this.model.weightGrams * this.metal.pricePerGram);
  }

  /** @returns {number} вартість роботи, грн; не залежить від металу */
  getLaborCost() {
    return this.model.complexity * LABOR_PER_COMPLEXITY;
  }

  /** @returns {number} повна вартість, грн */
  getPrice() {
    return roundMoney(this.getMetalCost() + this.getLaborCost());
  }
}
