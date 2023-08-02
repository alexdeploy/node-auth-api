const cors = require('cors');
const express = require('express');
const config = require('../api.config');

/**
 * @class Express
 * @description Express wrapper
 */
module.exports = class Express {
    constructor() {
        this.app = express();
        this.port = config.domain.port.server;
    }

    use = (...middleware) => this.app.use(...middleware);

    loadBodyParser = () => {
        this.use(express.json());
        this.use(express.urlencoded({ extended: true }));
    }

    loadCors = () => {
        this.use(cors(config.cors.options));
    }

    loadRoutes = (slug, routes) => {
        this.use(slug, routes);
    }

    start = () => {
        this.app.listen(this.port, () => {
            console.log(`Server started at port: ${this.port}`);
        })
    }
    
    forceStart = () => {
        this.app.listen(this.port, () => {
            console.log(`Server started at port: ${this.port}`);
        })
        .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            const nextPort = typeof this.port === 'string' ? parseInt(this.port, 10) + 1 : this.port + 1;
            console.log(`Port ${this.port} is busy, trying with port ${nextPort}...`);
            this.port = nextPort;
            this.app.start();
        } else {
            console.error(err);
        }
        });
    }
}