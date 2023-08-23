const path = require("path");
const router = require("express").Router();

// Route to serve the notes.html file
router.get("/notes", (req, res) => {
  const notesFilePath = path.join(__dirname, "../public/notes.html");
  res.sendFile(notesFilePath);
});

// Route to serve the index.html file (catch-all route)
router.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../public/index.html");
  res.sendFile(indexPath);
});

module.exports = router;
