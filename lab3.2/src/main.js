import { join } from "node:path";
import { Dormitory } from "./Dormitory.js";
import { Resident } from "./Resident.js";
import { StudyForm } from "./StudyForm.js";
import { DoubleRoom } from "./rooms/DoubleRoom.js";
import { TripleRoom } from "./rooms/TripleRoom.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";
import { DormitoryMenu } from "./ui/DormitoryMenu.js";

function createDormitory() {
  // Зразки створюються один раз; усі кімнати — клони цих зразків.
  const dormitory = new Dormitory({ double: new DoubleRoom(), triple: new TripleRoom() });

  dormitory.createRoom("double", 101);
  dormitory.checkIn(101, new Resident({
    fullName: "Коваленко Марія Олегівна",
    birthDate: "2006-03-14",
    faculty: "Інформатики",
    group: "ІП-21",
    studyForm: StudyForm.STATE,
  }));
  dormitory.checkIn(101, new Resident({
    fullName: "Бондар Олена Сергіївна",
    birthDate: "2005-11-02",
    faculty: "Інформатики",
    group: "ІП-21",
    studyForm: StudyForm.PAID,
  }));

  dormitory.createRoom("triple", 102);
  dormitory.checkIn(102, new Resident({
    fullName: "Шевчук Андрій Петрович",
    birthDate: "2004-07-25",
    faculty: "Економіки",
    group: "ЕК-31",
    studyForm: StudyForm.STATE,
  }));

  dormitory.createRoom("double", 201);

  return dormitory;
}

async function main() {
  const io = new ConsoleIO();

  try {
    const menu = new DormitoryMenu({
      dormitory: createDormitory(),
      io,
      reportsDirectory: join(import.meta.dirname, "..", "reports"),
    });

    await menu.run();
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
