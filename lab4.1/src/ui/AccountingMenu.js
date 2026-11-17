import { WorkReport } from "../WorkReport.js";
import { Programmer } from "../employees/Programmer.js";
import { Translator } from "../employees/Translator.js";
import { Turner } from "../employees/Turner.js";
import { formatMoney } from "../money.js";
import { HourlyPayment } from "../payment/HourlyPayment.js";
import { PieceworkPayment } from "../payment/PieceworkPayment.js";

const PROGRAMMER_LEVELS = Object.keys(Programmer.LEVEL_BONUS);

/** Меню бухгалтера. */
export class AccountingMenu {
  #accounting;
  #io;

  /**
   * @param {import("../Accounting.js").Accounting} accounting
   * @param {import("./ConsoleIO.js").ConsoleIO} io
   */
  constructor(accounting, io) {
    this.#accounting = accounting;
    this.#io = io;
  }

  async run() {
    this.#io.print(`=== Бухгалтерія: ${this.#accounting.companyName} ===`);

    while (true) {
      this.#io.print();
      this.#io.print("1. Список працівників");
      this.#io.print("2. Внести табель працівника");
      this.#io.print("3. Змінити форму оплати праці");
      this.#io.print("4. Розрахунковий лист працівника");
      this.#io.print("5. Видати зарплату всім (платіжна відомість)");
      this.#io.print("6. Прийняти працівника");
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Ваш вибір: ", 0, 6);
      this.#io.print();

      if (choice === 0) {
        return;
      }

      if (choice === 1) {
        this.#showEmployees();
      } else if (choice === 2) {
        await this.#submitWork();
      } else if (choice === 3) {
        await this.#changePaymentForm();
      } else if (choice === 4) {
        await this.#showPayslip();
      } else if (choice === 5) {
        this.#showPayroll();
      } else {
        await this.#hire();
      }
    }
  }

  #showEmployees() {
    this.#io.printTable(
      ["№", "ПІБ", "Посада", "Форма оплати", "Тариф", "Години", "Обсяг робіт"],
      this.#accounting.employees.map((employee, index) => [
        index + 1,
        employee.fullName,
        employee.position,
        employee.paymentForm.title,
        employee.paymentForm.tariff,
        employee.workReport.hoursWorked,
        `${employee.workReport.unitsDone} од. (${employee.workUnit})`,
      ]),
    );
  }

  /**
   * @returns {Promise<import("../employees/Employee.js").Employee | null>}
   */
  async #chooseEmployee() {
    const { employees } = this.#accounting;

    employees.forEach((employee, index) => {
      this.#io.print(`  ${index + 1}. ${employee.fullName}, ${employee.position}`);
    });

    const number = await this.#io.askInteger(
      "Номер працівника (0 — назад): ",
      0,
      employees.length,
    );

    return number === 0 ? null : employees[number - 1];
  }

  async #askPaymentForm() {
    this.#io.print("Форма оплати праці:");
    this.#io.print("  1. Почасова — за кількість відпрацьованих годин");
    this.#io.print("  2. Відрядна — за обсяг виконаної роботи");

    const form = await this.#io.askInteger("Номер форми: ", 1, 2);

    if (form === 1) {
      return new HourlyPayment(await this.#io.askNumber("Ставка, грн за годину: ", 0.01));
    }

    return new PieceworkPayment(
      await this.#io.askNumber("Розцінка, грн за одиницю роботи: ", 0.01),
    );
  }

  async #submitWork() {
    const employee = await this.#chooseEmployee();

    if (employee === null) {
      return;
    }

    const hoursWorked = await this.#io.askNumber("Відпрацьовано годин: ");
    const unitsDone = await this.#io.askNumber(
      `Виконано одиниць роботи (одиниця — ${employee.workUnit}): `,
    );

    employee.submitWork(new WorkReport(hoursWorked, unitsDone));
    this.#io.print("Табель збережено.");
  }

  async #changePaymentForm() {
    const employee = await this.#chooseEmployee();

    if (employee === null) {
      return;
    }

    this.#io.print(`Зараз: ${this.#describePayment(employee)}`);
    employee.setPaymentForm(await this.#askPaymentForm());
    this.#io.print(`Тепер: ${this.#describePayment(employee)}`);
  }

  /**
   * @param {import("../employees/Employee.js").Employee} employee
   */
  #describePayment(employee) {
    const { title, tariff } = employee.paymentForm;
    const { total } = this.#accounting.issueSalary(employee);

    return `${title} оплата, ${tariff} — до видачі ${formatMoney(total)}`;
  }

  async #showPayslip() {
    const employee = await this.#chooseEmployee();

    if (employee === null) {
      return;
    }

    const payslip = this.#accounting.issueSalary(employee);
    const bonus =
      payslip.bonusPercent === 0
        ? "немає"
        : `${payslip.bonusPercent}% ${payslip.bonusReason} = ${formatMoney(payslip.bonus)}`;

    this.#io.print();
    this.#io.print("--- Розрахунковий лист ---");
    this.#io.print(`Працівник:    ${payslip.employeeName}`);
    this.#io.print(`Посада:       ${payslip.position}`);
    this.#io.print(`Форма оплати: ${payslip.paymentTitle}`);
    this.#io.print(`Нараховано:   ${payslip.earningsDetails} = ${formatMoney(payslip.earnings)}`);
    this.#io.print(`Надбавка:     ${bonus}`);
    this.#io.print(`До видачі:    ${formatMoney(payslip.total)}`);
  }

  #showPayroll() {
    const payslips = this.#accounting.issuePayroll();
    const total = payslips.reduce((sum, payslip) => sum + payslip.total, 0);

    this.#io.printTable(
      ["№", "ПІБ", "Посада", "Форма оплати", "Нараховано", "Надбавка", "До видачі"],
      payslips.map((payslip, index) => [
        index + 1,
        payslip.employeeName,
        payslip.position,
        payslip.paymentTitle,
        formatMoney(payslip.earnings),
        formatMoney(payslip.bonus),
        formatMoney(payslip.total),
      ]),
    );
    this.#io.print();
    this.#io.print(`Разом до видачі: ${formatMoney(total)}`);
  }

  async #hire() {
    this.#io.print("Професія:");
    this.#io.print("  1. Програміст");
    this.#io.print("  2. Токар");
    this.#io.print("  3. Перекладач");

    const profession = await this.#io.askInteger("Номер професії (0 — назад): ", 0, 3);

    if (profession === 0) {
      return;
    }

    const fullName = await this.#io.askText("ПІБ: ");
    let employee;

    // Будь-яка професія поєднується з будь-якою формою оплати.
    if (profession === 1) {
      const level = await this.#io.askInteger(
        `Рівень (${PROGRAMMER_LEVELS.map((name, index) => `${index + 1} — ${name}`).join(", ")}): `,
        1,
        PROGRAMMER_LEVELS.length,
      );
      employee = new Programmer(
        fullName,
        PROGRAMMER_LEVELS[level - 1],
        await this.#askPaymentForm(),
      );
    } else if (profession === 2) {
      const grade = await this.#io.askInteger(
        `Розряд (1–${Turner.MAX_GRADE}): `,
        1,
        Turner.MAX_GRADE,
      );
      employee = new Turner(fullName, grade, await this.#askPaymentForm());
    } else {
      let languages = [];

      while (languages.length === 0) {
        const answer = await this.#io.askText("Робочі мови через кому: ");
        languages = answer
          .split(",")
          .map((language) => language.trim())
          .filter((language) => language !== "");
      }

      employee = new Translator(fullName, languages, await this.#askPaymentForm());
    }

    this.#accounting.hire(employee);
    this.#io.print(`Прийнято: ${employee.fullName}, ${employee.position}.`);
  }
}
