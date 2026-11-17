import { JewelryKind } from "./JewelryKind.js";
import { JewelryModel } from "./JewelryModel.js";

/**
 * Моделі ювелірного заводу. Однакова вага може мати різну складність,
 * а отже й різну вартість роботи (наприклад, «Ніжність» і «Ніжність-2»).
 */
export const catalog = Object.freeze([
  new JewelryModel({ name: "Ніжність", kind: JewelryKind.EARRINGS, weightGrams: 3.0, complexity: 2 }),
  new JewelryModel({ name: "Ніжність-2", kind: JewelryKind.EARRINGS, weightGrams: 3.0, complexity: 4 }),
  new JewelryModel({ name: "Сонце", kind: JewelryKind.RING, weightGrams: 4.2, complexity: 3 }),
  new JewelryModel({ name: "Вінок", kind: JewelryKind.RING, weightGrams: 4.2, complexity: 5 }),
  new JewelryModel({ name: "Венеція", kind: JewelryKind.CHAIN, weightGrams: 8.0, complexity: 2 }),
  new JewelryModel({ name: "Річка", kind: JewelryKind.CHAIN, weightGrams: 8.0, complexity: 3 }),
  new JewelryModel({ name: "Серце", kind: JewelryKind.PENDANT, weightGrams: 2.1, complexity: 1 }),
  new JewelryModel({ name: "Зірка", kind: JewelryKind.PENDANT, weightGrams: 2.1, complexity: 4 }),
  new JewelryModel({ name: "Хвиля", kind: JewelryKind.BRACELET, weightGrams: 12.0, complexity: 4 }),
]);
