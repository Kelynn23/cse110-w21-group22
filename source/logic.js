/**
 * @file logic.js is used to deal with all the logic of the timer
 * @author group 22
 */



/**
 * Number id that is used to identify whether mode is focus time
 * @type {number}
 */
const WORK = 0;

/**
 * Number id that is used to identify whether mode is short break
 * @type {number}
 */
const SHORT_BREAK = 1;
/**
 * Number id that is used to identify whether mode is long break
 * @type {number}
 */
const LONG_BREAK = 2;

/**
 * Seconds in minutes
 * @type {number}
 */
const MINUTE = 60;


/**
 * Decrements the time every second
 * uses a callback function to communicate with controller.js
 * @param {number} - The total time in seconds
 * @param {function} - Function from controller.js that will be calledback
 * @return {number} - The id of the setInterval 
 */
export function timer(time, callback) {
    let timerID = setInterval(() => {
        time--;
        callback(time);
    }, 1000);
    return timerID;
}


/**
 * Returns a string showing the time in minutes in seconds
 * @param {number} time - The total time in seconds
 * @return {string} - A nice formated string displaying the minutes and seconds left
 */
export function getTimeString(time) {
    let seconds = time % MINUTE;
    let minutes = Math.floor((time / MINUTE));
    if(seconds < 10) seconds = '0' + seconds;
    if(minutes < 10) minutes = '0' + minutes;
  
    return minutes + ":" + seconds;
}


/**
 * Returns the next mode 
 * @param {number} mode - Number the represents the current mode
 * @param {number} numPomos - The number of pomos that have been completed
 * @param {number} numPomosToLongBreak - The number of pomos that have to be compeleted before a long break
 * @return - The next mode after the user completes the current mode
 */
export function nextMode(mode, numPomos, numPomosToLongBreak) {
    let nextMode;
    //working -> long break
    if (numPomos % numPomosToLongBreak == numPomosToLongBreak - 1 && mode == WORK) {
        nextMode = LONG_BREAK;
    } else if (mode == SHORT_BREAK) { //short break -> working
        nextMode = WORK;
    } else if (mode == WORK) {  //working -> short break
        nextMode = SHORT_BREAK;
    } else {     //long break -> working
        nextMode = WORK;  
    }
    return nextMode;
}


/**
 * Increments numPomos after a break
 * @param {number} nextMode - Number the represents the next mode the user will begin
 * @param {number} numPomos - The number of pomos that have been completed
 * @return {number} - The number of pomos that have been completed after being updated
 */
export function pomosFinished (nextMode, numPomos) {
    if (nextMode == WORK) {
        numPomos++;
    }
    return numPomos;
}


/**
 * Returns the correct modeString for the next session
 * @param {number} nextMode - Number the represents the next mode the user will begin
 * @return {string} - String that will be displayed to the user informing them of the next mode
 */
export function newModeString(nextMode) {
    let modeString;
    if(nextMode == WORK) {
        modeString = 'Focus';
    } else if (nextMode == SHORT_BREAK) {
        modeString = 'Short Break';
    } else {
        modeString = 'Long Break';
    }
    return modeString;
}

/**
 * Returns the amount of time for the next session
 * @param {number} nextMode - Number that represents the next mode the user is about to start
 * @param {number} focusTime - The total time in seconds that will be used in the focus mode
 * @param {number} shortBreak - The total time in seconds that will be used in the short break mode
 * @param {number} longBreak - The total time in seconds that will be used in the long break mode
 * @return {number} - The total time in seconds that will be counted down
 */
export function nextSessionTime(nextMode, focusTime, shortBreak, longBreak) {
    let startTime;
    if (nextMode == WORK) {
        startTime = focusTime;
    } else if (nextMode == SHORT_BREAK) {
        startTime = shortBreak;
    } else {
        startTime = longBreak;
    }
    return startTime;
}


/**
 * Returns the notification string for the round that just ended 
 * @param {number} endedMode - Number that the represents the mode that has ended
 * @return {string} - String that will be displayed to the user in the notification telling them which mode has ended
 */
export function notificationString(endedMode) {
    let notification;
    if (endedMode == WORK) {
        notification = 'Work Session Ended';  
    } else if (endedMode == SHORT_BREAK) {
        notification = 'Short Break Ended';
    } else {
        notification = 'Long Break Ended';
    }
    return notification; 
}

/**
 * Gets the audio location that will be played based on the next mode
 * @param {number} nextMode Number that represents the next mode the user is about to start
 * @return {string} - String that is the file location of the audio that will be played to the user
 */
export function notificationAudioSource(nextMode, voiceSoundOn) {
    let notificationAudioLocation;
    if (voiceSoundOn) {
        if (nextMode == WORK) {
            notificationAudioLocation = './assets/focusTime.mp3';
        } else if (nextMode == SHORT_BREAK) {
            notificationAudioLocation = './assets/shortBreak.mp3';
        } else {
            notificationAudioLocation = './assets/longBreak.mp3';
        }
    } else {
        notificationAudioLocation = './assets/ding.mp3';
    }

    return notificationAudioLocation;

}