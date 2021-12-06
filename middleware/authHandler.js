const boom = require('@hapi/boom');
//const {config} = require('./../config/config');
const conexion = require('./../config/bd');

async function validaKey(req,res,next){
  const api = req.headers["authorization"];
  if (api != "") {
    try {
      let buff = new Buffer.from(api, 'base64').toString('ascii');
      const configuraciones = JSON.parse(buff);
      global.businessModel = configuraciones.businessModel;
      global.BM_showPrices = configuraciones.BM_showPrices;
      global.BM_IVA = configuraciones.BM_IVA;
      global.BM_ivaproducts = configuraciones.BM_ivaproducts;
      global.tipo_utilidad = configuraciones.tipo_utilidad;
      global.empresa = configuraciones.empresa;
      const json_var = await consultaBD(configuraciones.empresa).catch(e => {});
      await creaVariables(json_var);
      next();
    } catch (error) {
      next(boom.unauthorized());
    }
  }else{
    next(boom.unauthorized());
  }
}

async function consultaBD(empresa){
  return new Promise((resolve, reject) => {
    conexion.query("SELECT XNCF_empresa.`xnemp_clave`, XNCF_conexiones.`xncon_endpoint` dominio, XNCF_conexiones.`xncon_usuario` usuario, XNCF_conexiones.`xncon_servidor` HOST, XNCF_conexiones.`xncon_basededatos` bd, XNCF_conexiones.`xncon_contrasena` pass FROM `XNCF_empresa` INNER JOIN `XNCF_conexiones` ON XNCF_conexiones.`xnemp_id` = XNCF_empresa.`xnemp_id` WHERE xnemp_clave = '"+empresa+"'",
        (err, resultados) => {
            if (err) reject(err);
            else{
              resolve(resultados)
            }
        });
  });
}

async function creaVariables(json){
  global.DB_HOST=json[0].HOST;
  global.DB=json[0].bd;
  global.USER=json[0].usuario;
  global.PASS=json[0].pass;
}


module.exports = {validaKey};

