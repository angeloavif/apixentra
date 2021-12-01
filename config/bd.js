var mysql = require('mysql');
const {config} = require('./config');
module.exports = mysql.createPool({
  host : config.dbHost,
  database : config.dbName,
  user : config.dbUser,
  password : config.dbPassword,
});
