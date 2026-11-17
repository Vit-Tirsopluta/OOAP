const pad = (value, length = 2) => String(value).padStart(length, "0");

/**
 * @param {number} kopecks сума в копійках
 */
export function formatMoney(kopecks) {
  return `${(kopecks / 100).toFixed(2)} грн`;
}

/**
 * @param {Date} date
 * @returns {string} час із мілісекундами: ГГ:ХХ:СС.ммм
 */
export function formatTime(date) {
  return (
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `.${pad(date.getMilliseconds(), 3)}`
  );
}

/**
 * @param {Date} date
 * @returns {string} РРРР-ММ-ДД ГГ:ХХ:СС
 */
export function formatDateTime(date) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}
