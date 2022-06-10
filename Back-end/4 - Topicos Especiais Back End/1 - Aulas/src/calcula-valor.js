function roundedNumber(num) {
  const roundedNum = Number(num.toFixed(2));
  return roundedNum;
}

// function calcValue(cap, tx, per) {
//   let amount = Number((cap * Math.pow(1 + tx, per - 1)).toFixed(2));
//   return amount;
// }

function calcValue(cap, tx, per) {
  const amount = cap * Math.pow(1 + tx, per - 1);
  return roundedNumber(amount);
}

function calcPayments(val, num) {
  const result = [];

  const paymentValue = roundedNumber(val / num);
  const leftovers = val - paymentValue * num;
  const firstPayment = paymentValue + leftovers;
  result.push(firstPayment);

  for (let i = 1; i < num; i++) {
    result.push(paymentValue);
  }

  return result;
}

console.log(calcPayments(101.994, 3));

export { calcValue, roundedNumber, calcPayments };
