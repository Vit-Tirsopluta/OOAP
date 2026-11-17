/**
 * Табель працівника за розрахунковий період: відпрацьований час і виконаний
 * обсяг робіт. Яке з двох значень піде в розрахунок, вирішує форма оплати.
 */
export class WorkReport {
  /**
   * @param {number} [hoursWorked] відпрацьовано годин
   * @param {number} [unitsDone] виконано одиниць роботи
   */
  constructor(hoursWorked = 0, unitsDone = 0) {
    if (hoursWorked < 0 || unitsDone < 0) {
      throw new RangeError("Години та обсяг робіт не можуть бути від'ємними.");
    }

    this.hoursWorked = hoursWorked;
    this.unitsDone = unitsDone;
    Object.freeze(this);
  }
}
