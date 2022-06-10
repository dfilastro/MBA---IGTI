import { calcValue, roundedNumber, calcPayments } from '../src/calcula-valor.js';

describe('Calc future value', () => {
  test('If it was payed in one time period, the value doesn`t receives interest', () => {
    // Operação
    const amount = calcValue(100, 0.0175, 1);

    // Resultado/Comportamento esperado
    expect(amount).toBe(100);
  });

  test('Calc value with 4 payments', () => {
    const amount = calcValue(500, 0.025, 4);

    expect(amount).toBe(538.45);
  });
});

describe('Rounded number function', () => {
  test('Round a number with 2 decimal places', () => {
    const number = roundedNumber(538.4453124999998);
    expect(number).toBe(538.45);
  });

  // test('Another test with rounded number', () => {
  //   const number = roundedNumber(1.005);
  //   expect(number).toBe(1.01);
  // });
});

describe('Payments array', () => {
  test('Checks the number of payments', () => {
    // Premissas
    const numPayments = 6;

    // Operação
    const payments = calcPayments(200, numPayments);

    // Resultado esperado
    expect(payments.length).toBe(numPayments);
  });

  test('In one time, the value must be the same, with no interest', () => {
    // Premissas
    const numPayments = 1;

    // Operação
    const payments = calcPayments(200, numPayments);

    // Resultado esperado
    expect(payments.length).toBe(numPayments);
    expect(payments[0]).toBe(200);
  });

  test('Checks if the first payment receives the leftovers', () => {
    // Premissas
    const numPayments = 3;
    const value = 100;

    // Operação
    const payments = calcPayments(value, numPayments);

    // Resultado esperado
    expect(payments.length).toBe(numPayments);
    expect(payments[0] + payments[1] + payments[2]).toBe(value);
  });

  test('A value not integer', () => {
    // Premissas
    const numPayments = 3;
    const value = 101.994;

    // Operação
    const payments = calcPayments(value, numPayments);

    // Resultado esperado
    expect(payments.length).toBe(numPayments);
    expect(payments[0] + payments[1] + payments[2]).toBe(value);
  });
});
