class ItemInBOX {
  constructor(id, quantity, price) {
    this.Id = id;
    this.Quantity = quantity;
    this.Price = price;
  }
}

class CalculatorImpl {
  getItemPrice(id) {
    throw new Error("Не реалізовано");
  }

  getShippingPrice(items) {
    throw new Error("Не реалізовано");
  }
}

class RetailCalculatorImpl extends CalculatorImpl {
  name = "Роздріб, кур'єр";
  prices = { 101: 450, 102: 1850, 103: 5299, 104: 289 };

  getItemPrice(id) {
    return this.prices[id];
  }

  getShippingPrice(items) {
    const goods = items.reduce((sum, item) => sum + item.Quantity * item.Price, 0);
    return goods >= 3000 ? 0 : 90;
  }
}

class WholesaleCalculatorImpl extends CalculatorImpl {
  name = "Опт, вантажне авто";
  prices = { 101: 355, 102: 1490, 103: 4390, 104: 215 };

  getItemPrice(id) {
    return this.prices[id];
  }

  getShippingPrice(items) {
    const units = items.reduce((sum, item) => sum + item.Quantity, 0);
    return Math.ceil(units / 30) * 400;
  }
}

class OrderCalculator {
  name = "Звичайний покупець";
  items = [];

  constructor(impl) {
    this.impl = impl; // міст до реалізації
  }

  addItem(id, quantity) {
    this.items.push(new ItemInBOX(id, quantity, this.impl.getItemPrice(id)));
  }

  getGoodsPrice() {
    return this.items.reduce((sum, item) => sum + item.Quantity * item.Price, 0);
  }

  getDiscount() {
    return 0;
  }

  getShippingPrice() {
    return this.impl.getShippingPrice(this.items);
  }

  getTotal() {
    return this.getGoodsPrice() - this.getDiscount() + this.getShippingPrice();
  }
}

class LoyaltyOrderCalculator extends OrderCalculator {
  constructor(impl, percent) {
    super(impl);
    this.percent = percent;
    this.name = `Постійний клієнт (-${percent}%)`;
  }

  getDiscount() {
    return (this.getGoodsPrice() * this.percent) / 100;
  }
}

const order = [
  [101, 5],
  [103, 1],
];
const money = (amount) => amount.toFixed(2);

for (const impl of [new RetailCalculatorImpl(), new WholesaleCalculatorImpl()]) {
  console.log(impl.name);

  for (const calc of [new OrderCalculator(impl), new LoyaltyOrderCalculator(impl, 5)]) {
    for (const [id, quantity] of order) {
      calc.addItem(id, quantity);
    }

    console.log(
      `  ${calc.name}: товари ${money(calc.getGoodsPrice())}` +
        ` - знижка ${money(calc.getDiscount())}` +
        ` + доставка ${money(calc.getShippingPrice())}` +
        ` = ${money(calc.getTotal())} грн`,
    );
  }
}
