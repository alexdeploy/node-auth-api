/**
 * Mongoose Documentation API - http://mongoosejs.com/docs/api.html
 */
const mongoose = require('mongoose');
const user = process.env.CLUSTER_USER_NAME;
const password = process.env.CLUSTER_USER_PASSWORD;

// TODO: Ajustar URI dinámica para facil configuración.
const DB_URI = 'mongodb+srv://' + user + ':' + password + '@cluster0.arhfz8j.mongodb.net/';

// TODO: Investigar sobre las opciones de mongoose.
const DB_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}
// TODO: Investigar sobre la respuesta de mongoose y hacer logs enriquecidos.
mongoose.connect(DB_URI, DB_OPTIONS)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

module.exports = mongoose;