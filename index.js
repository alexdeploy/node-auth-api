const routes = require('./routes/routes');
const port = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
require('./plugins/mongoose');
const app = express();
const config = require('./api.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(config.cors.options));
app.use(config.domain.route.auth.root, routes)

app.listen(port, () => console.log('Listening on port ' + port + '...'));