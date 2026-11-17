import { Jewelry } from "./Jewelry.js";
import { JewelryKind } from "../JewelryKind.js";

/** ConcreteProduct: каблучка з металу, переданого фабрикою. */
export class Ring extends Jewelry {
  get kind() {
    return JewelryKind.RING;
  }
}
