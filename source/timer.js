/**
 * @file timer.js controls the timer and all mode of the pomodoro technique
 * @author group 22
 */



/**
 * Start button/Reset button
 * @type {element}
 */
const startButton = document.getElementById("starttimer");
startButton.addEventListener('click', startOrReset);

/**
 * Timer Display
 * @type {element}
 */
const displayTimer = document.getElementById('timerDisplay');
/**
 * Text in the tab
 * @type {element}
 */
const displayTitle = document.getElementById('pageTitle');
/**
 * Display Mode
 * @type {element}
 */
const modeDisplay = document.getElementById('modeDisplay');
/**
 * Auto Start Button
 * @type {element}
 */
const autoStartSetting = document.getElementById('autostart');
/**
 * Mute Toggle
 * @type {element}
 */
 const muteSetting = document.getElementById('mute');

/**
 * Check if timer has started or not
 * @type {number}
 */
const NOT_STARTED = 0;

/**
 * Check if timer is running
 * @type {number}
 */
const RUNNING = 1;

/**
 * The mode that represents work
 * @type {number}
 */
const WORK = 0;

/**
 * The mode the represents short break
 * @type {number}
 */
const SHORT_BREAK = 1;

/**
 * The mode that represents long break
 * @type {number}
 */
const LONG_BREAK = 2;
/**
 * Default focus time 
 * @type {number}
 */
const DEFAULT_POMO_TIME = 1500; //25:00
/**
 * Number of pomos that have been completed
 * @type {number}
 */
var numPomos = 0;
/**
 * Function that repeatedly calls timer() every 1s
 * @type {function}
 */
var timerInterval;
/**
 * Keep tracks of the current mode
 * @type {number}
 */
var mode = WORK;
/**
 * String that displays the current mode for the user
 * @type {string}
 */
var modeStr = '';
/**
 * Keep tracks of the status of the timer (0 is not started, -1 is stopped, 1 is running)
 * @type {number}
 */
var timerStatus = NOT_STARTED; 
/**
 * Time for focus time
 * @type {number}
 */
var focusTime = 10;
/**
 * Time of short break
 * @type {number}
 */
var shortBreak = 5;
/**
 * Time of long break
 * @type {number}
 */
var longBreak = 7;
/**
 * Number of pomos that need to be completed before long break
 * @type {number}
 */
var numPomosToLongBreak = 4;
/**
 * The time in seconds that will count down
 * @type {number}
 */
var startTime = focusTime;
pomoMode();


/**
 * start button behavior, checks if timer is running and toggles
 */
function startOrReset() {
    // timer is not running
    if(timerStatus == NOT_STARTED) {
        startTimer();
    } else if (timerStatus == RUNNING) {    //timer is about to be reset
        resetTimer();
    }
    pomoMode();
}

/**
 * starts the timer so it begins counting down
 */
function startTimer() {
    settingsBtn.style.display = "none";
    timerInterval = setInterval(timer, 1000);
    startButton.innerHTML = 'Reset';
    //timer is now running, set flag
    timerStatus = RUNNING;
}


/**
 * resets the timer to original time and mode to work time
 */
function resetTimer() {
    settingsBtn.style.display = "initial";
    clearInterval(timerInterval);
    mode = WORK;
    startButton.innerHTML = 'Start';
    //timer is not started, set flag
    timerStatus = NOT_STARTED;  
}


/**
 * main driver for timer functionality,
 * ticks down the timer and calls displayTime,
 * at the end of timer it checks mode and transitions to next mode
 */
function timer() {
    startTime -= 1;
    displayTime(startTime);

    //timer reaches 00:00
    if(startTime <= 0) {
        settingsBtn.style.display = "initial";
        clearInterval(timerInterval);
        startButton.innerHTML = 'Start';
        timerStatus = NOT_STARTED;
        if(!muteSetting.checked) {
            timerSound(mode);
        }
        //notify users that current session ends
        pomoEndNotif(mode);
        //work -> short break -> long break
        pomoTransitions();

        // Start the next round if the AutoStart Setting is turned on
        if(autoStartSetting.checked) {
            startTimer();
        }
    }
}

/**
 * transitions from current mode to the next mode,
 * working -> short break,
 * short break -> working,
 * working -> long break (after 4 pomos),
 * long break - working
 */
function pomoTransitions() {
    //working -> long break
    if(numPomos % numPomosToLongBreak == numPomosToLongBreak - 1 
        && mode == WORK) {
        mode = LONG_BREAK;
    }
    //short break -> working
    else if(mode == SHORT_BREAK) {
        //increment numPomos after short break
        numPomos += 1;
        document.getElementById('complete').innerHTML = numPomos + ' Pomos Finished';
        mode = WORK;
    }
    else {
        //working -> short break
        if(mode == WORK){
            mode = SHORT_BREAK;
        }
        //long break -> working
        else{
            //increment numPomos after long break
            numPomos += 1;
            document.getElementById('complete').innerHTML = numPomos + ' Pomos Finished';
            mode = WORK;  
        }
    }
    //display the time for next mode
    pomoMode();
}

/**
 * Displays a notification for the user based on the current mode
 * @param {number} currentMode - The current mode of the timer
 */
function pomoEndNotif(currentMode) {
    var notification;
    if(currentMode == WORK) {
        notification =  'Work Session Ended';  
    } else if(currentMode == SHORT_BREAK) {
        notification =  'Short Break Ended';
    } else {
        notification =  'Long Break Ended';
    }
    //notification to users at session end
    displayTitle.innerHTML = notification;

    /* only create an alert if AutoStart is turned off, 
        (the next round won't start until the user manually accepts the alert) */
    if(!autoStartSetting.checked) {
        setTimeout(function() {alert(notification);}, 500);
    }  
}


/**
 * Set the mode for the next round of timer (0: work, 1: short break, 2:long break)
 * @param {number} currentMode - The current mode of the timer
 */
function pomoMode() {
    if(mode == WORK) {
        startTime = focusTime;
        modeStr = 'Focus';
    } else if (mode == SHORT_BREAK) {
        startTime = shortBreak;
        modeStr = 'Short Break';
    } else {
        startTime = longBreak;
        modeStr = 'Long Break';
    }
    displayTime(startTime);
    modeDisplay.innerHTML = modeStr;
}

/**
 * Takes the time in seconds converts it into minutes and seconds then displays it
 * @param {number} timeToDisplay - total time in seconds
 */
function displayTime(timeToDisplay) {
    let seconds = timeToDisplay % 60;
    let minutes = Math.floor((timeToDisplay / 60));

    if(seconds < 10) seconds = '0' + seconds;
    if(minutes < 10) minutes = '0' + minutes;

    displayTimer.innerHTML = minutes + ':' + seconds;
    displayTitle.innerHTML = '(' + minutes + ':' + seconds + ') ' + modeStr;
}

/**
 * plays a sound notification based on the current mode
 * @param {number} currentMode 
 * @return {boolean} - Tells you if the audio has successfully been played
 */
function timerSound(currentMode) {
    let audio = document.createElement('audio');
    ///* :)
    if (currentMode == 0) {
        audio.src = './assets/Break time.wav'
    } else {
        audio.src = './assets/Work time.wav'
    }
    //*/
    audio.play();
    return(!audio.pause);
}
