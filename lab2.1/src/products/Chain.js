import { Jewelry } from "./Jewelry.js";
import { JewelryKind } from "../JewelryKind.js";

/** ConcreteProduct: ланцюжок з металу, переданого фабрикою. */
export class Chain extends Jewelry {
  get kind() {
    return JewelryKind.CHAIN;
  }
}
