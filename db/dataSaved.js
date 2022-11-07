const fs = require("fs");
const util = require("util");

const writeNote = util.promisify(fs.writeFile);
const readNote = util.promisify(fs.readFile);

class Save {
  write(note) {
    return writeNote("./db/db.json", JSON.stringify(note));
  }

  read() {
    return readNote("./db/db.json", "utf8");
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

    return this.getNotes()
      .then((notes) => [...notes])
      .then((updateNotes) => this.write(updateNotes));
  }
}

module.exports = new Save();