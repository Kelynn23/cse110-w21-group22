const logic = require('../logicFunctions');

test('time is 25, expecting 00:25', () => {
	let time = 25;
	expect(logic.getTimeString(time)).toBe('00:25');
});


test('time is 5, expecting 00:05', () => {
	let time = 5;
	expect(logic.getTimeString(time)).toBe('00:05');
});

test('time is 65, expecting 01:05', () => {
	let time = 65;
	expect(logic.getTimeString(time)).toBe('01:05');
});

test('time is 137, expecting 02:17', () => {
	let time = 137;
	expect(logic.getTimeString(time)).toBe('02:17');
});

test('time is 3600, expecting 60:00', () => {
	let time = 3600;
	expect(logic.getTimeString(time)).toBe('60:00');
});

test('time is 600, expecting 10:00', () => {
	let time = 600;
	expect(logic.getTimeString(time)).toBe('10:00');
});

test('time is 700, expecting 11:40', () => {
	let time = 700;
	expect(logic.getTimeString(time)).toBe('11:40');
});

test('time is 0, expecting 00:00', () => {
	let time = 0;
	expect(logic.getTimeString(time)).toBe('00:00');
});