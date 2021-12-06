
const con_cliente = require('./../config/bd_cliente');
const cli_bd = new con_cliente();
class disenoServicios {

    constructor(){
        this.data = [];
    }

    get_configuraciones(){
      return new Promise((resolve, reject) => {
          const mysql = cli_bd.conectar();
          mysql.query("SELECT coglo_codigo,`coglo_valor` FROM `adm_configuraciones_globales` WHERE `coglo_grupo` in ('template','modelo_negocio') ORDER BY `coglo_id` ASC",
            (err, resultados) => {
                if (err) reject(err);
                else resolve( resultados);
            });
      });
    }


}

module.exports = disenoServicios;
