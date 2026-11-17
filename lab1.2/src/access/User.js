/** Операції над колекцією, доступ до яких контролює заступник. */
export const Operation = Object.freeze({
  READ: "перегляд",
  ADD: "додавання",
  REMOVE: "видалення",
});

/** Роль користувача: набір дозволених операцій. */
export class Role {
  static READER = new Role("читач", [Operation.READ]);
  static LIBRARIAN = new Role("бібліотекар", [Operation.READ, Operation.ADD, Operation.REMOVE]);

  /**
   * @param {string} title
   * @param {string[]} permissions
   */
  constructor(title, permissions) {
    this.title = title;
    this.permissions = Object.freeze([...permissions]);
    Object.freeze(this);
  }
}

export class User {
  /**
   * @param {string} name
   * @param {Role} role
   */
  constructor(name, role) {
    this.name = name;
    this.role = role;
    Object.freeze(this);
  }

  /**
   * @param {string} operation одне зі значень Operation
   */
  can(operation) {
    return this.role.permissions.includes(operation);
  }

  toString() {
    return `${this.name} (${this.role.title})`;
  }
}
