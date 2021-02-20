const startButton = document.getElementById("starttimer");
startButton.addEventListener('click', startTimer);

const displayTimer = document.getElementById('timerDisplay');
const displayTitle = document.getElementById('pageTitle');
const autoStartSetting = document.getElementById('autostart');

/**const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);
*/
const DEFAULT_POMO_TIME = 1500; //25:00
const DEFAULT_BREAK_TIME = 300; //5:00
const DEFAULT_LONG_BREAK_TIME = 900; //15:00
const DEFAULT_POMOS_TO_BREAK = 4;

var numPomos = 0;
var timerInterval;
var mode = 0;
var modeStr = '';
var timerStatus = 0; //0 is not started, -1 is stopped, 1 is running
var focusTime = 10;
var shortBreak = 5;
var longBreak = 7;
var numPomosToLongBreak = 4;

var startTime = focusTime;

//start button behavior, checks if timer is running and toggles
function startTimer() {
    //timer is not running
    if(timerStatus == 0) {
        pomoMode();
        timerInterval = setInterval(timer, 1000);
        startButton.innerHTML = "Reset";
        //timer is now running, set flag
        timerStatus = 1;
    }
        resetTimer();
        pomoMode();
    }
}

//resets the timer to original time and mode to work time
function resetTimer() {
    clearInterval(timerInterval);
    startTime = focusTime;
    modeStr = 'Working';
    displayTime();
    timerStatus = 0;
    startButton.innerHTML = "Start";
}

//sets the timer to a different value based on what triggered the change
//only allows changes when timer is not running
function setTimer(operation) {
  //timer is running, do not allow changes
  if(timerStatus != 0) {
    console.log("timer is running, disabled setting time");
    return;
  }

  if(operation == "increment") {
      focusTime += 60;
  }
  else if (operation == "decrement") {
      if(focusTime > 60) {
          focusTime -=60;
      }
      else {
          focusTime = 0;
      }
  }

  startTime = focusTime;
  //redraw the time
  displayTime();
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

        //notification to users at session end
        if(mode == 0){
            displayTitle.innerHTML = 'Work Session Ended';
            /* only create an alert if AutoStart is turned off, 
               (the next round won't start until the user manually accepts the alert) */
            if(!autoStartSetting.checked) {
                alert('Work Session Ended');
            }
        }
        else if(mode == 1){
            displayTitle.innerHTML = 'Short Break Ended';
            /* only create an alert if AutoStart is turned off, 
               (the next round won't start until the user manually accepts the alert) */
            if(!autoStartSetting.checked) {
                alert('Short Break Ended');
            }
        }
        else{
            displayTitle.innerHTML = 'Long Break Ended';
            /* only create an alert if AutoStart is turned off, 
               (the next round won't start until the user manually accepts the alert) */
            if(!autoStartSetting.checked) {
                alert('Long Break Ended');
            }
        }

        //working -> long break
        if(numPomos % numPomosToLongBreak == numPomosToLongBreak - 1 
            && mode == 0) {
            mode = 2;
            //display the time for next mode
            pomoMode(); 
        }
        //short break -> working
        else if(mode == 1) {
            //increment numPomos after short break
            numPomos += 1;
            document.getElementById('complete').innerHTML = numPomos + " Pomos Finished";
            mode = 0;
            //display the time for next mode
            pomoMode();
        }
        else {
            //working -> short break
            if(mode == 0){
                mode = 1;
                pomoMode();
            }
            //long break -> working
            else{
                //increment numPomos after long break
                numPomos += 1;
                document.getElementById('complete').innerHTML = numPomos + " Pomos Finished";
                mode = 0;
                pomoMode();
            }
        }

        // Start the next round if the AutoStart Setting is turned on
        if(autoStartSetting.checked) {
            startTimer();
        }
    }
}

//To set mode for the next round of timer
//0: work, 1: short break, 2:long break
function pomoMode()
{
    if(mode == 0) {
        startTime = focusTime;
        modeStr = 'Working';
        displayTime();
    }
    else if(mode == 1) {
        startTime = shortBreak;
        modeStr = 'Short Break';
        displayTime();
    } 
    else {
        startTime = longBreak;
        modeStr = 'Long Break';
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