import { Employee } from "./Employee.js";

/** RefinedAbstraction: токар; надбавка залежить від розряду. */
export class Turner extends Employee {
  static MAX_GRADE = 6;
  /** Надбавка за кожен розряд понад перший, %. */
  static BONUS_PER_GRADE = 4;

  /**
   * @param {string} fullName
   * @param {number} grade розряд, 1–6
   * @param {import("../payment/PaymentForm.js").PaymentForm} paymentForm
   */
  constructor(fullName, grade, paymentForm) {
    super(fullName, paymentForm);

    if (!Number.isInteger(grade) || grade < 1 || grade > Turner.MAX_GRADE) {
      throw new RangeError(`Розряд токаря має бути від 1 до ${Turner.MAX_GRADE}.`);
    }

    this.grade = grade;
  }

  get position() {
    return `токар ${this.grade}-го розряду`;
  }

  get workUnit() {
    return "деталь";
  }

  get bonusPercent() {
    return (this.grade - 1) * Turner.BONUS_PER_GRADE;
  }

  get bonusReason() {
    return `за ${this.grade}-й розряд`;
  }
}
