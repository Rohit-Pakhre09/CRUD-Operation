const btn = document.getElementById("btn");
let input = document.getElementById("input");
let msg = document.getElementById("guide-msg");
let notesMsg = document.querySelector("#note-title");
let isEdit = false;
let replace = null;
let notes = [];

function saveNote() {
  localStorage.setItem("Notes", JSON.stringify(notes));
}

function loadNote() {
  const saved = localStorage.getItem("Notes");
  if (saved) {
    notes = JSON.parse(saved);
    document.querySelector(".tasks").innerHTML = "";
    notes.forEach((note) => addNote(note));
    updateMsg();
  }
}

function addNote(value) {
  let main = document.createElement("div");
  main.className = "main";
  main.dataset.value = value;

  let noteText = document.createElement("span");
  noteText.textContent = value;

  let icon = document.createElement("div");
  icon.className = "icon-container";

  let edit = document.createElement("i");
  edit.classList = "fa-duotone fa-solid fa-pencil";

  let trash = document.createElement("i");
  trash.classList = "fa-duotone fa-solid fa-trash";

  edit.addEventListener("click", () => {
    input.value = main.dataset.value;
    replace = main;
    isEdit = true;

    msg.textContent = "Press Enter after Editing the Value!";
    msg.style.color = "green";

    noteText.style.opacity = "0.6";
    noteText.style.fontStyle = "italic";

    trash.style.pointerEvents = "none";
    trash.style.cursor = "not-allowed";
  });

  trash.addEventListener("click", () => {
    let index = notes.indexOf(main.dataset.value);
    if (index !== -1) {
      notes.splice(index, 1);
      main.remove();
      saveNote();
      updateMsg();
    }
  });

  icon.append(edit, trash);
  main.append(noteText, icon);
  document.querySelector(".tasks").prepend(main);
}

btn.addEventListener("click", () => {
  let value = input.value.trim();
  if (!value) {
    msg.textContent = "*Please fill the input first!";
    return;
  }

  if (isEdit && replace !== null) {
    let oldValue = replace.dataset.value;
    let index = notes.indexOf(oldValue);

    if (index !== -1) {
      notes[index] = value;
      replace.dataset.value = value;

      let noteText = replace.querySelector("span");
      if (noteText) {
        noteText.textContent = value;
        noteText.style.opacity = "1";
        noteText.style.fontStyle = "normal";
      }

      let trashEl = replace.querySelector(".fa-trash");
      if (trashEl) {
        trashEl.style.pointerEvents = "auto";
        trashEl.style.cursor = "pointer";
      }

      isEdit = false;
      replace = null;
      saveNote();
    }
  } else {
    notes.push(value);
    addNote(value);
    saveNote();
  }

  input.value = "";
  msg.textContent = "";
  updateMsg();
});

function updateMsg() {
  if (notes.length === 0) {
    notesMsg.innerText = "No Notes are available.";
    notesMsg.style.color = "grey";
  } else {
    notesMsg.innerText = "Notes are available here!";
    notesMsg.style.color = "green";
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

loadNote();
