const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const config = require('./api.config');
const cors = require('cors');
require('./plugins/mongoose');
const Express = require('./plugins/express');

const server = new Express();

// TODO: Investigar sobre body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS configuration
server.use(cors(config.cors.options));

// Load auth routes
server.use(config.domain.route.auth.root, routes)

server.start();