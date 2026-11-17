import { CashRegister } from "./CashRegister.js";
import { ProductGroup } from "./ProductGroup.js";
import { ConsoleIO, InputClosedError } from "./ui/ConsoleIO.js";
import { ShopMenu } from "./ui/ShopMenu.js";

async function main() {
  // Лічильник тут не створюється: він уже існує з моменту завантаження SalesCounter.js.
  const startedAt = new Date();
  const registers = [
    new CashRegister("Продуктовий відділ", ProductGroup.FOOD),
    new CashRegister("Аптека", ProductGroup.MEDICINE),
    new CashRegister("Відділ одягу", ProductGroup.CLOTHING),
  ];
  const io = new ConsoleIO();

  try {
    await new ShopMenu(registers, io, startedAt).run();
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
