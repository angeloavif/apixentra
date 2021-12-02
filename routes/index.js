const express = require('express');
const Products = require('./productosRoutes');


function routerApi(app){

  //const ruta_v1 = express.Router();
  //app.use('/v1',ruta_v1)
  //ruta_v1.use('/Products',Products)
  app.use('/productos',Products)



}

module.exports = routerApi;
