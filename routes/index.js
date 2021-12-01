const express = require('express');

const Products = require('./productosRoutes');
const Subcategorias = require('./SubcategoriasRoutes');
const Marcas = require('./MarcasRoutes');


function routerApi(app){

  const ruta_v1 = express.Router();
  app.use('/apixen/v1',ruta_v1)
  ruta_v1.use('/Products',Products)
  ruta_v1.use('/subcategoria',Subcategorias)
  ruta_v1.use('/marcas',Marcas)

}

module.exports = routerApi;
