const startButton = document.getElementById("starttimer");
startButton.addEventListener('click', startTimer);

const displayTimer = document.getElementById('timerDisplay');
/**const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);
*/
const DEFAULT_POMO_TIME = 1500; //25:00
var numPomos = 0;
var timerInterval;
var startTime = focusTime;
var mode = 0;
var timerStatus = 0; //0 is not started, -1 is stopped, 1 is running
var focusTime = 10;
var shortBreak = 5;
var longBreak = 7;
var numPomosToLongBreak = 4;

//start button behavior, checks if timer is running and toggles
function startTimer() {
    //timer is not running
    if(timerStatus == 0) {
        pomoMode();
        timerInterval = setInterval(timer, 1000);
        startButton.innerHTML = "Stop";
        //timer is now running, set flag
        timerStatus = 1;
    }
    //timer was stopped
    else if (timerStatus == 1){
        stopTimer();
    }
    //timer is about to be reset
    else if (timerStatus == -1) {
        resetTimer();
    }
}

//stops the timer and allows user to reset their pomo session
function stopTimer() {
    clearInterval(timerInterval);
    timerStatus = -1;
    startButton.innerHTML = "Reset";
}

//resets the timer to original time and mode to work time
function resetTimer() {
    startTime = focusTime;
    displayTime();
    mode = 0;
    timerStatus = 0;
    startButton.innerHTML = "Start";
}

//main driver for timer functionality
//ticks down time and calls displayTime
//at end of timer, checks mode and transitions to next mode
function timer()
{
    startTime -= 1;
    displayTime();
    //timer reaches 00:00
    if(startTime == 0)
    {
        clearInterval(timerInterval);
        startButton.innerHTML = "Start";
        timerStatus = 0;
        if(numPomos != 0 && numPomos % numPomosToLongBreak == 0)
        {
            //long break
            mode = 10000;
            numPomos += 1;
            document.getElementById('complete').innerHTML = numPomos + " Pomos Finished";
        }
        else if(mode == 1) {
            //work mode
            mode = 0;
            numPomos += 1;
            document.getElementById('complete').innerHTML = numPomos + " Pomos Finished";
        }
        else {
            //short break
            mode = 1;
        }

    }
}

//0: work, 1: short break, 2:long break
function pomoMode()
{
    if(mode == 0) {
        startTime = 10;
        displayTime();
    }
    else if(mode == 1) {
        startTime = shortBreak;
        displayTime();

    } else {
        startTime = longBreak;
        displayTime();
    }
}

function displayTime() {
    let seconds = startTime % 60;
    let minutes = Math.floor((startTime / 60));
    if(seconds < 10) seconds = '0' + seconds;

    if(minutes < 10) minutes = '0' + minutes;

    displayTimer.innerHTML = minutes + ":" + seconds;
}

/** 
function increment()
{
    if(mode == 0) {
        focusTime += 10;
        startTime = focusTime;
        displayTime();
    }
    else if(mode == 1) {
        shortBreak += 10;
        startTime = shortBreak;
        displayTime();

    } else {
        longBreak += 10;
        startTime = longBreak;
        displayTime();
    }

}

function decrement()
{
    if(mode == 0) {
        focusTime -= 10;
        startTime = focusTime;
        displayTime();
    }
    else if(mode == 1) {
        shortBreak -= 10;
        startTime = shortBreak;
        displayTime();

    } else {
        longBreak -= 10;
        startTime = longBreak;
        displayTime();
    }
    
}
*/