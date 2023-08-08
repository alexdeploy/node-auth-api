require('dotenv').config();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const port = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
require('./plugins/mongoose');
const app = express();

const CORS_OPTIONS = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use(config.domain.route.auth.root, routes)

app.listen(port, () => console.log('Listening on port ' + port + '...'));
