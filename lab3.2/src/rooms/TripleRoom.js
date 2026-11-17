import { RoomPrototype } from "./RoomPrototype.js";

/** ConcretePrototype: трьохмісна кімната. */
export class TripleRoom extends RoomPrototype {
  get typeTitle() {
    return "трьохмісна";
  }

  get capacity() {
    return 3;
  }

  get monthlyRent() {
    return 1500;
  }

  clone() {
    return this.copyResidentsTo(new TripleRoom());
  }
}
