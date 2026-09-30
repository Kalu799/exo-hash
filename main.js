// DOM

const $noteWrapper = document.querySelector('#note_wrapper')
const $newNoteForm = document.querySelector('#newNote-form')

// VAR / CONST

const notreListe = [
  {
    name: "ui",
    note: "note1",
    date: ""
  },
  {
    name: "ui",
    note: "note2",
    date: ""
  },
  {
    name: "ui",
    note: "note3",
    date: ""
  },
  {
    name: "ui",
    note: "note4",
    date: ""
  },
  {
    name: "ui",
    note: "note5",
    date: ""
  },
]

// FCT

const affichageNotes = () => {
  $noteWrapper.innerHTML = ``
  Object.values(notreListe).map((item, key) => {
    $noteWrapper.innerHTML +=
      `
    <li id="${key}">${item.note}</li>
      `
  });
};

const AddNote = (event) => {
  event.preventDefault();

  let pushForm = new FormData($newNoteForm);
   data = Object.fromEntries(pushForm.entries());
  notreListe.push(data);

  affichageNotes()
  //console.log("not")
}

// eventListener

$newNoteForm.addEventListener('submit', AddNote)

// INIT

const Init = () => {
  affichageNotes();
}

Init()