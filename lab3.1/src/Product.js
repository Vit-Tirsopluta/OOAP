/** Випадкове ціле з проміжку [min, max]. */
function randomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Товар. Усі суми зберігаються в копійках, щоб уникнути похибок округлення. */
export class Product {
  /**
   * @param {string} name
   * @param {import("./ProductGroup.js").ProductGroup} group
   * @param {number} basePrice вартість без надбавки, коп.
   */
  constructor(name, group, basePrice) {
    this.name = name;
    this.group = group;
    this.basePrice = basePrice;
  }

  /**
   * Товар групи з випадковою базовою вартістю.
   * @param {import("./ProductGroup.js").ProductGroup} group
   */
  static random(group) {
    const [minPrice, maxPrice] = group.priceRange;
    const name = group.productNames[randomInteger(0, group.productNames.length - 1)];

    return new Product(name, group, randomInteger(minPrice * 100, maxPrice * 100));
  }

  /** Надбавка групи: 5% — продукти, 10% — ліки, 15% — одяг. */
  getMarkup() {
    return Math.round((this.basePrice * this.group.markupPercent) / 100);
  }

  getPrice() {
    return this.basePrice + this.getMarkup();
  }
}
