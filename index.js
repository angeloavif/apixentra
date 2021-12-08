

const serverless = require('serverless-http');
const express = require('express');
var cors = require('cors');
const routerApi = require('./routes');
//const {config} = require('./config/config');
const {logErrors, errorHandler,boomErrorHandler, sqlErrorHamdler} = require('./middleware/errorHandler');
//const {validaKey} = require('./middleware/authHandler');

const generalServices = require('./services/generalServices');
const service_general = new generalServices();

const app = express();

    app.use(cors({
      origin: '*'
    }));
    app.use(cors({
      exposedHeaders: ['Accept', 'application/json']
    }));
    app.use(cors({
      credentials: true,
    }));

    //const port = config.port;
    app.use(express.json());

    app.get('/auth',(req,res)=>{
        const emp = req.headers["clv_emp"];
        service_general.get_datos_iniciales(emp)
        .then(service_general.get_modelo_negocio)
        .then(config => {

          var element = new Object();
          for (var i in config)
            element[config[i].coglo_codigo]  = config[i].coglo_valor;

          var key = Buffer.from(JSON.stringify(element)).toString('base64')
          if (element.empresa){
            res.json({
              "status":true,
              "message":"",
              "statusCode":res.statusCode,
              "data":key
            });
          }else{
            res.statusCode = 404;
            res.json({
              "status":false,
              "message":"",
              "statusCode":res.statusCode,
              "data":null
            });
          }
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


    routerApi(app);
    app.use(logErrors);
    app.use(sqlErrorHamdler);
    app.use(boomErrorHandler);
    app.use(errorHandler);


module.exports.handler = serverless(app);