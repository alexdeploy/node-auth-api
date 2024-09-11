const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // Función para acceder a diferentes bases de datos
const getDatabaseConnection = (dbName) => {
  return mongoose.connection.useDb(dbName);
};

module.exports = { getDatabaseConnection };