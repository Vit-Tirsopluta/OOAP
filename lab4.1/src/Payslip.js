import { roundMoney } from "./money.js";

/** Розрахунковий лист: результат нарахування зарплати працівникові. */
export class Payslip {
  /**
   * @param {{
   *   employeeName: string,
   *   position: string,
   *   paymentTitle: string,
   *   earningsDetails: string,
   *   earnings: number,
   *   bonusPercent: number,
   *   bonusReason: string,
   * }} params
   */
  constructor({
    employeeName,
    position,
    paymentTitle,
    earningsDetails,
    earnings,
    bonusPercent,
    bonusReason,
  }) {
    this.employeeName = employeeName;
    this.position = position;
    this.paymentTitle = paymentTitle;
    this.earningsDetails = earningsDetails;
    this.earnings = earnings;
    this.bonusPercent = bonusPercent;
    this.bonusReason = bonusReason;
    this.bonus = roundMoney((earnings * bonusPercent) / 100);
    this.total = roundMoney(earnings + this.bonus);
    Object.freeze(this);
  }
}
