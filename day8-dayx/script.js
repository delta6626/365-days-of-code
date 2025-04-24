const createTaskButton = document.querySelector(".createTask");
const pendingTasksButton = document.querySelector(".pendingTasks");
const completedTasksButton = document.querySelector(".completedTasks");
const deletedTasksButton = document.querySelector(".deletedTasks");

const contentTitle = document.querySelector(".title");
const taskArea = document.querySelector(".taskArea");

const addTaskModal = document.querySelector(".addTaskModal");
const taskTitleInput = document.querySelector("#taskTitle");
const taskContentInput = document.querySelector("#taskContent");

const addTaskToListButton = document.querySelector(".addTaskToListButton");
const closeModalButton = document.querySelector(".closeModalButton");

let tasks = [];

function setStatusToCompleted(taskId) {
  tasks[taskId].status = "completed";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showPendingTasks();
}

function setStatusToDeleted(taskId) {
  tasks[taskId].status = "deleted";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showPendingTasks();
}

function setStatusToPending(taskId) {
  tasks[taskId].status = "pending";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showPendingTasks();
}

function deleteTaskForever(taskId) {
  tasks.splice(taskId, 1); // Remove the task from the array
  tasks.forEach((task, index) => (task.id = index)); // Reindex remaining tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showDeletedTasks();
}

function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("id", task.id);

  const taskData = document.createElement("div");
  taskData.classList.add("taskData");

  const title = document.createElement("h3");
  title.classList.add("taskTitle");
  title.textContent = task.title;
  title.setAttribute("title", task.title);

  const text = document.createElement("p");
  text.classList.add("taskText");
  text.textContent = task.content || "";

  taskData.appendChild(title);
  taskData.appendChild(text);

  const actions = document.createElement("div");
  actions.classList.add("taskActionButtons", "flex");

  if (task.status === "pending") {
    const completeButton = document.createElement("button");
    completeButton.classList.add("completeTask");
    completeButton.innerHTML = `<i data-lucide="check"></i>`;
    completeButton.setAttribute("title", "Mark as completed");
    completeButton.addEventListener("click", () =>
      setStatusToCompleted(task.id)
    );

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteTask");
    deleteButton.innerHTML = `<i data-lucide="trash"></i>`;
    deleteButton.setAttribute("title", "Delete task");
    deleteButton.addEventListener("click", () => setStatusToDeleted(task.id));

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
  } else if (task.status === "completed") {
    const toPendingButton = document.createElement("button");
    toPendingButton.classList.add("changeToPending");
    toPendingButton.innerHTML = `<i data-lucide="undo-2"></i>`;
    toPendingButton.setAttribute("title", "Undo task");
    toPendingButton.addEventListener("click", () =>
      setStatusToPending(task.id)
    );

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteTask");
    deleteButton.innerHTML = `<i data-lucide="trash"></i>`;
    deleteButton.setAttribute("title", "Delete task");
    deleteButton.addEventListener("click", () => setStatusToDeleted(task.id));

    actions.appendChild(toPendingButton);
    actions.appendChild(deleteButton);
  } else if (task.status === "deleted") {
    const restoreButton = document.createElement("button");
    restoreButton.classList.add("restoreTask");
    restoreButton.innerHTML = `<i data-lucide="archive-restore"></i>`;
    restoreButton.setAttribute("title", "Restore task");
    restoreButton.addEventListener("click", () => setStatusToPending(task.id));

    const deleteForeverButton = document.createElement("button");
    deleteForeverButton.classList.add("deleteTaskForever");
    deleteForeverButton.innerHTML = `<i data-lucide="trash"></i>`;
    deleteForeverButton.setAttribute("title", "Delete forever");
    deleteForeverButton.addEventListener("click", () =>
      deleteTaskForever(task.id)
    );

    actions.appendChild(restoreButton);
    actions.appendChild(deleteForeverButton);
  }

  taskDiv.appendChild(taskData);
  taskDiv.appendChild(actions);
  taskArea.appendChild(taskDiv);

  lucide.createIcons();
}

function showDeletedTasks() {
  contentTitle.innerText = "Deleted Tasks";
  taskArea.innerHTML = "";
  tasks.forEach((task) => {
    if (task.status === "deleted") renderTask(task);
  });
}

function showCompletedTasks() {
  contentTitle.innerText = "Completed Tasks";
  taskArea.innerHTML = "";
  tasks.forEach((task) => {
    if (task.status === "completed") renderTask(task);
  });
}

function showPendingTasks() {
  contentTitle.innerText = "Pending Tasks";
  taskArea.innerHTML = "";
  tasks.forEach((task) => {
    if (task.status === "pending") renderTask(task);
  });
}

function addNewTask() {
  const taskTitle = taskTitleInput.value.trim();
  const taskContent = taskContentInput.value.trim();

  if (taskTitle.length < 2) {
    alert("Task title must be at least 2 characters.");
    return;
  }

  const newTask = {
    id: tasks.length,
    title: taskTitle,
    content: taskContent,
    status: "pending",
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showPendingTasks();

  // Reset modal
  taskTitleInput.value = "";
  taskContentInput.value = "";
  addTaskModal.close();
}

function createNewTask() {
  addTaskModal.show();
}

function closeModal() {
  addTaskModal.close();
}

function initializeApp() {
  lucide.createIcons();
  const data = localStorage.getItem("tasks");

  if (!data) {
    tasks = [];
  } else {
    try {
      tasks = JSON.parse(data);
      tasks.forEach((task, index) => (task.id = index)); // Ensure IDs are synced
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      tasks = [];
    }
  }

  showPendingTasks();
}

// Event Listeners
createTaskButton.addEventListener("click", createNewTask);
addTaskToListButton.addEventListener("click", addNewTask);
closeModalButton.addEventListener("click", closeModal);
pendingTasksButton.addEventListener("click", showPendingTasks);
completedTasksButton.addEventListener("click", showCompletedTasks);
deletedTasksButton.addEventListener("click", showDeletedTasks);
window.addEventListener("load", initializeApp);
