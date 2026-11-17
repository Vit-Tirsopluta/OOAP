import { RoomPrototype } from "./RoomPrototype.js";

/** ConcretePrototype: двомісна кімната. */
export class DoubleRoom extends RoomPrototype {
  get typeTitle() {
    return "двомісна";
  }

  get capacity() {
    return 2;
  }

  get monthlyRent() {
    return 1200;
  }

  clone() {
    return this.copyResidentsTo(new DoubleRoom());
  }
}
