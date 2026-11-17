import { Skype } from "./Skype.js";
import { VideoCamera } from "./VideoCamera.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";
import { SkypeMenu } from "./ui/SkypeMenu.js";

async function main() {
  const io = new ConsoleIO();

  try {
    const menu = new SkypeMenu({
      skype: new Skype("Vitalij"),
      camera: new VideoCamera("WebCam Pro 640"),
      io,
    });

    await menu.run();
    io.print("Роботу завершено.");
  } catch (error) {
    if (!(error instanceof InputClosedError)) {
      throw error;
    }

    io.print("\nВвід завершено — вихід.");
  } finally {
    io.close();
  }
}

await main();
