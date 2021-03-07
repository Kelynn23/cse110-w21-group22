const logic = require('../logicFunctions');


describe('', () => {
  test('nextMode is work, focus time is 10 should be 10', () => {
    let nextMode = 0;
    let focusTime = 10;
    let shortBreak = 5;
    let longBreak = 7;

	  expect(logic.nextSessionTime(nextMode, focusTime, shortBreak, longBreak)).toBe(10);
  });


  test('nextMode is shortbreak, break time is 5 should be 5', () => {
    let nextMode = 1;
    let focusTime = 10;
    let shortBreak = 5;
    let longBreak = 7;

    expect(logic.nextSessionTime(nextMode, focusTime, shortBreak, longBreak)).toBe(5);
  });


  test('nextMode is longbreak, longbreak time is 7 should be 7', () => {
    let nextMode = 2;
    let focusTime = 10;
    let shortBreak = 5;
    let longBreak = 7;

    expect(logic.nextSessionTime(nextMode, focusTime, shortBreak, longBreak)).toBe(7);
  });
});
