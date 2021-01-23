//Variables
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $noteList = $(".list-container .list-group");
const $saveNoteBtn = $("#save-note");
const $newNoteBtn = $(".new-note");


// Keeps track of input in textarea
let currentNote = {};

// Functions for retrieving all notes, saving notes, and deleting notes
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// CurrentNote is displayed or inputarea is empty
const renderCurrentNote = () => {
  $saveNoteBtn.hide();
  if (currentNote.id) {
    $noteTitle.val(currentNote.title);
    $noteText.val(currentNote.text);
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
  } else {
    $noteTitle.val("");
    $noteText.val("");
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
  }
};

// Saves Note to db and updates view
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderCurrentNote();
  });
};

// Deletes the  note
const handleNoteDelete = function (event) {
  event.stopPropagation();
  const note = $(this).parent(".list-group-item").data();
  if (currentNote.id === note.id) {
    currentNote = {};
  }
  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderCurrentNote();
  });
};

// Dislpays current note
const handleNoteView = function () {
  currentNote = $(this).data();
  renderCurrentNote();
};

// Saves currentNote and allows for another input
const handleNewNoteView = function () {
  currentNote = {};
  renderCurrentNote();
};

// Controls if the save button appears or not
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Note Title list
const renderNoteList = (notes) => {
  $noteList.empty();
  const noteListItems = [];

  // Creates list of notes with text and delete button
  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);
    if (withDeleteButton) {
      const $deleteBtn = $(
        "<i class='fas fa-trash-alt delete-note'>"
      );
      $li.append($deleteBtn);
    }
    return $li;
  };
  if (notes.length === 0) {
    noteListItems.push(create$li("No Notes", false));
  }
  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);
    noteListItems.push($li);
  });
  $noteList.append(noteListItems);
};

// Retrieves notes from db and renders them to the list
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

//Event handlers
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on(handleRenderSaveBtn);
$noteText.on(handleRenderSaveBtn);

// Retrieves initial Notes
getAndRenderNotes();
