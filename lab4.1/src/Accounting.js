/**
 * Client: бухгалтерія підприємства. Працює з працівниками лише через
 * абстракцію Employee і не знає, за якою формою нараховано зарплату.
 */
export class Accounting {
  #employees = [];

  /**
   * @param {string} companyName
   */
  constructor(companyName) {
    this.companyName = companyName;
  }

  /**
   * @param {import("./employees/Employee.js").Employee} employee
   */
  hire(employee) {
    this.#employees.push(employee);
  }

  get employees() {
    return [...this.#employees];
  }

  /**
   * @param {import("./employees/Employee.js").Employee} employee
   * @returns {import("./Payslip.js").Payslip}
   */
  issueSalary(employee) {
    return employee.calculateSalary();
  }

  /** Платіжна відомість: розрахункові листи всіх працівників. */
  issuePayroll() {
    return this.#employees.map((employee) => this.issueSalary(employee));
  }
}
