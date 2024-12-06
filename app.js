const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// mongoDb

app.listen(3001);
console.log('trttr')