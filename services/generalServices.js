const conexion = require('./../config/bd');
const con_cliente = require('./../config/bd_cliente');
const cli_bd = new con_cliente();

class generalServices {

    constructor(){
        this.data = [];
    }

    get_datos_iniciales(empresa){
      return new Promise((resolve, reject) => {
        conexion.query("SELECT XNCF_empresa.`xnemp_clave`, XNCF_conexiones.`xncon_endpoint` dominio, XNCF_conexiones.`xncon_usuario` usuario, XNCF_conexiones.`xncon_servidor` HOST, XNCF_conexiones.`xncon_basededatos` bd, XNCF_conexiones.`xncon_contrasena` pass FROM `XNCF_empresa` INNER JOIN `XNCF_conexiones` ON XNCF_conexiones.`xnemp_id` = XNCF_empresa.`xnemp_id` WHERE xnemp_clave = '"+empresa+"'",
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
      });
    }

    get_modelo_negocio(resultados){

      const mysql = cli_bd.conectar(resultados[0].HOST,resultados[0].bd,resultados[0].usuario,resultados[0].pass);
      var data = new Promise((resolve, reject) => {
        mysql.query("SELECT coglo_codigo,coglo_valor  FROM adm_configuraciones_globales WHERE coglo_grupo IN ('modelo_negocio') OR coglo_codigo = 'empresa' ORDER BY coglo_id ASC",
            (err, resultados) => {
                if (err) reject(err);
                else resolve( resultados);
            });
      });


      return data;
    }


}

module.exports = generalServices;
