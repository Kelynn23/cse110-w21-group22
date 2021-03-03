
const timerDisplay = document.getElementById('timerDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const startBtn = document.getElementById('starttimer');
const resetBtn = document.getElementById('resettimer');
const pageTitle = document.getElementById('pageTitle');
const pomosFinished = document.getElementById('complete');

const settingsBtn = document.getElementById('settingsBtn');


export function displayTime(timeString) {
    timerDisplay.innerHTML = timeString;
}

export function displayMode(modeString) {
    modeDisplay.innerHTML = modeString;
}

export function displayTitle(timeString, modeString) {
    pageTitle.innerHTML = '(' + timeString + ') ' + modeString;
}

export function displayPomosFinished(numPomos) {
    pomosFinished.innerHTML = numPomos + ' Pomos Finished';
}

export function titleNotification(notification) {
    pageTitle.innerHTML = notification;
}

export function showResetBtn() {
    startBtn.style.display = "none";
    resetBtn.style.display = "initial";
}

export function showStartBtn() {
    startBtn.style.display = "initial";
    resetBtn.style.display = "none";
}

export function showSettingsButton() {
    settingsBtn.style.display = "initial";
}

export function hideSettingsButton() {
    settingsBtn.style.display = "none";
}

