const logic = require('../logicFunctions');

const WORK = 0;
const SHORT_BREAK = 1;
const LONG_BREAK = 2;

describe('Checks if nextMode correctly determines the next mode of the timer', () => {
  test('work,0 pomos,4 to longBreak should be shortbreak' , () => {
    let mode = WORK;
    let numPomos = 0;
    let numPomosToLongBreak = 4;
    expect( logic.nextMode(mode,numPomos,numPomosToLongBreak) ).toBe(SHORT_BREAK);
  
  });
  
  test('work,3 pomos,4 to longBreak should be longbreak' , () => {
    let mode = WORK;
    let numPomos = 3;
    let numPomosToLongBreak = 4;
    expect( logic.nextMode(mode,numPomos,numPomosToLongBreak) ).toBe(LONG_BREAK);
  
  });
  
  test('short break,0 pomos,4 to longBreak should be shortbreak' , () => {
    let mode = SHORT_BREAK;
    let numPomos = 0;
    let numPomosToLongBreak = 4;
    expect( logic.nextMode(mode,numPomos,numPomosToLongBreak) ).toBe(WORK);
  
  });
  
  test('short break,7 pomos,4 to longBreak should be longbreak' , () => {
    let mode = WORK;
    let numPomos = 7;
    let numPomosToLongBreak = 4;
    expect( logic.nextMode(mode,numPomos,numPomosToLongBreak) ).toBe(LONG_BREAK);
  
  });
  
  test('short break,5 pomos,4 to longBreak should be shortbreak' , () => {
    let mode = WORK;
    let numPomos = 5;
    let numPomosToLongBreak = 4;
    expect( logic.nextMode(mode,numPomos,numPomosToLongBreak) ).toBe(SHORT_BREAK);
  
  });
  
  test('short break,7 pomos,4 to longBreak should be longbreak' , () => {
    let mode = LONG_BREAK;
    let numPomos = 4;
    let numPomosToLongBreak = 4;
    expect( logic.nextMode(mode,numPomos,numPomosToLongBreak) ).toBe(WORK);
  
  });
});

