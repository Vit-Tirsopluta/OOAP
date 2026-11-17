import { Camera } from "./Camera.js";
import { Frame } from "./Frame.js";

/**
 * Adapter (об'єктний): має інтерфейс Camera, якого очікує Skype, і
 * переводить виклики в API VideoCamera та його сирі дані в Frame.
 * Сама VideoCamera не змінюється.
 */
export class CameraAdapter extends Camera {
  #videoCamera;

  /** @param {import("./VideoCamera.js").VideoCamera} videoCamera */
  constructor(videoCamera) {
    super();

    if (typeof videoCamera?.shoot !== "function") {
      throw new TypeError("CameraAdapter потребує камеру з методом shoot().");
    }

    this.#videoCamera = videoCamera;
  }

  captureFrame() {
    const raw = this.#videoCamera.shoot();
    const [width, height] = raw.resolution.split("x").map(Number);

    return new Frame(width, height, `конвертовано з ${raw.sensorFormat}: ${raw.rawBytes}`);
  }
}
