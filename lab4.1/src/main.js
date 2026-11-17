import { Accounting } from "./Accounting.js";
import { WorkReport } from "./WorkReport.js";
import { Programmer } from "./employees/Programmer.js";
import { Translator } from "./employees/Translator.js";
import { Turner } from "./employees/Turner.js";
import { HourlyPayment } from "./payment/HourlyPayment.js";
import { PieceworkPayment } from "./payment/PieceworkPayment.js";
import { AccountingMenu } from "./ui/AccountingMenu.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";

/**
 * Початковий штат: кожна професія трапляється з обома формами оплати.
 * @param {Accounting} accounting
 */
function hireInitialStaff(accounting) {
  const staff = [
    [
      new Programmer("Шевчук Олег Миколайович", "Senior", new HourlyPayment(450)),
      new WorkReport(160, 14),
    ],
    [
      new Programmer("Гнатюк Марія Василівна", "Junior", new PieceworkPayment(1500)),
      new WorkReport(152, 9),
    ],
    [
      new Turner("Коваль Петро Іванович", 5, new PieceworkPayment(85)),
      new WorkReport(168, 310),
    ],
    [
      new Turner("Бойко Степан Романович", 2, new HourlyPayment(140)),
      new WorkReport(160, 240),
    ],
    [
      new Translator(
        "Лисенко Ірина Олегівна",
        ["англійська", "німецька"],
        new PieceworkPayment(220),
      ),
      new WorkReport(120, 96),
    ],
  ];

  for (const [employee, workReport] of staff) {
    employee.submitWork(workReport);
    accounting.hire(employee);
  }
}

async function main() {
  const accounting = new Accounting("ТОВ «ТехноМаш»");
  hireInitialStaff(accounting);

  const io = new ConsoleIO();

  try {
    await new AccountingMenu(accounting, io).run();
    io.print("Роботу завершено.");
  } catch (error) {
    if (!(error instanceof InputClosedError)) {
      throw error;
    }

    io.print("\nВвід завершено — вихід.");
  } finally {
    io.close();
  }
}

await main();
