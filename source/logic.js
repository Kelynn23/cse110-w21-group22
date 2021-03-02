const WORK = 0;
const SHORT_BREAK = 1;
const LONG_BREAK = 2;

const MINUTE = 60;

/* decrements the time every second 
 * uses a callback function to communicate with controller.js
 */
export function timer(time, callback) {
    let timerID = setInterval(() => {
        time--;
        callback(time);
    }, 1000);
    return timerID;
}

// returns a string showing the time in minutes in seconds
export function getTimeString(time) {
    let seconds = time % MINUTE;
    let minutes = Math.floor((time / MINUTE));
    if(seconds < 10) seconds = '0' + seconds;
    if(minutes < 10) minutes = '0' + minutes;
  
    return minutes + ":" + seconds;
}

// returns the next mode (used to be called pomoTransitions)
export function nextMode(mode, numPomos, numPomosToLongBreak) {
    let nextMode;
    //working -> long break
    if(numPomos % numPomosToLongBreak == numPomosToLongBreak - 1 
        && mode == WORK) {
        nextMode = LONG_BREAK;
    }
    //short break -> working
    else if(mode == SHORT_BREAK) {
        nextMode = WORK;
    }
    //working -> short break
    else if(mode == WORK) {
        nextMode = SHORT_BREAK;
    }
    //long break -> working
    else{
        nextMode = WORK;  
    }
    return nextMode;
}

// increments numPomos after a break
export function pomosFinished (nextMode, numPomos) {
    if (nextMode == WORK) {
        numPomos++;
    }
    return numPomos;
}

// returns the correct modeString for the next session
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

// returns the amount of time for the next session
export function nextSessionTime(nextMode, focusTime, shortBreak, longBreak) {
    let startTime;
    if(nextMode == WORK) {
        startTime = focusTime;
    } else if (nextMode == SHORT_BREAK) {
        startTime = shortBreak;
    } else {
        startTime = longBreak;
    }
    return startTime;
}

// returns the notification string for the round that just ended 
export function notificationString(endedMode) {
    let notification;
    if(endedMode == WORK) {
        notification =  'Work Session Ended';  
    } else if(endedMode == SHORT_BREAK) {
        notification =  'Short Break Ended';
    } else {
        notification =  'Long Break Ended';
    }
    return notification; 
}