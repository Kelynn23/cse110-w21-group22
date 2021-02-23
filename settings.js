// variables for the modal and open/close buttons
const modal = document.getElementById("settingsContainer");
const settingsBtn = document.getElementById("settingsBtn");
const closeBtn = document.getElementsByClassName("close")[0];
const settingsForm = document.getElementById("time-settings");
const submitSettings = document.getElementById("settings-submit");

// open the modal when user clicks on settings button
settingsBtn.onclick = function() {
  modal.style.display = "block";
}

// close the modal when the close button is clicked
closeBtn.onclick = function() {
  submitSettings.click();
}

// close the modal when the user clicks outside the settings box
window.onclick = function(event) {
  if (event.target == modal) {
    submitSettings.click();
  }
}

// only allow user to close settings if all inputs are valid
// update time values when settings are closed
settingsForm.addEventListener("submit", function(event) {
  event.preventDefault();
  if (checkTimeInputs()) {
    modal.style.display = "none";
    updateTimes();
  }
});

// returns true if user inputs are valid, false otherwise
function checkTimeInputs() {
  let inputs = settingsForm.querySelectorAll("input[type='number']");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].checkValidity()) {
      return false;
    }
  }
  return true;
}

// update the times
function updateTimes() {
  // TODO: MULTIPLY THESE VALUES BY 60 TO GET THE ACTUAL TIME
  focusTime = document.getElementById('focus-time').value; 
  shortBreak = document.getElementById('short-break').value;
  longBreak = document.getElementById('long-break').value;
  pomoMode();
}
