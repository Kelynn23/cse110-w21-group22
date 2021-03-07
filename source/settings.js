/**
 * @file checks for user input in the settings and makes changes based on it
 * @author group 22
 */

// variables for the modal and open/close buttons

/**
 * The settings box
 * @type {element}
 */
const modal = document.getElementById("settingsContainer");
/**
 * Setting button
 * @type {element}
 */
const settingsBtn = document.getElementById("settingsBtn");
/**
 * Close setting button
 * @type {element}
 */
const closeBtn = document.getElementsByClassName("close")[0];
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

var updateTimes = function() {};

/**
 * Sets up the settings menu so it is ready to be used
 * @param {function} callback 
 */
export function setUpSettings(callback) {
  updateTimes = callback;
  settingsBtn.onclick = displayModal;
  closeBtn.onclick = submitSettings;
  window.onclick = clickOutsideModal;
  settingsForm.addEventListener("submit", validation);
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
 * Opens the modal
 */
function displayModal() {
  modal.style.display = "block";
}

/**
 * Closes the modal
 */
function closeModal() {
  modal.style.display = "none";
}


/**
 * Submit user inputs when the user clicks outside the settings box
 * @param {*} event - Event that is triggered
 */
function clickOutsideModal(event) {
  if (event.target == modal) {
    submitSettings();
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





