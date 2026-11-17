import { Jewelry } from "./Jewelry.js";
import { JewelryKind } from "../JewelryKind.js";

/** ConcreteProduct: підвіска з металу, переданого фабрикою. */
export class Pendant extends Jewelry {
  get kind() {
    return JewelryKind.PENDANT;
  }
}
