const logic = require('../logicFunctions');

const focus = 'Focus';
const short = 'Short Break';
const long = 'Long Break';

test('next is WORK, should be focus' , () => {
	let nextMode = 0;
	expect( logic.newModeString(nextMode) ).toBe(focus);
});

test('next is short, should be short' , () => {
	let nextMode = 1;
	expect( logic.newModeString(nextMode) ).toBe(short);
});

test('next is short, should be short' , () => {
	let nextMode = 2;
	expect( logic.newModeString(nextMode) ).toBe(long);
});