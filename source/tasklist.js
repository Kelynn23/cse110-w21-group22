/**
 * The maximum amount of tasks that the user can have in the list
 * @type {number}
 */
const MAX_TASKLIST_SIZE = 20;
/**
 * The input field that the user enters the tasks in
 * @type {element}
 */
const input = document.getElementById('taskInput');
/**
 * The submit button that will submit the task the user has entered in the input field
 * @type {element}
 */
const addTaskButton = document.getElementById('addtask');
addTaskButton.addEventListener('click', addTask);

/**
 * The tasklist container
 * @type {element}
 */
const taskList = document.getElementById('tlist');

input.addEventListener("submit", function(event){
  event.preventDefault();
  addTask();
});


/**
 * Checks if the user has inputed a task in the input field and adds it to the tasklist
 */
function addTask() {
    //maximum size the tasklist can be is 20
  if (taskList.getElementsByTagName("LI").length >= MAX_TASKLIST_SIZE) {
    alert("You've got too many tasks.");
    document.getElementById("taskInput").reset();
    return;
  } 

  //get user input and append a list item containing that input
  let item = document.createElement('li');
  itemText = document.getElementById('task').value;
  item.classList.add('taskListEntry');
  //check to ensure field is not empty, null, undefined
  if (!itemText?.trim()) {
    document.getElementById("taskInput").reset();
    return;
  }
  item.innerHTML = itemText;

  item.addEventListener('click', function(item) { //onclick the entry delete itself
    let element = item.target;
    element.parentNode.removeChild(element);
  });

  taskList.appendChild(item); //add to list
  document.getElementById("taskInput").reset();
}
