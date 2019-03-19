require('dotenv').config();
// const mongoose = require('mongoose');
require('../../lib/utils/connect')();
const { connection } = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');



describe('test dogs route', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('can post a dog to the DB', () => {
    return request(app)
      .post('/dogs')
      // .set('Authorization', `Bearer${getToken()}`)
      .send({
        name: 'Rowlf the Dog',
        age: '45',
        weight: '16 lbs'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Rowlf the Dog',
          age: '45',
          weight: '16 lbs',
          __v: 0,
          _id: expect.any(String) 
        });
      });
  });
  it('can get all dogs in DB', () => {
    return request(app)
      .post('/dogs')
      // .set('Authorization', `Bearer${getToken()}`)
      .send({
        name: 'Rowlf the Dog',
        age: '45',
        weight: '16 lbs'
      })
      .then(() =>{
        return request(app)
          .get('/dogs');
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
  it('can get a dog by id', () => {
    return request(app)
      .post('/dogs')
    // .set('Authorization', `Bearer${getToken()}`)
      .send({
        name: 'Rowlf the Dog',
        age: '45',
        weight: '16 lbs'
      })
      .then(postedDog => {
        const id = postedDog.body._id;
        return request(app)
          .get(`/dogs/${id}`)
          .then(res => {
            expect(res.body._id).toEqual(postedDog.body._id);
          });
      });
  });
});
