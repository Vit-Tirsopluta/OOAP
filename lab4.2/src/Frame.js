/** Кадр відео у форматі, який розуміє програма відеодзвінків. */
export class Frame {
  /**
   * @param {number} width ширина, px
   * @param {number} height висота, px
   * @param {string} pixels опис даних кадру
   */
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
    Object.freeze(this);
  }
}
