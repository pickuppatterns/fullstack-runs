const mongoose = require('mongoose');

const dogsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Dogs', dogsSchema);
