require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Dogs = require('../models/Dogs');


beforeAll(() => {
  connect();
});

beforeEach(done => {
  mongoose.connection.dropDatabase(done);
});

beforeEach(() => {
  return seedData({ totalDogs: 5  });
});


const prepare = model => JSON.parse(JSON.stringify(model));
const prepareAll = models => models.map(prepare);

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: (query = {}) => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: (query = {}) => Model.find(query).then(prepareAll)
  };
};
module.exports = { 
  ...createGetters(Dogs),
};
