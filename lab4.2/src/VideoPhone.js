import { Phone } from "./Phone.js";

/** Телефон з можливістю відеодзвінка. */
export class VideoPhone extends Phone {
  constructor() {
    super();

    if (new.target === VideoPhone) {
      throw new TypeError("VideoPhone — абстрактний клас.");
    }
  }

  /**
   * @abstract
   * @param {string} contact
   * @param {import("./Camera.js").Camera} camera
   * @returns {string}
   */
  makeVideoCall(contact, camera) {
    throw new Error("Метод makeVideoCall не реалізовано.");
  }
}
