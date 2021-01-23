//Dependencies
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require('path');
const fs = require("fs");
const util = require("util")
const uniqid = require("uniqid");



//Sets up express
const app = express();
const PORT = process.env || 3000;

app.use(express.static('public'))
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// console.log(fs.readFile)

//Sets Variables
const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync =util.promisify(fs.readFile);

let storedNotes;

//For html Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Find all notes
app.get("/api/notes", function (req, res) {
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function(data) {
            return res.json(JSON.parse(data))
        })
})

// Creates new note
app.post("/api/notes", function (req,res) {
    var newNote = req.body;
    var newId = uniqid();
    newNote.id=newId;

    fs.readFile("./db/db.json", (err, data) =>{
        if(err) throw err;

        let savedNotes = JSON.parse(data);
        savedNotes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), "utf8", err => {
            if (err) throw(err);
            console.log("saved to database")
        })
    })
})

// Deletes targeted note
app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            storedNotes = JSON.parse(data);
            writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(storedNotes))
                .then(function () {
                    console.log("Deleted db.json");
                })
        });
    res.json(id);
});



    // Starts the server to begin listening
    // =============================================================
    app.listen(process.env.PORT, function () {
        console.log("NoteApp server is running at port 3000...")
    });


