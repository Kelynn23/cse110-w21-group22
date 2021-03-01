const startButton = document.getElementById("starttimer");
startButton.addEventListener('click', startOrReset);

const displayTimer = document.getElementById('timerDisplay');
const displayTitle = document.getElementById('pageTitle');
const modeDisplay = document.getElementById('modeDisplay');
const autoStartSetting = document.getElementById('autostart');

const DEFAULT_POMO_TIME = 1500; //25:00
// timer status constants for readability
const NOT_STARTED = 0;
const RUNNING = 1;
// mode constants for readability
const WORK = 0;
const SHORT_BREAK = 1;
const LONG_BREAK = 2;

var numPomos = 0;
var timerInterval;
var mode = WORK;
var modeStr = '';
var timerStatus = NOT_STARTED; //0 is not started, -1 is stopped, 1 is running
var focusTime = 10;
var shortBreak = 5;
var longBreak = 7;
var numPomosToLongBreak = 4;
var startTime = focusTime;
pomoMode();

//start button behavior, checks if timer is running and toggles
function startOrReset() {
    // timer is not running
    if(timerStatus == NOT_STARTED) {
        startTimer();
    } else if (timerStatus == RUNNING) {    //timer is about to be reset
        resetTimer();
    }
    pomoMode();
}

function startTimer() {
    settingsBtn.style.display = "none";
    timerInterval = setInterval(timer, 1000);
    startButton.innerHTML = 'Reset';
    //timer is now running, set flag
    timerStatus = RUNNING;
}

//resets the timer to original time and mode to work time
function resetTimer() {
    settingsBtn.style.display = "initial";
    clearInterval(timerInterval);
    mode = WORK;
    startButton.innerHTML = 'Start';
    //timer is not started, set flag
    timerStatus = NOT_STARTED;  
}

//main driver for timer functionality
//ticks down time and calls displayTime
//at end of timer, checks mode and transitions to next mode
function timer() {
    startTime -= 1;
    displayTime();

    //timer reaches 00:00
    if(startTime <= 0) {
        settingsBtn.style.display = "initial";
        clearInterval(timerInterval);
        startButton.innerHTML = 'Start';
        timerStatus = NOT_STARTED;
        timerSound();
        //notify users that current session ends
        pomoEndNotif();
        //work -> short break -> long break
        pomoTransitions();

        // Start the next round if the AutoStart Setting is turned on
        if(autoStartSetting.checked) {
            startTimer();
        }
    }
}

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

function pomoEndNotif() {
    var notification;
    if(mode == WORK) {
        notification =  'Work Session Ended';  
    } else if(mode == SHORT_BREAK) {
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

//To set mode for the next round of timer
//0: work, 1: short break, 2:long break
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
    displayTime();
    modeDisplay.innerHTML = modeStr;
}

function displayTime() {
    let seconds = startTime % 60;
    let minutes = Math.floor((startTime / 60));

    if(seconds < 10) seconds = '0' + seconds;
    if(minutes < 10) minutes = '0' + minutes;

    displayTimer.innerHTML = minutes + ':' + seconds;
    displayTitle.innerHTML = '(' + minutes + ':' + seconds + ') ' + modeStr;
}

function timerSound() {
    let audio = document.createElement('audio');
    ///* :)
    if (mode == 0) {
        audio.src = './assets/Break time.wav'
    } else {
        audio.src = './assets/Work time.wav'
    }
    //*/
    audio.play();
    return(!audio.pause);
}
