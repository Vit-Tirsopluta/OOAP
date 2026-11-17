import { BoxBuilder } from "./BoxBuilder.js";
import { CandyType } from "../CandyType.js";

/** Конкретний будівельник: екстра-набір «Пан Коцький». Переважають шоколадні цукерки. */
export class PanKotskyBuilder extends BoxBuilder {
  get name() {
    return "Пан Коцький";
  }

  addLollipops() {
    this.putPieces(CandyType.LOLLIPOP, 5); // 50 г
  }

  addChocolates() {
    this.putPieces(CandyType.CHOCOLATE, 12); // 240 г
  }

  addWaffles() {
    this.putPieces(CandyType.WAFFLE, 5); // 125 г
  }

  addDragee() {
    this.putPieces(CandyType.DRAGEE, 17); // 85 г
  }
}
