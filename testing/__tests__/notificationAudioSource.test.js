const logic = require('../logicFunctions');

describe('Testing if notificationAudioSource() correctly returns the file location to the audio that will be played', ()=> {

    test('nextMode is 0 and voiceSoundOn is true, expecting "./assets/focusTime.mp3"', () => {
        let nextMode = 0;
        let voiceSoundOn = true;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/focusTime.mp3');
    });
    test('nextMode is 1 and voiceSoundOn is true, expecting "./assets/shortBreak.mp3"', () => {
        let nextMode = 1;
        let voiceSoundOn = true;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/shortBreak.mp3');
    });

    test('nextMode is 2 and voiceSoundOn is true, expecting "./assets/longBreak.mp3"', () => {
        let nextMode = 2;
        let voiceSoundOn = true;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/longBreak.mp3');
    });

    test('nextMode is 0 and voiceSoundOn is false, expecting "./assets/ding.mp3"', () => {
        let nextMode = 0;
        let voiceSoundOn = false;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/ding.mp3');
    });

    test('nextMode is 1 and voiceSoundOn is false, expecting "./assets/ding.mp3"', () => {
        let nextMode = 1;
        let voiceSoundOn = false;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/ding.mp3');
    });

    test('nextMode is 2 and voiceSoundOn is false, expecting "./assets/ding.mp3"', () => {
        let nextMode = 2;
        let voiceSoundOn = false;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/ding.mp3');
    });
});