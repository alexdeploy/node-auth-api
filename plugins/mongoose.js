/**
 * Mongoose Documentation API - http://mongoosejs.com/docs/api.html
 */
const mongoose = require('mongoose');
const DB_URI = process.env.DB_MONGO_URI;
const DB_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

mongoose.connect(DB_URI, DB_OPTIONS)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

module.exports = mongoose;