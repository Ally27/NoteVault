const fs = require("fs");
const express = require("express");
const path = require("path");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("Develop/public"));

// Get route
app.get("/api/notes", function (req, res) {
  readFileAsync("Develop/db/db.json", "utf8").then(function (userData) {
    notes = [].concat(JSON.parse(userData));
    res.json(notes);
  });
});

// Post route
app.post("/api/notes", function (req, res) {
  const notes = req.body;
  readFileAsync("Develop/db/db.json", "utf8")
    .then(function (userData) {
      const note = [].concat(JSON.parse(userData));
      const newNote = { ...notes, id: note.length + 1 };
      note.push(newNote);
      return note;
    })
    .then(function (note) {
      writeFileAsync("Develop/db/db.json", JSON.stringify(note));
      res.send(note);
    });
});

// delete route
app.delete("/api/notes/:id", function (req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("Develop/db/db.json", "utf8")
    .then(function (userData) {
      const note = [].concat(JSON.parse(userData));
      const newNotes = [];
      for (let i = 0; i < note.length; i++) {
        if (idToDelete !== note[i].id) {
          newNotes.push(note[i]);
        }
      }
      return newNotes;
    })
    .then(function (note) {
      writeFileAsync("Develop/db/db.json", JSON.stringify(note));
      res.json("Save complete.");
    });
});

//saving
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//Listener
app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
