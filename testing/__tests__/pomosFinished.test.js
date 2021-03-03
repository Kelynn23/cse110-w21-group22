const logic = require('../logicFunctions');

test('pomosFinished returns the correct number of pomos', () => {
    let numPomos = 0;
    let nextMode = 0;

	expect(logic.pomosFinished(nextMode, numPomos)).toBe(1);

});