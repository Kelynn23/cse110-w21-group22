const logic = require('../logicFunctions');

describe('Testing if notificationString() returns all the correct strings to be displayed', ()=> {

    test('endedMode is 0, expecting "Work Session Ended"', () => {
        let endedMode = 0;
    
        expect(logic.notificationString(endedMode)).toBe('Work Session Ended');
    });
    test('endedMode is 1, expecting "Short Break Ended"', () => {
        let endedMode = 1;
    
        expect(logic.notificationString(endedMode)).toBe('Short Break Ended');
    });

    test('endedMode is 2, expecting "Long Break Ended"', () => {
        let endedMode = 2;
    
        expect(logic.notificationString(endedMode)).toBe('Long Break Ended');
    });
});
