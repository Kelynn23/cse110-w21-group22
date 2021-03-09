const logic = require('../logicFunctions');

describe('Testing if notificationAudioSource() correctly returns the file location to the audio that will be played', ()=> {

    test('nextMode is 0 and voiceSoundOn is true, expecting "./assets/focusTime.wav"', () => {
        let nextMode = 0;
        let voiceSoundOn = true;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/focusTime.wav');
    });
    test('nextMode is 1 and voiceSoundOn is true, expecting "./assets/shortBreak.wav"', () => {
        let nextMode = 1;
        let voiceSoundOn = true;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/shortBreak.wav');
    });

    test('nextMode is 2 and voiceSoundOn is true, expecting "./assets/longBreak.wav"', () => {
        let nextMode = 2;
        let voiceSoundOn = true;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/longBreak.wav');
    });

    test('nextMode is 0 and voiceSoundOn is false, expecting "./assets/ding.wav"', () => {
        let nextMode = 0;
        let voiceSoundOn = false;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/ding.wav');
    });

    test('nextMode is 1 and voiceSoundOn is false, expecting "./assets/ding.wav"', () => {
        let nextMode = 1;
        let voiceSoundOn = false;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/ding.wav');
    });

    test('nextMode is 2 and voiceSoundOn is false, expecting "./assets/ding.wav"', () => {
        let nextMode = 2;
        let voiceSoundOn = false;
        expect(logic.notificationAudioSource(nextMode, voiceSoundOn)).toBe('./assets/ding.wav');
    });
});