

const serverless = require('serverless-http');
const express = require('express');
const routerApi = require('./routes');
//const {config} = require('./config/config');
const {logErrors, errorHandler,boomErrorHandler, sqlErrorHamdler} = require('./middleware/errorHandler');
//const {validaKey} = require('./middleware/authHandler');
const app = express();

    //const port = config.port;
    app.use(express.json());


    routerApi(app);
    app.use(logErrors);
    app.use(sqlErrorHamdler);
    app.use(boomErrorHandler);
    app.use(errorHandler);


module.exports.handler = serverless(app);