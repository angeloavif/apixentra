const express = require('express');
const router = express.Router();

router.get('/:id_subcategoria/marca/:id_marca',(req,res)=>{

  const {id_subcategoria,id_marca} = req.params;

  var dato = {
    "status":true,
    "mensaje":"",
    "data":[
      {
        "clave_marca":"Marca "+id_marca,
        "clave_scat":"Subcategoria "+id_subcategoria,
        "grupo": "tal grupo"
      }
    ]
  };
  res.json(dato);
});


router.get('/:id_subcategoria/marca/:id_marca',(req,res)=>{

  const {id_subcategoria,id_marca} = req.params;

  var dato = {
    "status":true,
    "mensaje":"",
    "data":[
      {
        "clave_marca":"Marca "+id_marca,
        "clave_scat":"Subcategoria "+id_subcategoria,
        "grupo": "tal grupo"
      }
    ]
  };
  res.json(dato);
});

module.exports = router;
