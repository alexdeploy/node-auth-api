const routes = require('./routes/routes');
const port = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const database = require('./modules/mongodb');
const app = express();
const config = require('./api.config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(config.cors.options));
app.use(config.domain.route.auth.root, routes)

app.listen(port, () => console.log('Listening on port ' + port + '...'));