require('dotenv').config();
const mongoose = require('mongoose');

describe('MongoDB Connection', () => {

  beforeAll( async () => {
    const user = process.env.CLUSTER_USER_NAME;
    const password = process.env.CLUSTER_USER_PASSWORD;
    const DB_URI = 'mongodb+srv://' + user + ':' + password + '@piso-cluster.tcqekfo.mongodb.net/';
    console.log(DB_URI);
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll( async () => {
    await mongoose.connection.close();
  });

  test('should successfully connect to MongoDB', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});