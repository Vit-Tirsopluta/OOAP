import { LasunkaBuilder } from "./builders/LasunkaBuilder.js";
import { NaminaikoBuilder } from "./builders/NaminaikoBuilder.js";
import { PanKotskyBuilder } from "./builders/PanKotskyBuilder.js";
import { PackingLine } from "./PackingLine.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";
import { PackingMenu } from "./ui/PackingMenu.js";

async function main() {
  const io = new ConsoleIO();

  try {
    // Ціна за кілограм задається при запуску програми, один раз на весь сеанс.
    const pricePerKg = await io.askNumber("Вартість 1 кг солодощів, грн: ", 0.01);
    const menu = new PackingMenu({
      builders: [new LasunkaBuilder(), new NaminaikoBuilder(), new PanKotskyBuilder()],
      packingLine: new PackingLine(pricePerKg),
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
