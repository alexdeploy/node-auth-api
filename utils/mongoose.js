/**
 * Mongoose Documentation API - http://mongoosejs.com/docs/api.html
 */
const mongoose = require('mongoose');
const user = process.env.CLUSTER_USER_NAME;
const password = process.env.CLUSTER_USER_PASSWORD;
const DB_URI = 'mongodb+srv://' + user + ':' + password + '@cluster0.arhfz8j.mongodb.net/';
const DB_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

mongoose.connect(DB_URI, DB_OPTIONS)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

module.exports = mongoose;