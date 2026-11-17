import { Resident } from "../Resident.js";
import { StudyForm } from "../StudyForm.js";
import { formatMoney } from "../money.js";
import { buildRoomReport, writeRoomReports } from "../ReportWriter.js";

const MAX_ROOM_NUMBER = 999;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Date.parse переносить неіснуючі дати («2004-02-30» стає 1 березня),
 * тому перевіряємо, що після розбору дата лишилася тією самою.
 */
function isRealDate(text) {
  if (!DATE_PATTERN.test(text)) {
    return false;
  }

  const date = new Date(`${text}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === text;
}

/** Меню коменданта гуртожитку. */
export class DormitoryMenu {
  #dormitory;
  #io;
  #reportsDirectory;

  /**
   * @param {{
   *   dormitory: import("../Dormitory.js").Dormitory,
   *   io: import("./ConsoleIO.js").ConsoleIO,
   *   reportsDirectory: string,
   * }} params
   */
  constructor({ dormitory, io, reportsDirectory }) {
    this.#dormitory = dormitory;
    this.#io = io;
    this.#reportsDirectory = reportsDirectory;
  }

  async run() {
    this.#io.print("=== Гуртожиток: облік кімнат ===");

    while (true) {
      this.#io.print();
      this.#io.print("1. Список кімнат");
      this.#io.print("2. Створити кімнату за зразком");
      this.#io.print("3. Поселити мешканця");
      this.#io.print("4. Переглянути звіт про кімнату");
      this.#io.print("5. Сформувати текстові звіти");
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Ваш вибір: ", 0, 5);
      this.#io.print();

      if (choice === 0) {
        return;
      }

      try {
        if (choice === 1) {
          this.#printRooms();
        } else if (choice === 2) {
          await this.#createRoom();
        } else if (choice === 3) {
          await this.#checkIn();
        } else if (choice === 4) {
          await this.#showRoom();
        } else {
          await this.#writeReports();
        }
      } catch (error) {
        if (!(error instanceof RangeError)) {
          throw error;
        }

        this.#io.print(error.message);
      }
    }
  }

  #printRooms() {
    const { rooms } = this.#dormitory;

    if (rooms.length === 0) {
      this.#io.print("Кімнат немає.");
      return;
    }

    this.#io.printTable(
      ["№", "Тип", "Заселено", "Квартплата на особу", "Мешканці"],
      rooms.map((room) => [
        room.number,
        room.typeTitle,
        `${room.residentCount}/${room.capacity}`,
        room.residentCount ? formatMoney(room.getRentPerResident()) : "—",
        room.residents.map((resident) => resident.fullName).join("; ") || "—",
      ]),
    );
  }

  async #createRoom() {
    const options = this.#dormitory.typeOptions;

    this.#io.print("Зразки кімнат:");
    options.forEach((option, index) => {
      this.#io.print(`  ${index + 1}. ${option.title}, місць: ${option.capacity}`);
    });

    const typeNumber = await this.#io.askInteger("Тип (0 — назад): ", 0, options.length);

    if (typeNumber === 0) {
      return;
    }

    const number = await this.#io.askInteger(`Номер нової кімнати (1–${MAX_ROOM_NUMBER}): `, 1, MAX_ROOM_NUMBER);
    const room = this.#dormitory.createRoom(options[typeNumber - 1].key, number);

    this.#io.print(`Створено кімнату №${room.number} (${room.typeTitle}) клонуванням зразка.`);
  }

  async #checkIn() {
    const number = await this.#io.askInteger("Номер кімнати (0 — назад): ", 0, MAX_ROOM_NUMBER);

    if (number === 0) {
      return;
    }

    const room = this.#dormitory.getRoom(number);

    if (room.isFull()) {
      throw new RangeError(`Кімната №${number} заповнена.`);
    }

    const resident = new Resident({
      fullName: await this.#io.askText("ПІБ: "),
      birthDate: await this.#askDate("Дата народження (РРРР-ММ-ДД): "),
      faculty: await this.#io.askText("Факультет: "),
      group: await this.#io.askText("Група: "),
      studyForm: await this.#askStudyForm(),
    });

    this.#dormitory.checkIn(number, resident);
    this.#io.print(`${resident.fullName} поселено до кімнати №${number}.`);
  }

  async #askDate(question) {
    while (true) {
      const answer = await this.#io.askText(question);

      if (isRealDate(answer)) {
        return answer;
      }

      this.#io.print("Введіть дату у форматі РРРР-ММ-ДД, наприклад 2005-09-01.");
    }
  }

  async #askStudyForm() {
    this.#io.print("Форма навчання:");
    this.#io.print("  1. державне замовлення");
    this.#io.print("  2. за кошти фізичних осіб");

    const form = await this.#io.askInteger("Номер форми: ", 1, 2);
    return form === 1 ? StudyForm.STATE : StudyForm.PAID;
  }

  async #showRoom() {
    const number = await this.#io.askInteger("Номер кімнати (0 — назад): ", 0, MAX_ROOM_NUMBER);

    if (number === 0) {
      return;
    }

    this.#io.print(buildRoomReport(this.#dormitory.getRoom(number)));
  }

  async #writeReports() {
    const paths = await writeRoomReports(this.#dormitory.rooms, this.#reportsDirectory);

    this.#io.print(`Створено звітів: ${paths.length}`);
    paths.forEach((path) => this.#io.print(`  ${path}`));
  }
}
