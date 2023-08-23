const router = require("express").Router();
const notecontainer = require("../db/container");

// Route to get all notes from the database
router.get("/notes", (req, res) => {
    notecontainer
      .getNotes()
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  });
  
  // this router adds a new note to the db.json file
  router.post("/notes", (req, res) => {
    notecontainer
      .addNote(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(500).json(err));
  });
  
  // this router deletes the note with an id equal to req.params.id
  router.delete("/notes/:id", (req, res) => {
    notecontainer
      .removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });
  
  module.exports = router;
