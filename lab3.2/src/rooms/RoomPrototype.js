import { roundMoney } from "../money.js";

/**
 * Prototype: абстрактна кімната-зразок.
 * Зразки (DoubleRoom, TripleRoom) ніхто не заселяє: нові кімнати створюються
 * клонуванням зразка, а клон отримує власний номер і власних мешканців.
 */
export class RoomPrototype {
  /** @type {import("../Resident.js").Resident[]} */
  #residents = [];

  /** Номер кімнати; задається вже після клонування. */
  number = null;

  constructor() {
    if (new.target === RoomPrototype) {
      throw new TypeError("RoomPrototype — абстрактний клас.");
    }
  }

  /** @abstract @returns {string} назва типу кімнати */
  get typeTitle() {
    throw new Error("Властивість typeTitle не реалізовано.");
  }

  /** @abstract @returns {number} кількість місць */
  get capacity() {
    throw new Error("Властивість capacity не реалізовано.");
  }

  /** @abstract @returns {number} квартплата за кімнату на місяць, грн */
  get monthlyRent() {
    throw new Error("Властивість monthlyRent не реалізовано.");
  }

  /**
   * Операція клонування. Кожен конкретний зразок повертає кімнату свого типу.
   * @abstract
   * @returns {RoomPrototype}
   */
  clone() {
    throw new Error("Метод clone не реалізовано.");
  }

  get residents() {
    return [...this.#residents];
  }

  get residentCount() {
    return this.#residents.length;
  }

  isFull() {
    return this.#residents.length >= this.capacity;
  }

  /** @param {import("../Resident.js").Resident} resident */
  addResident(resident) {
    if (this.isFull()) {
      throw new RangeError(`Кімната №${this.number} заповнена: місць ${this.capacity}.`);
    }

    this.#residents.push(resident);
  }

  /** Квартплата ділиться між фактичними мешканцями, грн. */
  getRentPerResident() {
    if (this.#residents.length === 0) {
      return 0;
    }

    return roundMoney(this.monthlyRent / this.#residents.length);
  }

  /**
   * Спільна частина клонування: мешканців копіюємо, а не передаємо посилання на
   * ті самі об'єкти. Інакше зміна мешканця в клоні змінила б і зразок.
   * @param {RoomPrototype} copy порожня кімната того самого типу
   */
  copyResidentsTo(copy) {
    for (const resident of this.#residents) {
      copy.addResident(resident.clone());
    }

    return copy;
  }
}
