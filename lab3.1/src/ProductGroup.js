/** Група товарів: торгова надбавка та дані для випадкового товару. */
export class ProductGroup {
  static FOOD = new ProductGroup({
    title: "Продукти харчування",
    markupPercent: 5,
    priceRange: [15, 350],
    productNames: ["Хліб", "Молоко", "Сир твердий", "Кава мелена", "Яблука", "Олія соняшникова"],
  });

  static MEDICINE = new ProductGroup({
    title: "Ліки",
    markupPercent: 10,
    priceRange: [40, 900],
    productNames: ["Парацетамол", "Вітамін C", "Ібупрофен", "Сироп від кашлю", "Краплі для носа", "Активоване вугілля"],
  });

  static CLOTHING = new ProductGroup({
    title: "Одяг",
    markupPercent: 15,
    priceRange: [250, 4500],
    productNames: ["Футболка", "Джинси", "Светр", "Куртка", "Сорочка", "Шкарпетки"],
  });

  static values() {
    return [ProductGroup.FOOD, ProductGroup.MEDICINE, ProductGroup.CLOTHING];
  }

  /**
   * @param {{
   *   title: string,
   *   markupPercent: number,
   *   priceRange: [number, number],
   *   productNames: string[],
   * }} params priceRange — межі базової вартості, грн
   */
  constructor({ title, markupPercent, priceRange, productNames }) {
    this.title = title;
    this.markupPercent = markupPercent;
    this.priceRange = priceRange;
    this.productNames = productNames;
    Object.freeze(this);
  }
}
