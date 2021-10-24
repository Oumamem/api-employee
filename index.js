const express = require('express');
const app=express();
const employers = require('./dataset/survery_1.json')
const bodyParser = require('body-parser');

const fs = require('fs');



// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);

/* app.get('/employers', (req,res) => {
    res.status(200).json(employers)
}) */


/* app.get('/employers', (req,res) => {      
    res.status(200).json(json);
}) */
app.use(express.json());
app.listen(5500, ()=> console.log('serveur lancé : 5500'));
