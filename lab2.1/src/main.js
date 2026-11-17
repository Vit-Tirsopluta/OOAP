import { catalog } from "./catalog.js";
import { GoldJewelryFactory } from "./factories/GoldJewelryFactory.js";
import { SilverJewelryFactory } from "./factories/SilverJewelryFactory.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";
import { CatalogMenu } from "./ui/CatalogMenu.js";

async function main() {
  const io = new ConsoleIO();

  try {
    const menu = new CatalogMenu({
      factories: [new GoldJewelryFactory(), new SilverJewelryFactory()],
      catalog: catalog,
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
