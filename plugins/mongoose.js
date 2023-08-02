const mongoose = require('mongoose');
const DB_URI = process.env.DB_MONGO_ATLAS_URI;
const DB_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

/**
 * @class Mongoose
 * @description Mongoose wrapper
 * @see https://mongoosejs.com/docs/guide.html
 * TODO: Investigar sobre las opciones de mongoose.
 * TODO: Investigar sobre la respuesta de mongoose y hacer logs enriquecidos.
 * TODO: Ajustar URI dinámica para facil configuración.
 * 
 */
module.exports = class Mongoose {
    constructor() {
        this.mongoose = mongoose;
    }

    connect = () => {
        this.mongoose.connect(DB_URI, DB_OPTIONS)
            .then((res) => {
                console.log('Connected to MongoDB')
            })
            .catch(err => console.error(err));
    }
}