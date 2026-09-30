// DOM

const $noteWrapper = document.querySelector('#note_wrapper')
const $newNoteForm = document.querySelector('#newNote-form')
const $share_btn = document.querySelector('#share_btn')

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
    <li id="${key}" class="flex items-center justify-between gap-4 border-b border-slate-100 py-4 text-slate-700 last:border-b-0">
      <span class="min-w-0 break-words">${item.note}</span>
      <button class="noteDelete inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-lg transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100" data-key="${key}" aria-label="Supprimer cette note">🗑️</button>
    </li>
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

const AddToHash = () => {
  const data = {data: ""}

  data.data = JSON.stringify(notreListe)
  const hash = encodeURIComponent(data.data)
  //console.log("lien codé : ", hash)

  location.hash = hash

  // const decodedHash = decodeURIComponent(hash)
  // const newData = JSON.parse(decodedHash)
  // console.log(newData)
}

// eventListener

$newNoteForm.addEventListener('submit', AddNote)
$noteWrapper.addEventListener('click', deleteNote)
$share_btn.addEventListener('click', AddToHash)

// INIT

const Init = () => {

  if (location.hash) {
    const hash = location.hash
    const decodedHash = decodeURIComponent(hash)
    let treatedhash = decodedHash.replace("#", "")
    notreListe = JSON.parse(treatedhash)
    location.hash = ""
  }

  // Charge localStorage
  else if (localStorage.savedData) {
    notreListe = JSON.parse(localStorage.savedData) || [];
  };

  affichageNotes();
}

Init()