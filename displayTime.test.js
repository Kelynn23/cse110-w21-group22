// Unsure how to use displayTime() from timer.js to give 
// me the time so instead I am first checking to see if 
// the default "Group22Pomo is NOT the time

const browserTitleCheck = require("./timer");
test("The running time is the browser title", () => {
    expect(displayTime().is("Group22Pomo").toBe(false))
});


const htmlTitleCheck = require("./index");
test("The running time is the browser title", () => {
    expect(pageTitle().is("Group22Pomo").toBe(false))
});

/*
test('map calls its argument with a non-null argument', () => {
    const mock = jest.fn();
    [1].map(x => mock(x));
    expect(mock).toBeCalledWith(expect.anything());
  });
  */

/*
function displayTime() {
    let seconds = startTime % 60;
    let minutes = Math.floor((startTime / 60));

    if(seconds < 10) seconds = '0' + seconds;
    if(minutes < 10) minutes = '0' + minutes;

    displayTimer.innerHTML = minutes + ":" + seconds;
    displayTitle.innerHTML = '(' + minutes + ':' + seconds + ')' + modeStr;
}
*/