import { CameraAdapter } from "../CameraAdapter.js";

/** Меню користувача Skype. */
export class SkypeMenu {
  #skype;
  #camera;
  #io;

  /**
   * @param {{
   *   skype: import("../Skype.js").Skype,
   *   camera: import("../VideoCamera.js").VideoCamera,
   *   io: import("./ConsoleIO.js").ConsoleIO,
   * }} params camera — відеокамера з власним API, яка напряму не підходить до Skype
   */
  constructor({ skype, camera, io }) {
    this.#skype = skype;
    this.#camera = camera;
    this.#io = io;
  }

  async run() {
    this.#io.print(`=== Skype. Камера: ${this.#camera.model} ===`);

    while (true) {
      this.#io.print();
      this.#io.print("1. Аудіодзвінок");
      this.#io.print("2. Відеодзвінок (камера через адаптер)");
      this.#io.print("3. Спробувати відеодзвінок без адаптера");
      this.#io.print("4. Журнал дзвінків");
      this.#io.print("0. Вихід");

      const choice = await this.#io.askInteger("Ваш вибір: ", 0, 4);
      this.#io.print();

      if (choice === 0) {
        return;
      }

      try {
        if (choice === 1) {
          const contact = await this.#io.askText("Кому дзвонимо: ");
          this.#io.print(this.#skype.makeCall(contact));
        } else if (choice === 2) {
          const contact = await this.#io.askText("Кому дзвонимо: ");
          // Адаптер перетворює VideoCamera на інтерфейс Camera, який очікує Skype.
          const camera = new CameraAdapter(this.#camera);
          this.#io.print(this.#skype.makeVideoCall(contact, camera));
        } else if (choice === 3) {
          const contact = await this.#io.askText("Кому дзвонимо: ");
          this.#io.print(this.#skype.makeVideoCall(contact, this.#camera));
        } else {
          this.#printLog();
        }
      } catch (error) {
        if (!(error instanceof TypeError)) {
          throw error;
        }

        this.#io.print(`Помилка: ${error.message}`);
      }
    }
  }

  #printLog() {
    const { calls } = this.#skype;

    if (calls.length === 0) {
      this.#io.print("Дзвінків ще не було.");
      return;
    }

    this.#io.printTable(
      ["№", "Тип", "Кому", "Кадрів"],
      calls.map((call, index) => [index + 1, call.kind, call.contact, call.frames.length]),
    );
  }
}
