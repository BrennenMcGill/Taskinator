var formEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

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

    var isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      }
    }

    // Send it as an arument
    createTaskEl(taskDataObj);

  }

  var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  }

  var createTaskEl = function(taskDataObj) {
    name: "Tasks Name";
    type: "Tasks type";
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl)

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
  }

  var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
      // create option element
      var statusOptionEl = document.createElement("option");
      statusOptionEl.textContent = statusChoices[i];
      statusOptionEl.setAttribute("value", statusChoices[i]);
      
      // append to select
      statusSelectEl.appendChild(statusOptionEl);
    }
    
    actionContainerEl.appendChild(editButtonEl);
    actionContainerEl.appendChild(deleteButtonEl);
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
  };

  var taskButtonHandler = function(event) {
    console.log(event.target);

    if (event.target.matches(".edit-btn")) {
      var taskId = event.target.getAttribute("data-task-id");
      editTask(taskId);
    }

    else if (event.target.matches(".delete-btn")) {
      var taskId = event.target.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

  var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
  }

  var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  }

  var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }
  };

  formEl.addEventListener("click", taskFormHandler);
  pageContentEl.addEventListener("click", taskButtonHandler);
  pageContentEl.addEventListener("change", taskStatusChangeHandler);