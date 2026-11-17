/** Користувач не має права на операцію над колекцією. */
export class AccessDeniedError extends Error {
  /**
   * @param {import("./User.js").User} user
   * @param {string} operation
   */
  constructor(user, operation) {
    super(`Доступ заборонено: ${user} не має права на ${operation}.`);
    this.name = "AccessDeniedError";
  }
}

/** Журнал звернень до колекції, який веде заступник. */
export class AccessLog {
  /** @type {{ time: Date, user: string, operation: string, details: string, allowed: boolean }[]} */
  #entries = [];

  /**
   * @param {import("./User.js").User} user
   * @param {string} operation
   * @param {string} details
   * @param {boolean} allowed
   */
  record(user, operation, details, allowed) {
    this.#entries.push(
      Object.freeze({ time: new Date(), user: String(user), operation, details, allowed }),
    );
  }

  get entries() {
    return [...this.#entries];
  }
}
