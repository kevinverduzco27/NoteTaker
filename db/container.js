const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1"); // Package for generating unique IDs

class container{
  // Read data from the JSON file
  read() {
    return util.promisify(fs.readFile)("db/db.json", "utf8");
  }

  // Write data to the JSON file
  write(note) {
    return util.promisify(fs.writeFile)("db/db.json", JSON.stringify(note, null, 2)); // Adding 2-space indentation for better readability
  }

  // Get all notes from the JSON file
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  // Add a new note to the JSON file
  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Remove a note with the specified ID from the JSON file
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new container(); // Exporting an instance of the container class
