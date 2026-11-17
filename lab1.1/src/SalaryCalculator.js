import { Position } from "./Position.js";

/**
 * Delegate: інкапсулює логіку нарахування зарплати.
 * Employee не наслідує цей клас, а делегує йому розрахунок.
 */
export class SalaryCalculator {
  static #BASE_SALARY = {
    [Position.DEPARTMENT_HEAD]: 45000,
    [Position.CHIEF_ENGINEER]: 38000,
    [Position.SOFTWARE_ENGINEER]: 32000,
    [Position.SYSTEM_ADMINISTRATOR]: 28000,
  };

  static #BONUS_PER_YEAR = 800;

  /**
   * @param {string} position
   * @param {number} yearsOfExperience
   * @returns {number}
   */
  calculate(position, yearsOfExperience) {
    const base = SalaryCalculator.#BASE_SALARY[position];

    if (base === undefined) {
      throw new Error(`Невідома посада: ${position}`);
    }

    if (yearsOfExperience < 0) {
      throw new Error("Стаж не може бути від'ємним.");
    }

    return base + yearsOfExperience * SalaryCalculator.#BONUS_PER_YEAR;
  }
}
