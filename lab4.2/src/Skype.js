import { VideoPhone } from "./VideoPhone.js";

/** Адресат дзвінка та спосіб зв'язку, як їх фіксує журнал. */
const CALL_KIND = Object.freeze({ AUDIO: "аудіо", VIDEO: "відео" });
/** Скільки кадрів відправляємо в демонстраційному відеодзвінку. */
const FRAMES_PER_CALL = 2;

/** Adaptee-клієнт: Skype. Відеодзвінок працює тільки з Camera. */
export class Skype extends VideoPhone {
  #calls = [];

  makeCall(contact) {
    this.#calls.push({ kind: CALL_KIND.AUDIO, contact, frames: [] });
    return `Аудіодзвінок до ${contact}`;
  }

  makeVideoCall(contact, camera) {
    if (typeof camera?.captureFrame !== "function") {
      throw new TypeError(
        "Skype приймає лише об'єкт Camera. Відеокамеру з іншим API спершу обгорніть адаптером.",
      );
    }

    const frames = Array.from({ length: FRAMES_PER_CALL }, () => camera.captureFrame());
    this.#calls.push({ kind: CALL_KIND.VIDEO, contact, frames });

    const { width, height } = frames[0];
    return `Відеодзвінок до ${contact}: передано ${frames.length} кадри, ${width}x${height}`;
  }

  /** @returns {{ kind: string, contact: string, frames: import("./Frame.js").Frame[] }[]} */
  get calls() {
    return this.#calls.map((call) => ({ ...call, frames: [...call.frames] }));
  }
}
