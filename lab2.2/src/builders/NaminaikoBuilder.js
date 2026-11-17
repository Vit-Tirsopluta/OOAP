import { BoxBuilder } from "./BoxBuilder.js";
import { CandyType } from "../CandyType.js";

/** Конкретний будівельник: стандартний набір «Наминайко». */
export class NaminaikoBuilder extends BoxBuilder {
  get name() {
    return "Наминайко";
  }

  addLollipops() {
    this.putPieces(CandyType.LOLLIPOP, 15); // 150 г
  }

  addChocolates() {
    this.putPieces(CandyType.CHOCOLATE, 10); // 200 г
  }

  addWaffles() {
    this.putPieces(CandyType.WAFFLE, 4); // 100 г
  }

  addDragee() {
    this.putPieces(CandyType.DRAGEE, 10); // 50 г
  }
}
