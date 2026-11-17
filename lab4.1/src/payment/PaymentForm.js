/**
 * Implementor: форма оплати праці.
 * Надає примітивні операції нарахування за табелем; про професії працівників
 * нічого не знає, тому ієрархії працівників і форм оплати змінюються незалежно.
 */
export class PaymentForm {
  constructor() {
    if (new.target === PaymentForm) {
      throw new TypeError("PaymentForm — абстрактний клас.");
    }
  }

  /**
   * @abstract
   * @returns {string} назва форми оплати
   */
  get title() {
    throw new Error("Властивість title не реалізовано.");
  }

  /**
   * @abstract
   * @returns {string} тариф у зручному для читання вигляді
   */
  get tariff() {
    throw new Error("Властивість tariff не реалізовано.");
  }

  /**
   * @abstract
   * @param {import("../WorkReport.js").WorkReport} workReport
   * @returns {number} нарахована сума, грн
   */
  calculateEarnings(workReport) {
    throw new Error("Метод calculateEarnings не реалізовано.");
  }

  /**
   * @abstract
   * @param {import("../WorkReport.js").WorkReport} workReport
   * @returns {string} розшифровка нарахування
   */
  describeEarnings(workReport) {
    throw new Error("Метод describeEarnings не реалізовано.");
  }
}
