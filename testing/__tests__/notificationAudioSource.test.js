const logic = require('../logicFunctions');

describe('Testing if notificationAudioSource() correctly returns the file location to the audio that will be played', ()=> {

    test('nextMode is 0, expecting "./assets/focusTime.wav"', () => {
        let nextMode = 0;
    
        expect(logic.notificationAudioSource(nextMode)).toBe('./assets/focusTime.wav');
    });
    test('nextMode is 1, expecting "./assets/shortBreak.wav"', () => {
        let nextMode = 1;
    
        expect(logic.notificationAudioSource(nextMode)).toBe('./assets/shortBreak.wav');
    });

    test('nextMode is 2, expecting "./assets/longBreak.wav"', () => {
        let nextMode = 2;
    
        expect(logic.notificationAudioSource(nextMode)).toBe('./assets/longBreak.wav');
    });
});