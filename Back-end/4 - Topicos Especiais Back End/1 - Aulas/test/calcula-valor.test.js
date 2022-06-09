import { calcValue } from '../src/calcula-valor.js';

test('If it was payed in one time period, the value doesn`t receives interest', () => {
  // Operação
  const amount = calcValue(100, 0.0175, 1);

  // Resultado/Comportamento esperado
  expect(amount).toBe(100);
});
