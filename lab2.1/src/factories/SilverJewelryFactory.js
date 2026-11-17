import { JewelryFactory } from "./JewelryFactory.js";
import { Metal } from "../Metal.js";
import { Earrings } from "../products/Earrings.js";
import { Ring } from "../products/Ring.js";
import { Chain } from "../products/Chain.js";
import { Pendant } from "../products/Pendant.js";
import { Bracelet } from "../products/Bracelet.js";

/** ConcreteFactory: виробнича лінія, категорія «Срібло». */
export class SilverJewelryFactory extends JewelryFactory {
  get title() {
    return "Срібло";
  }

  get metal() {
    return Metal.SILVER;
  }

  createEarrings(model) {
    return new Earrings(model, this.metal);
  }

  createRing(model) {
    return new Ring(model, this.metal);
  }

  createChain(model) {
    return new Chain(model, this.metal);
  }

  createPendant(model) {
    return new Pendant(model, this.metal);
  }

  createBracelet(model) {
    return new Bracelet(model, this.metal);
  }
}
