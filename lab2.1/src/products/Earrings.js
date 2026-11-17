import { Jewelry } from "./Jewelry.js";
import { JewelryKind } from "../JewelryKind.js";

/** ConcreteProduct: сережки з металу, переданого фабрикою. */
export class Earrings extends Jewelry {
  get kind() {
    return JewelryKind.EARRINGS;
  }
}
