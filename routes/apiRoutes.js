

const axios = require("axios");

const fs = require("fs");


let notes = [{id:1, note:'hello Curtis'}];


function id() {
    let uniqueArray = [];
    for( let index = 0; index < notes.length; index++ ) {
        uniqueArray.push(notes[index].id)
    }

    let sortArray = [];
    sortArray = uniqueArray.sort(function(x, y){return x-y});
    let nextID = ++sortArray[0];
    return parseInt(nextID);
}


module.exports = function(app) {
    const post = () => {

        axios
        .post('/api/notes', {
            id: id(),
            note: 'Regular Note'
        })
        .then((response) => { console.log(response) })
        .catch((error) => { console.log(error) })

        axios
        .post('/api/notes')
        .then((response) => { console.log(response) })
        .catch((error) => { console.log(error) })

        axios
        .get('/api/notes')
        .then((response) => { console.log(response) })
        .catch((error) => { console.log(error) })

        axios.get("'/api/notes/:id", function(req, res) {
            var id = rq.params.id;
            notes = JSON.parse(fs.readFileSync(__dirname + '../db/db.json'))
            
            const updateNote = notes.filter(note => note.id != id);
            fs.writeFileSync(__direname +'../db/db.json', updateNote, function(err) {
                if(err) return err;
                console.log('id ' + id + 'from db.json');
            });
            console.log('no id: ' + id);
        })
        .then(( { data: { updateNote } }) => res.json(updateNote))
        .catch((error) => { console.error(error) });
    }
    post();
}