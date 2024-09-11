const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // Función para acceder a diferentes bases de datos
const getDatabaseConnection = (dbName) => {
  return mongoose.connection.useDb(dbName);
};

module.exports = { getDatabaseConnection };