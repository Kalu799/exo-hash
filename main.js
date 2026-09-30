// DOM

const $noteWrapper = document.querySelector('#note_wrapper')
const $newNoteForm = document.querySelector('#newNote-form')

// VAR / CONST

let savedData = ''

let notreListe = [
]

// FCT

const affichageNotes = () => {
  $noteWrapper.innerHTML = ``
  Object.values(notreListe).map((item, key) => {
    $noteWrapper.innerHTML +=
      `
    <li id="${key}">${item.note} <button class="noteDelete" data-key="${key}">🗑️</button></li>
      `
  });
};

const AddNote = (event) => {
  event.preventDefault();

  let pushForm = new FormData($newNoteForm);
  data = Object.fromEntries(pushForm.entries());
  notreListe.push(data);

  affichageNotes()
  //console.log(notreListe)
  //console.log("not")

  Sync()
}

//Delete

const deleteNote = (e) => {
  
  if (!e.target.classList.contains("noteDelete")) {
    return
  }
  if(!confirm("delete ?")) return

let indexasupp = e.target.dataset.key

notreListe.splice(indexasupp, 1)

affichageNotes()
console.log(notreListe)

Sync()

}

const Sync = () => {
  savedData = notreListe

  // Save dans local storage
  localStorage.savedData = JSON.stringify(savedData);

  // Supp si vide
  if (JSON.parse(localStorage.savedData).length == 0) {
    localStorage.removeItem("savedData");
  };
};

// eventListener

$newNoteForm.addEventListener('submit', AddNote)
$noteWrapper.addEventListener('click', deleteNote)

// INIT

const Init = () => {

  // Charge localStorage
  if (localStorage.savedData) {
    notreListe = JSON.parse(localStorage.savedData) || [];
  };

  affichageNotes();
}

Init()