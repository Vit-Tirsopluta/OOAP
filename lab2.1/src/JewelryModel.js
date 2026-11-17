/**
 * Модель прикраси: конструкторський задум, який не залежить від металу.
 * Ту саму модель можна виконати і в золоті, і в сріблі.
 */
export class JewelryModel {
  /**
   * @param {{
   *   name: string,
   *   kind: string,
   *   weightGrams: number,
   *   complexity: number,
   * }} params complexity — складність роботи, від 1 до 5
   */
  constructor({ name, kind, weightGrams, complexity }) {
    if (!Number.isInteger(complexity) || complexity < 1 || complexity > 5) {
      throw new RangeError(`Складність моделі «${name}» має бути від 1 до 5.`);
    }

    this.name = name;
    this.kind = kind;
    this.weightGrams = weightGrams;
    this.complexity = complexity;
    Object.freeze(this);
  }
}
