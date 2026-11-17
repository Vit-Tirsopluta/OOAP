/** Вид солодощів у наборі: назва і вага однієї штуки, г. */
export class CandyType {
  static LOLLIPOP = new CandyType("Льодяники", 10);
  static CHOCOLATE = new CandyType("Шоколадні цукерки", 20);
  static WAFFLE = new CandyType("Вафлі", 25);
  static DRAGEE = new CandyType("Драже", 5);

  /** @returns {CandyType[]} усі види в порядку виводу */
  static values() {
    return [CandyType.LOLLIPOP, CandyType.CHOCOLATE, CandyType.WAFFLE, CandyType.DRAGEE];
  }

  /**
   * @param {string} title
   * @param {number} pieceWeight вага однієї штуки, г
   */
  constructor(title, pieceWeight) {
    this.title = title;
    this.pieceWeight = pieceWeight;
    Object.freeze(this);
  }
}
