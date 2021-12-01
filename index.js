const serverless = require('serverless-http');
const express = require('express');
//const routerApi = require('./routes');
const {config} = require('./config/config');
const {logErrors, errorHandler,boomErrorHandler, sqlErrorHamdler} = require('./middleware/errorHandler');
const {validaKey} = require('./middleware/authHandler');
const app = express();

//const port = config.port;
app.use(express.json());


app.get('/get_productos', function (req, res) {
    res.send('get_productos!')
  })


app.get('/producto', function (req, res) {
    res.send('producto!')
  })


app.get('/get_marcas', function (req, res) {
    res.send('get_marcas!')
  })

  module.exports.handler = serverless(app);