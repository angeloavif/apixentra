const express = require('express');
const disenoServices = require('./../services/disenoServices');
const {validaKey} = require('./../middleware/authHandler');
const router = express.Router();
const service = new disenoServices();


router.get('/configuraciones',validaKey, (req,res)=>{

    service.get_configuraciones()
    .then(configuraciones => {
      res.json({
        "status":true,
        "message":"",
        "statusCode":res.statusCode,
        "data":configuraciones
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




module.exports = router;
