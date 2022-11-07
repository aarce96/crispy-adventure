const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);
class Save {
  write(note) {
    return writeNote("db/db.json", JSON.stringify(note));
  }

  read() {
    return readNote("db/db.json", "utf8");
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Both title and text can not be blank");
    }
    const newNote = { title, text, id: uuid() };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updateNotes) => this.write(updateNotes))
      .then(() => newNote);
  }
}

module.exports = new Save();