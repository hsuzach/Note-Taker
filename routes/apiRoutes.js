const apiRoute = require('express').Router();
const path = require('path');
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

apiRoute.get('/notes', (req,res) => {
  res.json(notes)

});

apiRoute.post('/notes', (req,res) =>{
  
  const newNote = {
    title: req.body.title,
    text: req.body.text
  };
  
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
            : console.info('Successfully added new Note!')
      );

    }
    res.json(200)
  });
  
  const response = {
    status: 'success',
    body: newNote
  };

  console.log(response);

})

module.exports = apiRoute