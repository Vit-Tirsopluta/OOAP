import { PaymentForm } from "./PaymentForm.js";
import { formatMoney, roundMoney } from "../money.js";

/** ConcreteImplementor A: почасова оплата — за кількість відпрацьованих годин. */
export class HourlyPayment extends PaymentForm {
  /**
   * @param {number} hourlyRate ставка, грн за годину
   */
  constructor(hourlyRate) {
    super();

    if (!(hourlyRate > 0)) {
      throw new RangeError("Погодинна ставка має бути додатною.");
    }

    this.hourlyRate = hourlyRate;
  }

  get title() {
    return "почасова";
  }

  get tariff() {
    return `${formatMoney(this.hourlyRate)}/год`;
  }

  calculateEarnings(workReport) {
    return roundMoney(workReport.hoursWorked * this.hourlyRate);
  }

  describeEarnings(workReport) {
    return `${workReport.hoursWorked} год × ${formatMoney(this.hourlyRate)}`;
  }
}
