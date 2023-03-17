const fs = require("fs");
const express = require("express");
const path = require("path");
const util = require("util");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));
// Get route
app.get("/api/notes", function (req, res) {
  readFileAsync("./Develop/db.json", "utf8").then(function (data) {
    notes = [].concat(JSON.parse(userData));
    res.json(notes);
  });
});
// Post route
app.post("./api/notes", function (req, res) {
  const notes = req.body;
  readFileAsync(".Develop/db/db.json", "utf8")
    .then(function (userData) {
      const note = [].concat(JSON.parse(userData));
      notes.id = note.length + 1;
      note.push(notes);
      return notes;
    })
    .then(function (note) {
      writeFileAsync("Develop/db/db.json", JSON.stringify(note));
      res.json(notes);
    });
});
