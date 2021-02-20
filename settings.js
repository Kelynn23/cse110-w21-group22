
// variables for the modal and open/close buttons
var modal = document.getElementById("settingsContainer");
var settingsBtn = document.getElementById("settingsBtn");
var closeBtn = document.getElementsByClassName("close")[0];

// open the modal when user clicks on settings button
settingsBtn.onclick = function() {
  modal.style.display = "block";
}

// close the modal when the close button is clicked
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// close the modal when the user clicks outside the settings box
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}