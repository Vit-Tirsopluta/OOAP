import { Payslip } from "../Payslip.js";
import { WorkReport } from "../WorkReport.js";
import { PaymentForm } from "../payment/PaymentForm.js";

/**
 * Abstraction: працівник підприємства.
 * Зберігає посилання на форму оплати (Implementor) — це і є «міст»: нарахування
 * делегується їй, тому форму можна замінити під час роботи програми.
 */
export class Employee {
  #paymentForm;
  #workReport = new WorkReport();

  /**
   * @param {string} fullName
   * @param {PaymentForm} paymentForm
   */
  constructor(fullName, paymentForm) {
    if (new.target === Employee) {
      throw new TypeError("Employee — абстрактний клас.");
    }

    this.fullName = fullName;
    this.setPaymentForm(paymentForm);
  }

  /**
   * @abstract
   * @returns {string} посада
   */
  get position() {
    throw new Error("Властивість position не реалізовано.");
  }

  /**
   * @abstract
   * @returns {string} у чому вимірюється виконана робота
   */
  get workUnit() {
    throw new Error("Властивість workUnit не реалізовано.");
  }

  /** Надбавка професії до нарахованого, %. Уточнені абстракції її перевизначають. */
  get bonusPercent() {
    return 0;
  }

  get bonusReason() {
    return "";
  }

  get paymentForm() {
    return this.#paymentForm;
  }

  /**
   * @param {PaymentForm} paymentForm
   */
  setPaymentForm(paymentForm) {
    if (!(paymentForm instanceof PaymentForm)) {
      throw new TypeError("Форма оплати має бути екземпляром PaymentForm.");
    }

    this.#paymentForm = paymentForm;
  }

  get workReport() {
    return this.#workReport;
  }

  /**
   * @param {WorkReport} workReport
   */
  submitWork(workReport) {
    this.#workReport = workReport;
  }

  /**
   * Операція абстракції: базове нарахування виконує форма оплати,
   * надбавку додає професія.
   */
  calculateSalary() {
    return new Payslip({
      employeeName: this.fullName,
      position: this.position,
      paymentTitle: this.#paymentForm.title,
      earningsDetails: this.#paymentForm.describeEarnings(this.#workReport),
      earnings: this.#paymentForm.calculateEarnings(this.#workReport),
      bonusPercent: this.bonusPercent,
      bonusReason: this.bonusReason,
    });
  }
}
