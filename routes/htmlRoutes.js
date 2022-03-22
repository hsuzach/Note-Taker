const htmlRoute = require('express').Router();
const path = require('path')


// GET request to route to notes page
htmlRoute.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '../public', 'notes.html'))

})

// GET request to route to home page
htmlRoute.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))

})



module.exports = htmlRoute