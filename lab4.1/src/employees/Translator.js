import { Employee } from "./Employee.js";

/** RefinedAbstraction: перекладач; надбавка залежить від кількості робочих мов. */
export class Translator extends Employee {
  /** Надбавка за кожну мову понад першу, %. */
  static BONUS_PER_EXTRA_LANGUAGE = 5;

  /**
   * @param {string} fullName
   * @param {string[]} languages робочі мови
   * @param {import("../payment/PaymentForm.js").PaymentForm} paymentForm
   */
  constructor(fullName, languages, paymentForm) {
    super(fullName, paymentForm);

    if (languages.length === 0) {
      throw new RangeError("Перекладач має володіти хоча б однією мовою.");
    }

    this.languages = [...languages];
  }

  get position() {
    return `перекладач (${this.languages.join(", ")})`;
  }

  get workUnit() {
    return "сторінка";
  }

  get bonusPercent() {
    return (this.languages.length - 1) * Translator.BONUS_PER_EXTRA_LANGUAGE;
  }

  get bonusReason() {
    return `за кількість робочих мов (${this.languages.length})`;
  }
}
