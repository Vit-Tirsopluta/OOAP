import { JewelryKind } from "../JewelryKind.js";

/**
 * AbstractFactory: виробнича лінія одного металу.
 * Створює цілу «сім'ю» виробів: сережки, каблучки, ланцюжки, підвіски, браслети.
 * Усі вони однаково виконані з металу цієї фабрики.
 */
export class JewelryFactory {
  constructor() {
    if (new.target === JewelryFactory) {
      throw new TypeError("JewelryFactory — абстрактний клас.");
    }
  }

  /** @abstract @returns {string} назва категорії каталогу */
  get title() {
    throw new Error("Властивість title не реалізовано.");
  }

  /** @abstract @returns {import("../Metal.js").Metal} */
  get metal() {
    throw new Error("Властивість metal не реалізовано.");
  }

  /** @abstract */
  createEarrings(model) {
    throw new Error("Метод createEarrings не реалізовано.");
  }

  /** @abstract */
  createRing(model) {
    throw new Error("Метод createRing не реалізовано.");
  }

  /** @abstract */
  createChain(model) {
    throw new Error("Метод createChain не реалізовано.");
  }

  /** @abstract */
  createPendant(model) {
    throw new Error("Метод createPendant не реалізовано.");
  }

  /** @abstract */
  createBracelet(model) {
    throw new Error("Метод createBracelet не реалізовано.");
  }

  /**
   * Вибирає потрібний метод за видом моделі.
   * @param {import("../JewelryModel.js").JewelryModel} model
   * @returns {import("../products/Jewelry.js").Jewelry}
   */
  createItem(model) {
    switch (model.kind) {
      case JewelryKind.EARRINGS: return this.createEarrings(model);
      case JewelryKind.RING: return this.createRing(model);
      case JewelryKind.CHAIN: return this.createChain(model);
      case JewelryKind.PENDANT: return this.createPendant(model);
      case JewelryKind.BRACELET: return this.createBracelet(model);
      default: throw new RangeError(`Невідомий вид виробу: ${model.kind}`);
    }
  }
}
