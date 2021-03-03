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

const focusTimeInput = document.getElementById('focus-time');

const shortBreakTimeInput = document.getElementById('short-break');

const longBreakTimeInput = document.getElementById('long-break');

const autoStartSetting = document.getElementById('autostart');

var updateTimes = function() {};

export function setUpSettings(callback) {
  updateTimes = callback;
  settingsBtn.onclick = displayModal;
  closeBtn.onclick = submitSettings;
  window.onclick = clickOutsideModal;
  settingsForm.addEventListener("submit", validation);
}

export function getFocusTime() {
  return focusTimeInput.value; // TODO: MULTIPLY BY 60 TO GET THE ACTUAL TIME
}

export function getShortBreakTime() {
  return shortBreakTimeInput.value; // TODO: MULTIPLY BY 60 TO GET THE ACTUAL TIME
}

export function getLongBreakTime() {
  return longBreakTimeInput.value; // TODO: MULTIPLY BY 60 TO GET THE ACTUAL TIME
}

export function autoStartOn() {
  return autoStartSetting.checked;
}

/**
 * open the modal
 */
function displayModal() {
  modal.style.display = "block";
}

// close the modal
function closeModal() {
  modal.style.display = "none";
}

// submit user inputs when the user clicks outside the settings box
function clickOutsideModal(event) {
  if (event.target == modal) {
    submitSettings();
  }
}

// submit the form containing the time inputs
function submitSettings() {
  submitBtn.click();
}

// only allow user to close settings if all inputs are valid
// update time values when settings are closed
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
  }
  else if (!shortBreakTimeInput.checkValidity()) {
    valid = false;
  }
  else if (!longBreakTimeInput.checkValidity()) {
    valid = false;
  }

  return valid;
}





