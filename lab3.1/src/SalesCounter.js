import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ProductGroup } from "./ProductGroup.js";
import { formatDateTime } from "./format.js";

const LOG_FILE = join(import.meta.dirname, "..", "sales.log");

/**
 * Singleton з ранньою ініціалізацією: лічильник проданих товарів.
 * Єдиний екземпляр створюється під час завантаження класу, а не при першому
 * зверненні, тому getInstance() нічого не перевіряє — лише повертає його.
 */
export class SalesCounter {
  // Порядок статичних полів важливий: прапорець має існувати до створення екземпляра.
  static #instanceCreated = false;
  static #instance = new SalesCounter();

  /** Глобальна точка доступу до єдиного екземпляра. */
  static getInstance() {
    return SalesCounter.#instance;
  }

  /** @type {Map<ProductGroup, number>} */
  #counts = new Map();
  #totalCost = 0;
  #logFile = LOG_FILE;
  #createdAt = new Date();

  /** У JavaScript немає закритих конструкторів, тому повторне створення блокує перевірка. */
  constructor() {
    if (SalesCounter.#instanceCreated) {
      throw new Error(
        "SalesCounter існує в єдиному екземплярі — використовуйте SalesCounter.getInstance().",
      );
    }

    SalesCounter.#instanceCreated = true;

    for (const group of ProductGroup.values()) {
      this.#counts.set(group, 0);
    }

    // Журнал ведеться за поточний сеанс: кількість рядків дорівнює лічильнику.
    writeFileSync(this.#logFile, "");
  }

  /**
   * Реєструє продаж: збільшує лічильники та дописує в журнал час і групу товару.
   * @param {import("./Product.js").Product} product
   * @param {Date} [soldAt]
   */
  registerSale(product, soldAt = new Date()) {
    this.#counts.set(product.group, this.#counts.get(product.group) + 1);
    this.#totalCost += product.getPrice();
    appendFileSync(this.#logFile, `${formatDateTime(soldAt)} | ${product.group.title}\n`);
  }

  /**
   * @param {ProductGroup} group
   * @returns {number} кількість проданих товарів групи
   */
  getCount(group) {
    return this.#counts.get(group);
  }

  get totalCount() {
    let total = 0;

    for (const count of this.#counts.values()) {
      total += count;
    }

    return total;
  }

  /** Сумарна вартість проданих товарів, коп. */
  get totalCost() {
    return this.#totalCost;
  }

  get logFile() {
    return this.#logFile;
  }

  get createdAt() {
    return this.#createdAt;
  }

  readLog() {
    return readFileSync(this.#logFile, "utf8");
  }
}
