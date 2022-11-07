const router = require("express").Router();
const dataSaved = require("../db/dataSaved");

router.get("/notes", function (req, res) {
  dataSaved
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.post("/notes", function (req, res) {
  dataSaved
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

module.exports = router;