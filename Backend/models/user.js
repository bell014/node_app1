const mongoose = require('mongoose');

const user = new mongoose.model('user', {

  email: { type: String,},
  password: { type: String,},
  username: { type: String,},
  lastname: { type: String,},
  age: { type: String, }
});

module.exports = user ;