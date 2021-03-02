import * as logic from './logic.js';
import * as display from './display.js';

const autoStartSetting = document.getElementById('autostart');

const DEFAULT_FOCUS_TIME = 10;
const DEFAULT_SHORT_BREAK_TIME = 5;
const DEFAULT_LONG_BREAK_TIME = 7;

var focusTime = DEFAULT_FOCUS_TIME;
var shortBreak = DEFAULT_SHORT_BREAK_TIME;
var longBreak = DEFAULT_LONG_BREAK_TIME;

// initialize with work session values
var mode = 0;
var modeString = 'Focus';
var timeString = logic.getTimeString(focusTime);
var currentSessionTime = focusTime;

var numPomos = 0;
var numPomosToLongBreak = 4;

// stores id returned from setInterval in logic.timer() 
var timerID;

// event listeners for start and reset buttons
document.getElementById('starttimer').addEventListener('click', startTimer);
document.getElementById('resettimer').addEventListener('click', resetTimer);

updateView();

// start the timer
function startTimer() { 
    timerID = logic.timer(currentSessionTime, update);
    display.showResetBtn();
    display.hideSettingsButton();
}

/* stop timer and reset to session work time
 * this function is only called when user clicks the reset button
 */
function resetTimer() {
    stopTimer();
    updateView(focusTime);
}
 
/* clear timer and display the right buttons
 * this function is called by update() when time runs out,
 * and by resetTimer() when the user clicks the reset button 
 */
function stopTimer() {
    clearInterval(timerID);
    display.showStartBtn();
    display.showSettingsButton();
}

/* callback function for the timer to call every second
 * stops timer and creates notification when time runs out
 * uses helper functions from logic.js to update variables when the time runs out
 * calls the updateView function to update browser contents
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
    }
    else {
        timeString = logic.getTimeString(time);
        updateView();
    }
}

// use display functions to update the display
function updateView() { 
    display.displayTime(timeString); 
    display.displayMode(modeString);
    display.displayTitle(timeString, modeString);
    display.displayPomosFinished(numPomos);
}

// notification function, called by update() when timer runs out
function pomoEndNotif(endedMode) {
    let notification = logic.notificationString(endedMode);
    display.titleNotification(notification);

    /* only create an alert if AutoStart is turned off, 
        (the next round won't start until the user manually accepts the alert) */
    if(!autoStartSetting.checked) {
        setTimeout(function() {alert(notification);}, 500);
    }  
}



