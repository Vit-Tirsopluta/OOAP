import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { formatMoney } from "./money.js";

/**
 * Текстовий звіт про одну кімнату.
 * @param {import("./rooms/RoomPrototype.js").RoomPrototype} room
 * @returns {string}
 */
export function buildRoomReport(room) {
  const lines = [
    `Звіт про кімнату № ${room.number}`,
    `Тип кімнати: ${room.typeTitle}`,
    `Кількість мешканців: ${room.residentCount} з ${room.capacity}`,
    `Квартплата на місяць (уся кімната): ${formatMoney(room.monthlyRent)}`,
    `Квартплата для кожного мешканця: ${room.residentCount ? formatMoney(room.getRentPerResident()) : "—"}`,
    "",
    "Мешканці:",
  ];

  if (room.residentCount === 0) {
    lines.push("  немає");
  }

  room.residents.forEach((resident, index) => {
    lines.push(
      `${index + 1}. ${resident.fullName}`,
      `   Дата народження: ${resident.birthDate}`,
      `   Факультет: ${resident.faculty}`,
      `   Група: ${resident.group}`,
      `   Форма навчання: ${resident.studyForm}`,
    );
  });

  return `${lines.join("\n")}\n`;
}

/**
 * Записує звіт кожної кімнати у власний текстовий файл.
 * @param {import("./rooms/RoomPrototype.js").RoomPrototype[]} rooms
 * @param {string} directory
 * @returns {Promise<string[]>} шляхи створених файлів
 */
export async function writeRoomReports(rooms, directory) {
  await mkdir(directory, { recursive: true });
  const paths = [];

  for (const room of rooms) {
    const path = join(directory, `room-${String(room.number).padStart(3, "0")}.txt`);
    await writeFile(path, buildRoomReport(room), "utf8");
    paths.push(path);
  }

  return paths;
}
