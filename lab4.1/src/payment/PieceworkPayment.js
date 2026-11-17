import { PaymentForm } from "./PaymentForm.js";
import { formatMoney, roundMoney } from "../money.js";

/** ConcreteImplementor B: відрядна оплата — за обсяг виконаної роботи. */
export class PieceworkPayment extends PaymentForm {
  /**
   * @param {number} unitPrice розцінка, грн за одиницю роботи
   */
  constructor(unitPrice) {
    super();

    if (!(unitPrice > 0)) {
      throw new RangeError("Розцінка за одиницю роботи має бути додатною.");
    }

    this.unitPrice = unitPrice;
  }

  get title() {
    return "відрядна";
  }

  get tariff() {
    return `${formatMoney(this.unitPrice)}/од.`;
  }

  calculateEarnings(workReport) {
    return roundMoney(workReport.unitsDone * this.unitPrice);
  }

  describeEarnings(workReport) {
    return `${workReport.unitsDone} од. × ${formatMoney(this.unitPrice)}`;
  }
}
