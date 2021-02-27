/**
 * @file timer.js controls the timer and all mode of the pomodoro technique
 * @author group 22
 */



/**
 * Start button/Reset button
 * @type {element}
 */
const startButton = document.getElementById("starttimer");
startButton.addEventListener('click', startTimer);

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
var mode = 0;
/**
 * String that displays the current mode for the user
 * @type {string}
 */
var modeStr = '';
/**
 * Keep tracks of the status of the timer (0 is not started, -1 is stopped, 1 is running)
 * @type {number}
 */
var timerStatus = 0; 
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
function startTimer() {
    //timer is not running
    if(timerStatus == 0) {
        settingsBtn.style.display = "none";
        pomoMode(mode);
        timerInterval = setInterval(timer, 1000);
        startButton.innerHTML = 'Reset';
        //timer is now running, set flag
        timerStatus = 1;
    } else if (timerStatus == 1) {    //timer is about to be reset
        resetTimer();
        pomoMode(mode);
    }
}


/**
 * resets the timer to original time and mode to work time
 */
function resetTimer() {
    settingsBtn.style.display = "initial";
    clearInterval(timerInterval);
    startTime = focusTime;
    modeStr = 'Focus';
    displayTime(startTime);
    timerStatus = 0;
    startButton.innerHTML = 'Start'; 
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
        timerStatus = 0;
        timerSound(mode);
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
        && mode == 0) {
        mode = 2;
        //display the time for next mode
        pomoMode(mode); 

    } else if(mode == 1) { //short break -> working
        //increment numPomos after short break
        numPomos += 1;
        document.getElementById('complete').innerHTML = numPomos + ' Pomos Finished';
        mode = 0;
        //display the time for next mode
        pomoMode(mode);
    } else {
        //working -> short break
        if (mode == 0) {
            mode = 1;
            pomoMode(mode);
        } else {  //long break -> working
            //increment numPomos after long break
            numPomos += 1;
            document.getElementById('complete').innerHTML = numPomos + ' Pomos Finished';
            mode = 0;
            pomoMode(mode);
        }
    }
}

/**
 * Notifies the user that their current mode has ended
 * @param {number} currentMode 
 */
function pomoEndNotif(currentMode) {
     //notification to users at session end
     if(currentMode == 0) {
        displayTitle.innerHTML = 'Work Session Ended';
        /* only create an alert if AutoStart is turned off, 
           (the next round won't start until the user manually accepts the alert) */
        if(!autoStartSetting.checked) {
            setTimeout(function(){alert('Work Session Ended');}, 500);
        }
    } else if(currentMode == 1) {
        displayTitle.innerHTML = 'Short Break Ended';
        /* only create an alert if AutoStart is turned off, 
           (the next round won't start until the user manually accepts the alert) */
        if(!autoStartSetting.checked) {
            setTimeout(function(){alert('Short Break Ended');}, 500);
        }
    } else {
        displayTitle.innerHTML = 'Long Break Ended';
        /* only create an alert if AutoStart is turned off, 
           (the next round won't start until the user manually accepts the alert) */
        if(!autoStartSetting.checked) {
            setTimeout(function(){alert('Long Break Ended');}, 500);
        }
    }
}


/**
 * Set the mode for the next round of timer (0: work, 1: short break, 2:long break)
 */
function pomoMode() {
    if(mode == 0) {
        startTime = focusTime;
        modeStr = 'Focus';
        displayTime(startTime);
        modeDisplay.innerHTML = 'Work!';
    } else if (mode == 1) {
        startTime = shortBreak;
        modeStr = 'Short Break';
        displayTime(startTime);
        modeDisplay.innerHTML = 'Short Break!';
    } else {
        startTime = longBreak;
        modeStr = 'Long Break';
        displayTime(startTime);
        modeDisplay.innerHTML = 'Long Break!';
    }
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
