const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, min: 4},//TODO: change to 6
    date_of_birth: {type: Date},
    note_ids: [],
    test_ids: []
  }
);

// Virtual for user's full name
UserSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/users/user/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);