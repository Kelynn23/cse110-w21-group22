/**
 * @file checks for user input in the settings and makes changes based on it also controls the open and close function of the help modal
 * @author group 22
 */

// variables for the modal and open/close buttons

/**
 * The settings box
 * @type {element}
 */
const modal = document.getElementById("settingsContainer");
/**
 * The info box
 * @type {element}
 */
const infoModal = document.getElementById("infoContainer");
/**
 * Setting button
 * @type {element}
 */
const settingsBtn = document.getElementById("settingsBtn");
/**
 * Setting button
 * @type {element}
 */
const infoBtn = document.getElementById("infoBtn");
/**
 * Close setting button
 * @type {element}
 */
const closeBtn = document.getElementsByClassName("close")[1];
/**
 * Close info button
 * @type {element}
 */
const closeBtnInfo = document.getElementsByClassName("close")[0];
/**
 * Form for setting inputs
 * @type {element}
 */
const settingsForm = document.getElementById("time-settings");
/**
 * Save settings button
 * @type {element}
 */
const submitBtn = document.getElementById("settings-submit");

/**
 * Gets input for focus time
 * @type {element}
 */
const focusTimeInput = document.getElementById('focus-time');

/**
 * Gets input for short break
 * @type {element}
 */
const shortBreakTimeInput = document.getElementById('short-break');

/**
 * Gets input for long break
 * @type {element}
 */
const longBreakTimeInput = document.getElementById('long-break');

/**
 * Auto start toggle
 * @type {element}
 */
const autoStartSetting = document.getElementById('autostart');

/**
 * Mute toggle
 * @type {element}
 */
 const muteSetting = document.getElementById('mute');


/**
 * Get user input for voice sound
 * @type {element}
 */
const voiceSound = document.getElementById('radio-voice');

/**
 * Get user input for ding sound
 * @type {element}
 */
const dingSound = document.getElementById('radio-ding');
/*
 * Auto start toggle
 * @type {element}
 */
 const darkModeBtn = document.getElementById('dark-mode');


var updateTimes = function() {};

/**
 * Sets up the settings menu so it is ready to be used
 * @param {function} callback 
 */
export function setUpSettings(callback) {
  updateTimes = callback;
  settingsBtn.onclick = displayModal;
  infoBtn.onclick = displayInfoModal;
  closeBtn.onclick = submitSettings;
  closeBtnInfo.onclick = closeInfoModal;
  window.onclick = clickOutsideModal;
  settingsForm.addEventListener("submit", validation);
  darkModeBtn.onclick = switchDarkMode;
}

/**
 * Sends the user input for the focus time to the controller
 * @return {number} - The user's desired focus time
 */
export function getFocusTime() {
  return focusTimeInput.value; // TODO: MULTIPLY BY 60 TO GET THE ACTUAL TIME
}

/**
 * Sends the user input for the short break to the controller
 * @return {number} - The user's desired short break
 */
export function getShortBreakTime() {
  return shortBreakTimeInput.value; // TODO: MULTIPLY BY 60 TO GET THE ACTUAL TIME
}

/**
 * Sends the user input for the long break to the controller
 * @return {number} - The user's desired long break
 */
export function getLongBreakTime() {
  return longBreakTimeInput.value; // TODO: MULTIPLY BY 60 TO GET THE ACTUAL TIME
}

/**
 * Sends the user input to see if they want auto start on or off
 * @return {boolean} - True if they want it is on, false if they want it off
 */
export function autoStartOn() {
  return autoStartSetting.checked;
}

/**
 * Sends the user input to see if they want to mute
 * @return {boolean} - True if they want to mute, false if they do not want to mute
 */
 export function muteOn() {
  return muteSetting.checked;
}

/**
 * Sends the user input to see if they want voice sound on or off
 * @return {boolean} - True if they want it is on, false if they want it off
 */
export function voiceSoundOn() {
  return voiceSound.checked;
}

/**
 * Sends the user input to see if they want ding sound on or off
 * @return {boolean} - True if they want it is on, false if they want it off
 */
export function dingSoundOn() {
  return dingSound.checked;
}


/**
 * Opens the modal
 * Opens the settings modal
 */
export function displayModal() {
  modal.style.display = "block";
}

/**
 * @returns {string} display status of Settings Modal
 */
export function getModalDisplay() {
  return modal.style.display;
}

/**
 * Opens the info modal
 */
function displayInfoModal() {
  infoModal.style.display = "block";
}

/**
 * Closes the settings modal
 */
export function closeModal() {
  modal.style.display = "none";
}

/**
 * Closes the info modal
 */
function closeInfoModal() {
  infoModal.style.display = "none";
}

/**
 * @returns {string} display status of Settings Modal
 */
export function getInfoModalDisplay() {
  return infoModal.style.display;
}

/**
 * Submit user inputs when the user clicks outside the settings box
 * @param {*} event - Event that is triggered
 */
function clickOutsideModal(event) {
  if (event.target == modal || event.target == infoModal) {
    submitSettings(); /* IT WORKS */
  }
}

/**
 * Submit the form containing the time inputs
 */
function submitSettings() {
  submitBtn.click();
}


/**
 * Only allow user to close settings if all inputs are valid,
 * updates time values when settings is closed
 * @param {*} event - Event that is triggered
 */
function validation(event) {
  event.preventDefault();
  if (checkTimeInputs()) {
    closeModal();
    closeInfoModal();
    updateTimes();
  }
}

/**
 * Checks the user inputs to see if they are all valid
 * @return {boolean} - true if valid, false otherwise
 */
function checkTimeInputs() {
  let valid = true;

  if (!focusTimeInput.checkValidity()) {
    valid = false;
  } else if (!shortBreakTimeInput.checkValidity()) {
    valid = false;
  } else if (!longBreakTimeInput.checkValidity()) {
    valid = false;
  }

  return valid;
}


/**
 * Changes the css so the it has dark colors
 */
function switchDarkMode() {

  if (darkModeBtn.checked) {
	  document.getElementsByTagName('header')[0].setAttribute('id','dark');
	  document.getElementsByClassName('complete')[0].setAttribute('id','dark');
	  document.getElementsByClassName('timercontainer')[0].setAttribute('id','dark');
	  document.getElementsByClassName('tasklist')[0].setAttribute('id','dark');
	  document.getElementsByClassName('logo')[0].setAttribute('id','dark');
	  if (document.getElementsByTagName('body')[0].getAttribute('id')=='Focus') {
		  document.getElementsByTagName('body')[0].setAttribute('id','dark-Focus');
	  } else {
		  document.getElementsByTagName('body')[0].setAttribute('id','dark-Break');
	  }
  } else {
    document.getElementsByClassName('complete')[0].setAttribute('id','');
	  document.getElementsByTagName('header')[0].setAttribute('id','');
	  document.getElementsByClassName('timercontainer')[0].setAttribute('id','');
	  document.getElementsByClassName('tasklist')[0].setAttribute('id','');
	  document.getElementsByClassName('logo')[0].setAttribute('id','');
	  if (document.getElementsByTagName('body')[0].getAttribute('id')=='dark-Focus') {
		  document.getElementsByTagName('body')[0].setAttribute('id','Focus');
	  } else {
		  document.getElementByTagName('body')[0].setAttribute('id','Break');
	  }
  }
}





