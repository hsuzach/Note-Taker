const express = require('express');
const path = require('path')

const htmlRoute = require('./routes/htmlRoutes.js')
const apiRoute = require('./routes/apiRoutes.js')
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//GET '/' and '/notes' path to render HTML
app.use('/', htmlRoute);

//enables GET, PUSH, DELETE 'api/notes' path to edit db.json data
app.use('/api', apiRoute)


app.listen(PORT)