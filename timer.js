const startButton = document.getElementById("starttimer");
startButton.addEventListener('click', startTimer);

const displayTimer = document.getElementById('timerDisplay');
//const incrementButton = document.getElementById('increment');
//const decrementButton = document.getElementById('decrement');
//incrementButton.addEventListener('click', increment);
//decrementButton.addEventListener('click', decrement);

var numPomos = 0;
var timerInterval;
var startTime = 0;
var mode = 0;
var focusTime = 10;
var shortBreak = 5;
var longBreak = 7;

function startTimer() {
    //display time and countdown from that time
    pomoMode();
    timerInterval = setInterval(timer, 1000);
    //change button icon
    startButton.innerHTML = "Reset";
    //when time is 00:00 => notification 
}

function timer()
{
    startTime -= 1;
    displayTime();
    if(startTime == 0)
    {
        clearInterval(timerInterval);
        startButton.innerHTML = "Start";
        if(numPomos != 0 && numPomos % 4 == 0)
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

        startTimer();
        //reset startTime
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

/*
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