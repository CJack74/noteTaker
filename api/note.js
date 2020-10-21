class Note{
    constructor(id, note){
        this.id = id;
        this.note = note;
    }
    getId(){
        return this.id;
    }
    getNote(){
        return this.note;
    }
}

module.exports = Note;