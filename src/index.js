const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

require('./app/controllers/index')(app);


console.log('Servidor online na porta 3000');

app.listen(3000);