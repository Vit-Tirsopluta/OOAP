import { createInterface } from "node:readline";

/** Ввід закінчився: Ctrl+D, Ctrl+C або кінець перенаправленого файлу. */
export class InputClosedError extends Error {
  constructor() {
    super("Ввід завершено.");
    this.name = "InputClosedError";
  }
}

/** Консольний діалог: друк рядків і таблиць, читання відповідей користувача. */
export class ConsoleIO {
  #rl;
  #lines;
  #output;
  #interactive;

  constructor(input = process.stdin, output = process.stdout) {
    this.#rl = createInterface({ input, output });
    this.#rl.on("SIGINT", () => this.#rl.close());
    this.#lines = this.#rl[Symbol.asyncIterator]();
    this.#output = output;
    this.#interactive = Boolean(input.isTTY);
  }

  print(text = "") {
    this.#output.write(`${text}\n`);
  }

  /**
   * @param {string[]} headers
   * @param {(string | number)[][]} rows
   */
  printTable(headers, rows) {
    const table = [headers, ...rows].map((row) => row.map(String));
    const widths = headers.map((_, column) =>
      Math.max(...table.map((row) => row[column].length)),
    );
    const format = (row) =>
      row
        .map((cell, column) => cell.padEnd(widths[column]))
        .join("  ")
        .trimEnd();

    this.print(format(table[0]));
    this.print(widths.map((width) => "-".repeat(width)).join("  "));

    for (const row of table.slice(1)) {
      this.print(format(row));
    }
  }

  /**
   * @param {string} question
   * @returns {Promise<string>}
   * @throws {InputClosedError}
   */
  async ask(question) {
    if (this.#interactive) {
      this.#rl.setPrompt(question);
      this.#rl.prompt();
    } else {
      this.#output.write(question);
    }

    const { value, done } = await this.#lines.next();

    if (done) {
      throw new InputClosedError();
    }

    // Перенаправлений ввід термінал не показує — дублюємо відповідь у вивід.
    if (!this.#interactive) {
      this.print(value);
    }

    return value.trim();
  }

  /** Непорожній рядок. */
  async askText(question) {
    while (true) {
      const answer = await this.ask(question);

      if (answer !== "") {
        return answer;
      }

      this.print("Значення не може бути порожнім.");
    }
  }

  /** Ціле число з проміжку [min, max]; перепитує, доки відповідь некоректна. */
  async askInteger(question, min, max) {
    while (true) {
      const answer = await this.ask(question);
      const value = Number(answer);

      if (answer !== "" && Number.isInteger(value) && value >= min && value <= max) {
        return value;
      }

      this.print(`Введіть ціле число від ${min} до ${max}.`);
    }
  }

  /** Питання «так/ні». */
  async confirm(question) {
    while (true) {
      const answer = (await this.ask(`${question} (т/н): `)).toLowerCase();

      if (["т", "так", "y", "yes"].includes(answer)) {
        return true;
      }

      if (["н", "ні", "n", "no"].includes(answer)) {
        return false;
      }

      this.print("Введіть «т» (так) або «н» (ні).");
    }
  }

  close() {
    this.#rl.close();
  }
}
