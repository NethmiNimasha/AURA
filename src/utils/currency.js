const USD_TO_LKR = 300;

export function toLKR(usdAmount) {
  return Math.round(usdAmount * USD_TO_LKR);
}

export function formatPrice(usdAmount) {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0,
  }).format(toLKR(usdAmount));
}

export function formatPriceAdjustment(usdAmount) {
  const lkr = toLKR(Math.abs(usdAmount));
  const formatted = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0,
  }).format(lkr);
  return usdAmount > 0 ? `+${formatted}` : `-${formatted}`;
}
