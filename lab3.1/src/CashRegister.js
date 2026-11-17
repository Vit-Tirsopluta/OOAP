import { Product } from "./Product.js";
import { SalesCounter } from "./SalesCounter.js";

/**
 * Каса відділу — клієнт одинака. Кас кілька, але кожна звертається до того
 * самого лічильника через SalesCounter.getInstance().
 */
export class CashRegister {
  /**
   * @param {string} title
   * @param {import("./ProductGroup.js").ProductGroup} group група товарів відділу
   */
  constructor(title, group) {
    this.title = title;
    this.group = group;
  }

  /** Продає товар своєї групи з випадковою вартістю та реєструє продаж. */
  sell() {
    const product = Product.random(this.group);
    SalesCounter.getInstance().registerSale(product);

    return product;
  }
}
