import * as logic from './logic.js';
import * as display from './display.js';
import * as settings from './settings.js';
/**
 * @file  controller.js is used to take the logic functions from logic.js and control the timer
 * @author group 22
 */


/**
 * Default focus time that will be used if the user does not adjust the time themselves
 * @type {number}
 */
const DEFAULT_FOCUS_TIME = 10;
/**
 * Default short break time that will be used if the user does not adjust the time themselves
 * @type {number}
 */
const DEFAULT_SHORT_BREAK_TIME = 5;
/**
 * Default long break time that will be used if the user does not adjust the time themselves
 * @type {number}
 */
const DEFAULT_LONG_BREAK_TIME = 7;


/**
 * The current time for the focus mode
 * @type {number}
 */
var focusTime = DEFAULT_FOCUS_TIME;
/**
 * The current time for the short break
 * @type {number}
 */
var shortBreak = DEFAULT_SHORT_BREAK_TIME;
/**
 * The current time for the long break
 * @type {number}
 */
var longBreak = DEFAULT_LONG_BREAK_TIME;


// initialize with work session values
/**
 * The current mode of the pomo timer
 * @type {number}
 */
var mode = 0;
/**
 * The string that will display the current mode to the user
 * @type {string}
 */
var modeString = 'Focus';
/**
 * The string that will display the time remaining to the user which will be nicely formatted with minutes and seconds
 * @type {string}
 */
var timeString = logic.getTimeString(focusTime);
/**
 * The remaining time left in the session
 * @type {number}
 */
var currentSessionTime = focusTime;

/**
 * The number of pomos that have been completed
 * @type {number}
 */
var numPomos = 0;
/**
 * The number of pomos that must be compeleted before a long break
 * @type {number}
 */
var numPomosToLongBreak = 4;

 
/**
 * Stores id returned from setInterval in logic.timer() 
 * @type {number}
 */
var timerID;

// event listeners for start and reset buttons
document.getElementById('starttimer').addEventListener('click', startTimer);
document.getElementById('resettimer').addEventListener('click', resetTimer);
settings.setUpSettings(updateTimeSettings);

updateView();

/**
 * Starts the timer
 */
function startTimer() { 
    timerID = logic.timer(currentSessionTime, update);
    display.showResetBtn();
    display.hideSettingsButton();
}



/**
 * Stops the timer and reset to beginning of a work session,
 * this function is only called when user clicks the reset button
 */
function resetTimer() {
    stopTimer();   
    mode = 0;
    modeString = 'Focus';
    timeString = logic.getTimeString(focusTime);
    currentSessionTime = focusTime;  
    updateView();
}



/**
 * Clears the timer and displays the right buttons,
 * this function is called by update() when time runs out, 
 * or by resetTimer() when the user clicks the reset button
 */
function stopTimer() {
    clearInterval(timerID);
    display.showStartBtn();
    display.showSettingsButton();
}

/**
 * Callback function for the timer to call every second
 * stops timer and creates notification when time runs out
 * uses helper functions from logic.js to update variables when the time runs out
 * calls the updateView function to update browser contents
 * @param {number} time - the total time in seconds
 */
function update(time) {
    if (time == 0) {
        stopTimer();
        pomoEndNotif(mode);

        mode = logic.nextMode(mode, numPomos, numPomosToLongBreak);
        numPomos = logic.pomosFinished(mode, numPomos);       
        modeString = logic.newModeString(mode);
        currentSessionTime = logic.nextSessionTime(mode, focusTime, shortBreak, longBreak);
        timeString = logic.getTimeString(currentSessionTime);
        
        updateView();

        if (settings.autoStartOn()) {
            startTimer();
        } 
    } else {
        timeString = logic.getTimeString(time);
        updateView();
    }
}



/**
 * Calls display functions from display.js to update the display
 */
function updateView() { 
    display.displayTime(timeString); 
    display.displayMode(modeString);
    display.displayTitle(timeString, modeString);
    display.displayPomosFinished(numPomos);
}



/**
 * Notification function, called by update() when timer runs out
 * @param {number} endedMode - Mode that has just ended
 */
function pomoEndNotif(endedMode) {
    let notification = logic.notificationString(endedMode);
    display.titleNotification(notification);
    //change condition based on if they want to mute or not
    if (0) {
        let fileLocation = logic.notificationAudioSource(logic.nextMode(mode, numPomos, numPomosToLongBreak));
        display.playAudio(fileLocation);
    }
    
    // only create an alert if AutoStart is turned off, 
    // (the next round won't start until the user manually accepts the alert) 
    if (!settings.autoStartOn()) {
        setTimeout(function() {alert(notification);}, 500);
    }  
}

/**
 * Update the time based on user input
 */
function updateTimeSettings() { 
    focusTime = settings.getFocusTime();
    shortBreak = settings.getShortBreakTime();
    longBreak = settings.getLongBreakTime();

    currentSessionTime = logic.nextSessionTime(mode, focusTime, shortBreak, longBreak);
    timeString = logic.getTimeString(currentSessionTime);
    updateView();
}



window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if(code == 32){ //space
        //start timer
        if(window.getComputedStyle(document.getElementById('starttimer')).display == "none") {
            resetTimer();
        }
        //reset timer
        else {
            startTimer();
        }
    } 
    else if(code == 83){ //s 
        if(window.getComputedStyle('starttimer').display === "none") settings.displayModal();
    }
    else if(code == 27){ //ESC
        settings.closeModal();
    }
}


