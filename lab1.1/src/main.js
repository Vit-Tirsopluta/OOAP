import { Position } from "./Position.js";
import { SalaryCalculator } from "./SalaryCalculator.js";
import { Employee } from "./Employee.js";
import { ComputerDepartment } from "./ComputerDepartment.js";


function main() {
  const salaryCalculator = new SalaryCalculator();
  const department = new ComputerDepartment("ТОВ «ТехноСервіс»");

  department.addEmployee(
    new Employee({
      fullName: "Коваленко Андрій Петрович",
      position: Position.DEPARTMENT_HEAD,
      age: 45,
      yearsOfExperience: 18,
      phone: "+380501112233",
      email: "kovalenko@technoservice.ua",
      salaryCalculator,
    }),
  );

  department.addEmployee(
    new Employee({
      fullName: "Шевченко Олена Ігорівна",
      position: Position.CHIEF_ENGINEER,
      age: 38,
      yearsOfExperience: 12,
      phone: "+380671234567",
      email: "shevchenko@technoservice.ua",
      salaryCalculator,
    }),
  );

  department.addEmployee(
    new Employee({
      fullName: "Бондар Максим Сергійович",
      position: Position.SOFTWARE_ENGINEER,
      age: 29,
      yearsOfExperience: 5,
      phone: "+380931112244",
      email: "bondar@technoservice.ua",
      salaryCalculator,
    }),
  );

  department.addEmployee(
    new Employee({
      fullName: "Мельник Ірина Олександрівна",
      position: Position.SYSTEM_ADMINISTRATOR,
      age: 31,
      yearsOfExperience: 7,
      phone: "+380441112255",
      email: "melnyk@technoservice.ua",
      salaryCalculator,
    }),
  );

  department.printReport();

  console.log("\n=== Висновки щодо шаблону Delegation ===");
  console.log(
    "Employee делегує розрахунок зарплати SalaryCalculator замість наслідування.",
  );
  console.log(
    "Логіку нарахування можна змінювати окремо, не чіпаючи персональні дані працівника.",
  );
  console.log(
    "Усі посади користуються одним делегатом — це спрощує підтримку формули зарплати.",
  );
}

main();
