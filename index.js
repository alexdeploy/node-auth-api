const routes = require('./routes/routes');
const config = require('./api.config');
const Express = require('./plugins/express');
const Mongoose = require('./plugins/mongoose');

const server = new Express();
const database = new Mongoose();

server.loadBodyParser();
server.loadCors();
server.loadRoutes(config.domain.route.auth.root, routes)

server.start();
database.connect();