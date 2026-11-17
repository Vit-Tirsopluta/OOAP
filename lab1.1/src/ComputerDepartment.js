/**
 * Відділ: тримає список працівників і надає зведену інформацію.
 */
export class ComputerDepartment {
  /**
   * @param {string} companyName
   * @param {import("./Employee.js").Employee[]} [employees]
   */
  constructor(companyName, employees = []) {
    this.companyName = companyName;
    this.employees = [...employees];
  }

  /**
   * @param {import("./Employee.js").Employee} employee
   */
  addEmployee(employee) {
    this.employees.push(employee);
  }

  getTotalPayroll() {
    return this.employees.reduce(
      (sum, employee) => sum + employee.getSalary(),
      0,
    );
  }

  printReport() {
    console.log(`=== Комп'ютерний відділ: ${this.companyName} ===\n`);

    for (const employee of this.employees) {
      console.log(employee.toString());
      console.log("-".repeat(40));
    }

    console.log(`Разом до виплати: ${this.getTotalPayroll()} грн`);
  }
}
