require('dotenv').config();
require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
const Dogs = require('../../lib/models/Dogs');
const { Types, connection } = require('mongoose');

describe('test dogs model', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('can validate a dogs model', () => {
    const dogs = new Dogs({
      name: 'Rowlf the Dog',
      age: '45',
      weight: '16 lbs'
    });
    expect(dogs.toJSON()).toEqual({
      name: 'Rowlf the Dog',
      age: '45',
      weight: '16 lbs',
      _id: expect.any(Types.ObjectId)
    });
  });
});
