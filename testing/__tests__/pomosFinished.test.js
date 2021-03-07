const logic = require('../logicFunctions');

describe('Checks if numPomo correctly determines how many pomos have been finished with different parameters', () => {
  test('numPomos is 0 nextMode is WORK, should return 1', () => {
    let numPomos = 0;
    let nextMode = 0;

	  expect(logic.pomosFinished(nextMode, numPomos)).toBe(1);
  });

  test('numPomos is 0 nextMode is SHORT_BREAK, should return 0', () => {
    let numPomos = 0;
    let nextMode = 1;

    expect(logic.pomosFinished(nextMode, numPomos)).toBe(0);
  });

  test('numPomos is 0 nextMode is LONG_BREAK, should return 0', () => {
    let numPomos = 0;
    let nextMode = 2;

    expect(logic.pomosFinished(nextMode, numPomos)).toBe(0);
  });

  test('numPomos is 1 nextMode is WORK, should return 2', () => {
    let numPomos = 1;
    let nextMode = 0;

    expect(logic.pomosFinished(nextMode, numPomos)).toBe(2);
  });
});

