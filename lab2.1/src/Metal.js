/**
 * Дорогоцінний метал: від нього залежить вартість матеріалу.
 * Ціни за грам умовні.
 */
export class Metal {
  static GOLD = new Metal("Золото", 1800);
  static SILVER = new Metal("Срібло", 35);

  /**
   * @param {string} title назва категорії в каталозі
   * @param {number} pricePerGram ціна 1 г металу, грн
   */
  constructor(title, pricePerGram) {
    this.title = title;
    this.pricePerGram = pricePerGram;
    Object.freeze(this);
  }
}
