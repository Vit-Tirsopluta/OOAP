import { Employee } from "./Employee.js";

/** RefinedAbstraction: програміст; надбавка залежить від кваліфікації. */
export class Programmer extends Employee {
  /** Надбавка за кваліфікацію, %. */
  static LEVEL_BONUS = Object.freeze({ Junior: 0, Middle: 10, Senior: 20 });

  /**
   * @param {string} fullName
   * @param {"Junior" | "Middle" | "Senior"} level
   * @param {import("../payment/PaymentForm.js").PaymentForm} paymentForm
   */
  constructor(fullName, level, paymentForm) {
    super(fullName, paymentForm);

    if (!Object.hasOwn(Programmer.LEVEL_BONUS, level)) {
      throw new RangeError(`Невідомий рівень програміста: ${level}`);
    }

    this.level = level;
  }

  get position() {
    return `програміст (${this.level})`;
  }

  get workUnit() {
    return "задача";
  }

  get bonusPercent() {
    return Programmer.LEVEL_BONUS[this.level];
  }

  get bonusReason() {
    return `за кваліфікацію ${this.level}`;
  }
}
