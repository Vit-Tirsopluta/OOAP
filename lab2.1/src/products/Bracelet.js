import { Jewelry } from "./Jewelry.js";
import { JewelryKind } from "../JewelryKind.js";

/** ConcreteProduct: браслет з металу, переданого фабрикою. */
export class Bracelet extends Jewelry {
  get kind() {
    return JewelryKind.BRACELET;
  }
}
