const MAX_TASKLIST_SIZE = 20;
const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addtask');
addTaskButton.addEventListener('click', addTask);

const taskList = document.getElementById('tlist');

function addTask() {
  //press to show input field
  //if(window.getComputedStyle(input).getPropertyValue('display') == "none") {
    //maximum size the tasklist can be is 20
    if(taskList.getElementsByTagName("LI").length > MAX_TASKLIST_SIZE) {
      alert("You've got too many tasks.");
      return;
    }
    //input.style.display = "block";
  //}
  //press after input given
  else {  
    //get user input and append a list item containing that input
    let item = document.createElement('li');
    itemText = document.getElementById('task').value;
    //check to ensure field is not empty
    if(itemText === '' || itemText === null || itemText === ' ') {
      return;
    }
    item.innerHTML = itemText;
    item.addEventListener('click', function(item) { //onclick the entry will strikethrough
      //item.classList.add('taskclicked');
      let element = item.target;
      element.parentNode.removeChild(element);
    });

    taskList.appendChild(item); //add to list
    document.getElementById("taskInput").reset();
    //input.style.display = "none"; //hide input field
  }
}
