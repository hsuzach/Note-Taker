const express = require('express');
const path = require('path');
const htmlRoute = require('./routes/htmlRoutes.js')



const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//GET '/' and '/notes' path to render HTML
app.use('/', htmlRoute);







app.listen(PORT)