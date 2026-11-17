/** Округлення суми до копійок. */
export function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

export function formatMoney(amount) {
  return `${amount.toFixed(2)} грн`;
}
