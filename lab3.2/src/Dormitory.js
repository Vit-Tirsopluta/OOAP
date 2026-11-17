/**
 * Client: облік кімнат гуртожитку. Знає зразки лише через RoomPrototype
 * і створює кімнати клонуванням, а не конструктором конкретного типу.
 */
export class Dormitory {
  /** @type {Record<string, import("./rooms/RoomPrototype.js").RoomPrototype>} */
  #prototypes;
  /** @type {Map<number, import("./rooms/RoomPrototype.js").RoomPrototype>} */
  #rooms = new Map();

  /**
   * @param {Record<string, import("./rooms/RoomPrototype.js").RoomPrototype>} prototypes зразки за ключем типу
   */
  constructor(prototypes) {
    this.#prototypes = { ...prototypes };
  }

  /** @returns {{ key: string, title: string, capacity: number }[]} доступні типи кімнат */
  get typeOptions() {
    return Object.entries(this.#prototypes).map(([key, prototype]) => ({
      key,
      title: prototype.typeTitle,
      capacity: prototype.capacity,
    }));
  }

  /**
   * @param {string} typeKey ключ зразка
   * @param {number} number номер нової кімнати
   */
  createRoom(typeKey, number) {
    const prototype = this.#prototypes[typeKey];

    if (!prototype) {
      throw new RangeError(`Невідомий тип кімнати: ${typeKey}`);
    }

    if (this.#rooms.has(number)) {
      throw new RangeError(`Кімната №${number} уже є.`);
    }

    const room = prototype.clone();
    room.number = number;
    this.#rooms.set(number, room);

    return room;
  }

  /** @param {number} number */
  getRoom(number) {
    const room = this.#rooms.get(number);

    if (!room) {
      throw new RangeError(`Кімнати №${number} немає.`);
    }

    return room;
  }

  /**
   * @param {number} number
   * @param {import("./Resident.js").Resident} resident
   */
  checkIn(number, resident) {
    this.getRoom(number).addResident(resident);
  }

  /** @returns {import("./rooms/RoomPrototype.js").RoomPrototype[]} кімнати за номером */
  get rooms() {
    return [...this.#rooms.values()].sort((a, b) => a.number - b.number);
  }
}
