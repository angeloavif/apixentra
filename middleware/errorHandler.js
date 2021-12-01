const { ValidationError } = require("sequelize");
const boom = require('@hapi/boom');

function logErrors(error,req,res,next){
  console.error(error);//mostrar el error en servidor para poder monitorearlo
  next(error);//importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
}


// Crear formato para devolverlo al cliente que se complementa con la función anterior:

function errorHandler(err, req, res, next) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  res.status(500).json({ //indicar que el error es estatus 500 Internal Server Error
    message: err.message, //mostrar al cliente el mensaje de error
    stack: err.stack, //mostrar info del error
  })
}



function boomErrorHandler(err, req, res, next) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros

  if (err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)

}

function sqlErrorHamdler(err, req, res, next) {
  if(err instanceof ValidationError) {
    console.log(err)
    res.status(409).json({
        statusCode: 409,
        message: err.errors.message,
        details: err.errors
      })
  }
  next(err)
}


module.exports = { logErrors, errorHandler, boomErrorHandler , sqlErrorHamdler}; //exportarlo como modulo
