
export class Employee {
  /**
   * @param {{
   *   fullName: string,
   *   position: string,
   *   age: number,
   *   yearsOfExperience: number,
   *   phone: string,
   *   email: string,
   *   salaryCalculator: import("./SalaryCalculator.js").SalaryCalculator,
   * }} params
   */
  constructor({
    fullName,
    position,
    age,
    yearsOfExperience,
    phone,
    email,
    salaryCalculator,
  }) {
    if (!salaryCalculator) {
      throw new Error("salaryCalculator is required for Employee.");
    }

    this.fullName = fullName;
    this.position = position;
    this.age = age;
    this.yearsOfExperience = yearsOfExperience;
    this.phone = phone;
    this.email = email;
    /** @private */
    this._salaryCalculator = salaryCalculator;
  }

  /** Делегування: розрахунок виконує SalaryCalculator, а не Employee. */
  getSalary() {
    return this._salaryCalculator.calculate(
      this.position,
      this.yearsOfExperience,
    );
  }

  getPersonalInfo() {
    return {
      fullName: this.fullName,
      position: this.position,
      age: this.age,
      yearsOfExperience: this.yearsOfExperience,
      phone: this.phone,
      email: this.email,
      salary: this.getSalary(),
    };
  }

  toString() {
    const info = this.getPersonalInfo();
    return [
      `ПІБ: ${info.fullName}`,
      `Посада: ${info.position}`,
      `Вік: ${info.age}`,
      `Стаж: ${info.yearsOfExperience} р.`,
      `Телефон: ${info.phone}`,
      `Email: ${info.email}`,
      `Зарплата: ${info.salary} грн`,
    ].join("\n");
  }
}
