/**
 * Adaptee: готова відеокамера зі своїм API. Метод shoot повертає сирі дані
 * у форматі виробника, тому напряму відеодзвінком скористатися не можна.
 */
export class VideoCamera {
  #model;
  #shots = 0;

  /** @param {string} model */
  constructor(model) {
    this.#model = model;
  }

  get model() {
    return this.#model;
  }

  /**
   * Знімає кадр у сирому форматі сенсора.
   * @returns {{ sensorFormat: string, resolution: string, rawBytes: string }}
   */
  shoot() {
    this.#shots += 1;

    return {
      sensorFormat: "BAYER-RGGB8",
      resolution: "640x480",
      rawBytes: `${this.#model}-shot-${this.#shots}`,
    };
  }
}
