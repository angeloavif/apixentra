const express = require('express');
const {validaKey} = require('./../middleware/authHandler');
const productosServices = require('./../services/productosServices');
const router = express.Router();
const service = new productosServices();
const boom = require('@hapi/boom');
const querystring = require('querystring');


router.get('/',validaKey,(req,res)=>{

    var data = null;
    service.get_productos()
    .then(productos => {
       res.json({
        "status":true,
        "message":"",
        "statusCode":res.statusCode,
        "data":productos
      });

    })
    .catch(err => {
        return res.status(500).json({
          "status":false,
          "message":err,
          "statusCode":res.statusCode,
          "data":null
        });
    });

});

router.get('/marcas/:marca/:subcategoria',validaKey,(req,res)=>{

  const marca = req.params.marca;
  const subcategoria = req.params.subcategoria;

  var data = null;
  service.get_productos_marcas(marca,subcategoria)
  .then(productos => {
     res.json({
      "status":true,
      "message":"",
      "statusCode":res.statusCode,
      "data":productos
    });

  })
  .catch(err => {
      return res.status(500).json({
        "status":false,
        "message":err,
        "statusCode":res.statusCode,
        "data":null
      });
  });

});

router.post('/filtros',(req,res,next)=>{

  var data = req.body || null;
    try {
      res.json({
        "status":false,
        "mensaje":"",
        "data":data
      });
    } catch (error) {
        next(boom.notFound("Error al enviar la información",error))
    }



});

router.post('/filtros2',(req,res,next)=>{

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
