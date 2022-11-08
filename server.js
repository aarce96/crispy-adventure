const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
  let createNote = req.body;
  let listNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let lengthNote = listNotes.length.toString();

  createNote.id = lengthNote;
  listNotes.push(createNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(listNotes));
  res.json(listNotes);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
