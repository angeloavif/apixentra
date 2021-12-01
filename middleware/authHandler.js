const boom = require('@hapi/boom');
const {config} = require('./../config/config');

function validaKey(req,res,next){
  const api = req.headers["authorization"];

  if (api === config.apikey) {
    next();
  } else {
    next(boom.unauthorized());
  }

}


module.exports = {validaKey};

