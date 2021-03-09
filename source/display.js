
/**
 * @file display.js deals with all the html stuff that needs be changed
 * @author group 22
 */

/**
 * Text element to display the time for the user
 * @type {element}
 */
const timerDisplay = document.getElementById('timerDisplay');
/**
 * Text element to display the current mode
 * @type {element}
 */
const modeDisplay = document.getElementById('modeDisplay');
/**
 * Button to start the timer
 * @type {element}
 */
const startBtn = document.getElementById('starttimer');
/**
 * Button to reset the timer
 * @type {element}
 */
const resetBtn = document.getElementById('resettimer');
/**
 * The tab display
 * @type {element}
 */
const pageTitle = document.getElementById('pageTitle');
/**
 * Text element to show pomos finished
 * @type {element}
 */
const pomosFinished = document.getElementById('complete');
/**
 * Button to open settings
 * @type {element}
 */
const settingsBtn = document.getElementById('settingsBtn');
/**
 * Button to open info
 * @type {element}
 */
const infoBtn = document.getElementById('infoBtn');

const audio = document.getElementById('audioNotification');

/**
 * Button to open info
 * @type {element}
 */
const darkModeBtn = document.getElementById('dark-mode');


/**
 * Updates the timer display so the user can see the time tickdown like a normal digital clock
 * @param {string} timeString - The formatted string with the minutes and seconds 
 */
export function displayTime(timeString) {
    timerDisplay.innerHTML = timeString;
}

/**
 * Updates the mode display so the user can see what mode they are currently on
 * @param {string} modeString - The current mode that will be displayed
 */
export function displayMode(modeString) {
    modeDisplay.innerHTML = modeString;
	if(darkModeBtn.checked) {
		if(modeString=='Focus') {
			document.getElementsByTagName('body')[0].setAttribute('id','dark-Focus');
		}
		else {
			document.getElementsByTagName('body')[0].setAttribute('id','dark-Break');
		}
	}
	else {
		if(modeString=='Focus') {
			document.getElementsByTagName('body')[0].setAttribute('id','Focus');
		}
		else {
			document.getElementsByTagName('body')[0].setAttribute('id','Break');
		}
	}
}

/**
 * Updates the text in the tab so the user can see the time tickdown like a normal digital clock and what mode they are currently on
 * @param {string} timeString - The formatted string with the minutes and seconds 
 * @param {string} modeString - The current mode that will be displayed
 */
export function displayTitle(timeString, modeString) {
    pageTitle.innerHTML = '(' + timeString + ') ' + modeString;
}

/**
 * Updates the text to display the number of pomos that the user has completed
 * @param {number} numPomos - The number of pomos that the user has completed
 */
export function displayPomosFinished(numPomos) {
    pomosFinished.innerHTML = numPomos + ' Pomos Finished';
}

/**
 * Updates the text in the tab with a notification to inform the user of changes
 * @param {string} notification - The text that will inform the user
 */
export function titleNotification(notification) {
    pageTitle.innerHTML = notification;
}

/**
 * Displays the reset button and hides the start button
 */
export function showResetBtn() {
    startBtn.style.display = "none";
    resetBtn.style.display = "initial";
}

/**
 * Displays the start button and hides the reset button
 */
export function showStartBtn() {
    startBtn.style.display = "initial";
    resetBtn.style.display = "none";
}

/**
 * 
 * @returns {string} display status of Start Button
 */
export function getStartBtnDisplay() {
  return startBtn.style.display;
}

/**
 * Displays the settings button
 */
export function showSettingsButton() {
    settingsBtn.style.display = "initial";
}

/**
 * 
 * @returns {string} display status of Settings Button
 */
 export function getSettingsBtnDisplay() {
  return settingsBtn.style.display;
}

/**
 * Displays the info button
 */
export function showInfoButton() {
    infoBtn.style.display = "initial";
}

/**
 * Hides the settings button
 */
export function hideSettingsButton() {
    settingsBtn.style.display = "none";
}

/**
 * Hides the info button
 */
export function hideInfoButton() {
    infoBtn.style.display = "none";
}

/**
 * Updates the audio source and plays the audio
 * @param {string} sourceFile - The file location of the audio that will be played
 */
export function playAudio(sourceFile) {
    audio.src = sourceFile;
    audio.play()
}