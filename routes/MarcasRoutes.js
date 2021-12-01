const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{


  var dato = {
    "status":true,
    "mensaje":"",
    "data":[
      {
        "nombre":"Marca 1",
        "clave": 1
      },
      {
        "nombre":"Marca 2",
        "clave": 2
      },
      {
        "nombre":"Marca 3",
        "clave": 3
      },
      {
        "nombre":"Marca 4",
        "clave": 4
      }
    ]
  };
  res.json(dato);
});

router.get('/:id',(req,res)=>{

  const id = req.params.id;

  var dato = {
    "status":true,
    "mensaje":"id de busqueda"+id,
    "data":[
      {
        "nombre":"Marca "+id,
        "clave": id
      }
    ]
  };
  res.json(dato);
});

module.exports = router;
