const form = document.getElementById("planner-form");
const taskList = document.getElementById("task-list");
const datePicker = document.getElementById("datePicker");
const selectedDateHeading = document.getElementById("selected-date");

// Set today's date in date picker
const today = new Date().toISOString().split("T")[0];
datePicker.value = today;
selectedDateHeading.textContent = `Tasks for ${today}`;

document.addEventListener("DOMContentLoaded", loadTasks);

datePicker.addEventListener("change", () => {
  selectedDateHeading.textContent = `Tasks for ${datePicker.value}`;
  renderTasks();
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const time = document.getElementById("time").value;
  const task = document.getElementById("task").value;
  const priority = document.getElementById("priority").value;
  const date = datePicker.value;

  if (time && task) {
    addTaskToList(time, task, priority, date);
    saveTask(time, task, priority, date);
    form.reset();
  }
});

function addTaskToList(time, task, priority, date) {
  const li = document.createElement("li");
  li.classList.add(priority);
  li.innerHTML = `
    <div class="task-info">
      <span class="task-time">${time}</span>
      <span class="task-text">${task}</span>
    </div>
    <button class="delete-btn">Delete</button>
  `;

  taskList.appendChild(li);

  li.querySelector(".delete-btn").addEventListener("click", function() {
    li.remove();
    removeTask(time, task, priority, date);
  });
}

function saveTask(time, task, priority, date) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({time, task, priority, date});
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentDate = datePicker.value;

  tasks
    .filter(t => t.date === currentDate)
    .forEach(t => addTaskToList(t.time, t.task, t.priority, t.date));
}

function removeTask(time, task, priority, date) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => !(t.time === time && t.task === task && t.date === date));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
