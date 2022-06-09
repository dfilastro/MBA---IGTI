function calcValue(cap, tx, per) {
  let amount = cap * Math.pow(1 + tx, per - 1);
  return amount;
}

export { calcValue };
