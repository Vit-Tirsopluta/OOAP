/**
 * Target: інтерфейс камери, який очікує відеодзвінок.
 * Програма працює з камерою лише через captureFrame().
 */
export class Camera {
  constructor() {
    if (new.target === Camera) {
      throw new TypeError("Camera — інтерфейс, його не можна створити напряму.");
    }
  }

  /**
   * @abstract
   * @returns {import("./Frame.js").Frame} один кадр відео
   */
  captureFrame() {
    throw new Error("Метод captureFrame не реалізовано.");
  }
}
