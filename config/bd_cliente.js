var mysql = require('mysql');

class cli_bd {
  conectar(DB_HOST="",DB="",USER="",PASS=""){
    if (DB_HOST == "") {
      DB_HOST = global.DB_HOST;
      DB = global.DB;
      USER = global.USER;
      PASS = global.PASS;
    }
    return mysql.createPool({
      host : DB_HOST,
      database : DB,
      user : USER,
      password : PASS
    });
  }
}
module.exports = cli_bd;


