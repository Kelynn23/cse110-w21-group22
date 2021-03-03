const logic = require('../logicFunctions');

test('getTimeString works', () => {
	let time = 25;
	expect(logic.getTimeString(time)).toBe('00:25');
});
