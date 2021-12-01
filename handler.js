
module.exports.productos = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'hello',
        input: [],
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.producto = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Listado de productos',
        data:{
          "nombre":"Angel Avila Flores",
          "correo":"angel.af@xentra.mx",
          "clave": 112
        }
      }
    ),
  };
};

module.exports.marcas = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Listado de marcas',
        data:{
          "nombre":"Angel Avila Flores",
          "correo":"angel.af@xentra.mx",
          "clave": 112
        }
      }
    ),
  };
};
