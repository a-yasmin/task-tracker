const fs = require("fs");

const JSON_FILE_PATH = "tasks.json";

function initFile() {
  if (!fs.existsSync(JSON_FILE_PATH)) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify([], null, 2));
  }
}

// generate unique identifier
function generateUniqueID(tasks) {
  return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
}

// read tasks
function readTasks() {
  initFile();
  const data = fs.readFileSync(JSON_FILE_PATH, "utf8");
  return JSON.parse(data);
}

// save tasks
function saveTasks(tasks) {
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(tasks, null, 2));
}

// add new task
function addTask(description) {
  if (!description) {
    return console.log("The description of the task is required.");
  }

  const tasks = readTasks();

  const newData = {
    id: generateUniqueID(tasks),
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newData);
  //save data
  saveTasks(tasks);
  console.log("New task successfully added!");
}

// update existing task
function updateTask(id, description) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return console.log("Invalid ID. Task could not be retrieve.");
  }

  if (!description) {
    return console.log("The description of the task is required.");
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();

  //save data
  saveTasks(tasks);
  console.log("Task successfully updated!");
}

// delete a task from list
function deleteTask(id) {
  let tasks = readTasks();

  const newTasks = tasks.filter((t) => t.id !== Number(id));

  if (tasks.length === newTasks.length) {
    return console.log("Task could not found.");
  }

  saveTasks(newTasks);
  console.log("Task is successfully deleted.");
}

function markTask(id, status) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return console.log("Invalid ID, task could not be found.");
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  // save data
  saveTasks(tasks);
  console.log("Task successfully updated!");
}

// list all tasks or by status
function listTasks(status) {
  const tasks = readTasks();

  let filteredTasks = tasks;

  if (status === "done" || status === "in-progress" || status === "todo") {
    filteredTasks = tasks.filter((t) => t.status === status);
  }

  if (!Array.isArray(filteredTasks) || filteredTasks.length === 0) {
    console.log("\nNo tasks found.");
    return;
  }

  // Display tasks in table format: id | description | status
  console.log("\nTasks:\n");

  console.log("ID | Description | Status");
  console.log("------------------------------");
  filteredTasks.forEach((t) => {
    console.log(`${t.id} | ${t.description} | ${t.status}`);
  });
}

// -------- CLI HANDLER ---------

const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    addTask(args.join(" "));
    break;

  case "update":
    updateTask(args[0], args.slice(1).join(" "));
    break;

  case "delete":
    deleteTask(args[0]);
    break;

  case "mark-in-progress":
    markTask(args[0], "in-progress");
    break;

  case "mark-done":
    markTask(args[0], "done");
    break;

  case "list":
    listTasks(args[0]);
    break;
}
