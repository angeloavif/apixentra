const express = require('express');
const productosServices = require('./../services/productosServices');
const router = express.Router();
const service = new productosServices();
const boom = require('@hapi/boom');
const querystring = require('querystring');


router.get('/',(req,res,next)=>{

    var data = null;
    service.get_listadoSubcategorias()
    .then(productos => {
       res.json({
        "status":true,
        "mensaje":"",
        "data":productos
      });

    })
    .catch(err => {
        return res.status(500).json({
          "status":false,
          "mensaje":err,
          "data":null
        });
    });

});

router.get('/filtros',(req,res,next)=>{

  res.json({
    "status":false,
    "mensaje":"",
    "data":"filtros"
  });

});

router.post('/filtros2',(req,res,next)=>{

  console.log(req.body)
  /*console.log(req.body)
  try {
    const body = req.body || [];
    data = JSON.stringify(body);
  } catch (error) {
    next(boom.notFound("json no encontrado"));
  }*/

  res.json({
    "status":false,
    "mensaje":"",
    "data":req.body
  });

});

router.get('/:id',(req,res)=>{

  const id = req.params.id;
  var dato = null;

  const productos = service.get_producto(id);

  dato = {
    "status":true,
    "mensaje":"",
    "data":productos
  };


  res.json(dato);
});


module.exports = router;
