//Dependencies
const express = require('express');
const path = require('path');
const Note = require('./api/note')
 
//Sets up express
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route for home page
app.get('*', function (req, res) {
    res.send('index.html');
  })

//Route for notes
app.get('/notes.html', (req, res) => {
    res.send('notes.html');
})

//get our notes
app.get('/api/note', (req, res) => {
    if (notes.length === 0) {
        return res.json({ message: 'There are no notes!' })
    } else {
        return res.json(notes);
    }
});

//Add a note

app.post('/api/note/new', (req, res) => {
    const id = notes.length + 1;
    const noteBody = req.body.note;
    const note = new Note(id, noteBody);
    notes.push(note);
    res.json(notes);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});


// // Create a new Note
// app.post('/notes', notes.create);

// // Retrieve all Notes
// app.get('/notes', notes.findAll);

// // Retrieve a single Note with noteId
// app.get('/notes/:noteId', notes.findOne);

// // Update a Note with noteId
// app.put('/notes/:noteId', notes.update);

// // Delete a Note with noteId
// app.delete('/notes/:noteId', notes.delete);