const apiRoute = require('express').Router();
const path = require('path');
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

// Returns GET request when going to or refreshing the page
apiRoute.get('/notes', (req,res) => {
  res.json(notes)

});

// Creates a new note through POST request
apiRoute.post('/notes', (req,res) =>{
  
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };
  
  //read through the current notes files
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {

      // Add new note to db of notes
      notes.push(newNote);

      // rewrite db with new note
      fs.writeFile(
        './db/db.json',
        JSON.stringify(notes, null, 2),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully added new note!')
      );

    }
    res.json(200)
  });
  
  const response = {
    status: 'success',
    body: newNote
  };

  console.log(response);

});

// DELETE request route
apiRoute.delete('/notes/:id', (req,res) => {
  //selects the object from array based on id
  const { id } = req.params.id;
  const index = notes.findIndex((notes, index ) => notes.id == id)

  // removes object from array
  notes.splice(index, 1);
  
  //update database with the deleted note
  fs.writeFile(
        './db/db.json',
        JSON.stringify(notes, null, 2),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully deleted note!')
      );

  res.json(200)

});

module.exports = apiRoute