const express = require('express');
const Products = require('./productosRoutes');

function routerApi(app){

  const ruta = express.Router();
  ruta.use('/productos',Products)

}

module.exports = routerApi;
