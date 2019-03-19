const { Router } = require('express');
const Dogs = require('../models/Dogs');
const { HttpError } = require('../middleware/error');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const { name, age, weight } = req.body;
    Dogs
      .create({
        name,
        age,
        weight
      })
      .then(dogs => res.send(dogs))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Dogs
      .findById(id)
      .then(foundDogs => {
        if(!foundDogs) {
          return new HttpError(404, `No dogs found with id: ${id}`);
        }
        res.send(foundDogs);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Dogs
      .find()
      .then(dogs => {res.send(dogs);})
      .catch(next);
  });
