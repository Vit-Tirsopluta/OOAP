import { BoxBuilder } from "./BoxBuilder.js";
import { CandyType } from "../CandyType.js";

/** Конкретний будівельник: економічний набір «Ласунка». Переважають льодяники. */
export class LasunkaBuilder extends BoxBuilder {
  get name() {
    return "Ласунка";
  }

  addLollipops() {
    this.putPieces(CandyType.LOLLIPOP, 30); // 300 г
  }

  addChocolates() {
    this.putPieces(CandyType.CHOCOLATE, 5); // 100 г
  }

  addWaffles() {
    this.putPieces(CandyType.WAFFLE, 2); // 50 г
  }

  addDragee() {
    this.putPieces(CandyType.DRAGEE, 10); // 50 г
  }
}
