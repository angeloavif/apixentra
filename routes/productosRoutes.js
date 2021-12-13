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

router.post('/scat_detacada',validaKey,(req,res)=>{

  var subcats = req.body || null;


  service.get_productos_subcategorias(subcats)
  .then(productos => {

      var  dato = {
        "status":true,
        "mensaje":"",
        "data":productos
      };
    res.json(dato);
   })
  .catch(err => {
    console.log(err)
  });





});

router.post('/marcas/:marca/:subcategoria',validaKey,(req,res)=>{

  const marca = req.params.marca;
  const subcategoria = req.params.subcategoria;

  var data = null;
  service.get_productos_marcas(marca,subcategoria)
  .then(productos => {
      var element = [];
      for (var i in productos){
        var data = {
          'id':productos[i].ecpro_id,
          'name':productos[i].ecpro_nombre,
          'description':productos[i].ecpro_descripcion_html,
          'sku':productos[i].xnpro_sku,
          'url':productos[i].product_url,
          'img': [
            {
              "img_sm": productos[i].ecmar_jpg_thumbnail,
              "img_bg": productos[i].xnpri_jpg_grande,
            },
          ],
          'brand': {
              "name":  productos[i].ecmar_nombre,
              "url":  productos[i].ecmar_url,
              "img": productos[i].xnpri_jpg_grande,
              "stamps": null
            },
          'mainFeatures':null,
          'favorite':productos[i].ecpro_id,
          'stock':productos[i].xnprp_existencia,
          'price': (productos[i].descuento_valido==1) ? (productos[i].precio_producto-productos[i].precio_descuento) : productos[i].precio_producto,
          'priceOld':productos[i].precio_producto,
          'tooltip':null,
          'labels': null,
          'freeShipping':productos[i].envio_gratis,
          'promotionTime':productos[i].xnprl_fecha_fin_descuento,
          'promotionSaving':productos[i].descuento,
          'promotionType':productos[i].tipo_descuento,
          'specifications':null,
          'msi':null,
          'script':null,
          'styleCss':null,
          'warehouses':null
        }

        element.push(data);
      }

     res.json({
      "status":true,
      "message":"",
      "statusCode":res.statusCode,
      "data":element
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
