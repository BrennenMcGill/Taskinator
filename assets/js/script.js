var formEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function() {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name = 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    if (!taskNameInput || !taskTypeInput) {
      alert("You fill out the task form!");
      return false;
    }

    formEl.reset();

    // Send it as an arument
    createTaskEl(taskDataObj);

  }

  var createTaskEl = function(taskDataObj) {
    name: "Tasks Name";
    type: "Tasks type";
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
  }

  formEl.addEventListener("click", taskFormHandler);