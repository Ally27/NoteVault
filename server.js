const fs = require("fs");
const express = require("express");
const path = require("path");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));
// Get route
app.get("/api/notes", function (req, res) {
  readFileAsync("./Develop/db/db.json", "utf8").then(function (data) {
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
      notes.id = note.length + 1
      note.push(notes);
      return note;
    })
    .then(function (note) {
      writeFileAsync("Develop/db/db.json", JSON.stringify(note));
      res.json(notes);
    });
});
// delete route
app.delete("/api/notes/:id", function (req, re) { 
    const idtoDelete= parseOnt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function (userData) { 
        const note = [].concat(JSON.parse(userData));
        const newNotes = []
        for(let i = 0; i < note.length; i ++){
            if(idtoDelete !== note [i].id){
                newNotes.push(note[i])
            }
        }
        return newNotes
     }).then(function(note){
        writeFileAsync(".Develop/db/db.json", JSON.stringify(note))
        res.send("Save complete.");
     })
 })
 //saving
// needs app listener and to complete this get function
 app.get("/notes", function (req, res){
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
 });

 app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"./Develop/public/index.html"));
 });

 app.get("*", function(req,res){
  res.sendFile(path.join(__dirname,"./Develop/public/index.html"));
 });

 //Listener
app.listen(PORT,function(){
  console.log("listing Port", PORT);
})
