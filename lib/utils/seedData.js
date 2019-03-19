const Dogs = require('../models/Dogs');
const Chance = require('chance');
const chance = new Chance();


const DEFAULT_TOTAL_DOGS = 10;


const dogs = [
  { 
    name: chance.name(),
    age: chance.number(),
    weight: '16 lbs'
  }, {
    name: chance.name(),
    age: chance.number(),
    weight: '19 lbs'
  }
];

const makeStores = (dogs) => {
  return [...Array(DEFAULT_TOTAL_DOGS)].map(() => {
    return chance.pickone(dogs);
  });
};

module.exports = ({
  totalDogs = makeStores(dogs),

}) => {
  return Promise.all([
    Promise.all(totalDogs.map(dogs => {
      return Dogs.create({
        name: dogs.name,
        age: dogs.age,
        weight: dogs
      }); 
    })), 
  ]);
};


