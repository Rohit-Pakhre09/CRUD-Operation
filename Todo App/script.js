const input = document.getElementById("input");
const btn = document.getElementById("btn");
let msg = document.getElementById("guide-msg");
let taskMsg = document.getElementById("task-title");
let todos = [];
let replaceText = null;
let isEdit = false;
let editIndex = null;

// Local Storage.
function saveTodos() {
  localStorage.setItem("Todos", JSON.stringify(todos));
}

function loadTodos() {
  let saved = localStorage.getItem("Todos");
  if (saved) {
    todos = JSON.parse(saved);
    todos.forEach((todo) => addtask(todo));
    updateText();
  }
}

// Main Function.
function addtask(value) {
  let tasks = document.getElementById("tasks");

  // Main Container.
  let newtask = document.createElement("div");
  newtask.className = "new-task";

  // Text Container.
  let textContainer = document.createElement("div");
  textContainer.className = "text-container";

  // Checkbox.
  let checkbox = document.createElement("div");
  checkbox.className = "checkbox";

  // Task Text.
  let text = document.createElement("p");
  text.className = "taskName";
  text.textContent = value.trim();

  // Append checkbox & text.
  textContainer.append(checkbox, text);

  // Icon Container.
  let iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  // Icon.
  let icon = document.createElement("div");
  icon.className = "icon";

  // Edit.
  let editEl = document.createElement("i");
  editEl.className = "fa-solid fa-pencil edit";

  // Trash.
  let trashEl = document.createElement("i");
  trashEl.className = "fa-solid fa-trash";

  // Toggle.
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle("active");

    if (checkbox.classList.contains("active")) {
      text.style.textDecoration = "line-through";
      text.style.color = "grey";
      newtask.style.backgroundColor = "rgb(216, 216, 216)";
      editEl.style.color = "grey";
      text.style.fontStyle = "italic";
      text.style.transition = "all .2s ease-in-out";
      editEl.style.cursor = "no-drop";
    } else {
      text.style.textDecoration = "none";
      text.style.fontStyle = "normal";
      text.style.color = "black";
      newtask.style.backgroundColor = "lightgoldenrodyellow";
      editEl.style.color = "red";
      editEl.style.pointerEvents = "auto";
      editEl.style.cursor = "pointer";
    }
  });

  // Edit Logic
  editEl.addEventListener("click", () => {
    input.value = text.textContent.trim();
    isEdit = true;
    replaceText = text;
    editIndex = todos.indexOf(text.textContent.trim());

    text.innerText = "loading...";
    text.style.color = "grey";
    msg.innerText = "Press Enter after editing the task.";

    // Disable checkbox and trash during editing
    checkbox.style.pointerEvents = "none";
    checkbox.style.cursor = "no-drop";
    trashEl.style.pointerEvents = "none";
    trashEl.style.cursor = "no-drop";
  });

  // Delete Logic
  trashEl.addEventListener("click", () => {
    let index = todos.indexOf(value);
    if (index !== -1) {
      todos.splice(index, 1);
      saveTodos();
    }

    newtask.remove();
    console.log(todos);
    updateText();
  });

  // Time.
  let time = document.createElement("p");
  time.className = "time";

  // Date.
  let currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Time.
  let currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Date & Time.
  time.innerText = `${currentDate} – ${currentTime}`;

  // Append icons & time.
  icon.append(editEl, trashEl);
  iconContainer.append(icon, time);

  newtask.append(textContainer, iconContainer);
  tasks.prepend(newtask);

  saveTodos();
}

// Task Title.
function updateText() {
  if (todos.length === 0) {
    taskMsg.textContent = "No Plans created yet!";
    taskMsg.style.color = "grey";
  } else {
    taskMsg.textContent = "Here are the tasks to do!";
    taskMsg.style.color = "green";
  }
}

// Start Function.
btn.addEventListener("click", () => {
  let value = input.value.trim();

  if (!value) {
    msg.textContent = "Please fill the input first!";
    return;
  }

  if (isEdit && replaceText !== null && editIndex !== null) {
    replaceText.innerText = value;
    replaceText.style.color = "black";
    todos[editIndex] = value;
    saveTodos();

    // Re-enable the checkbox and trash icon after editing
    let parent = replaceText.closest(".new-task");
    if (parent) {
      const checkbox = parent.querySelector(".checkbox");
      const trashEl = parent.querySelector(".fa-trash");
      if (checkbox && trashEl) {
        checkbox.style.pointerEvents = "auto";
        checkbox.style.cursor = "pointer";
        trashEl.style.pointerEvents = "auto";
        trashEl.style.cursor = "pointer";
      }
    }

    input.value = "";
    msg.textContent = "";
    isEdit = false;
    replaceText = null;
    editIndex = null;
    updateText();
  } else {
    todos.push(value);
    addtask(value);
    input.value = "";
    msg.textContent = "";
    updateText();
  }
});

// Enter Event.
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    btn.click();
  }
});

// Page Loading.
window.onload = loadTodos;
