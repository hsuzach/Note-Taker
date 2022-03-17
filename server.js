const express = require('express');
const path = require('path');
const notes = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))

})

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))

})

app.get('/api/notes', (req,res) => {
  res.json(notes)

})





app.listen(PORT)