const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = Schema(
  {
    first_name: {type: String, required: true, minlength: lengthMessage(2, 'min'), maxlength: lengthMessage(100, 'max')},
    last_name: {type: String, required: true, minlength: lengthMessage(2, 'min'), maxlength: lengthMessage(100, 'max')},
    username: {type: String, required: true, minlength: lengthMessage(4, 'min'), maxlength: lengthMessage(100, 'max')},
    password: {type: String, required: true, minlength: lengthMessage(4, 'min'), maxlength: lengthMessage(100, 'max')},//TODO: change4  to 6
    email: {type: String, required: true, minlength: lengthMessage(5, 'min'), maxlength: lengthMessage(100, 'max')},
    date_joined: {type: Date},
    note_ids: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    test_ids: [],
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

function lengthMessage(value, type){
  return type === "max" ? [value, "{PATH} has to be under {MAXLENGTH} characters but input had {VALUE} characters."]
                        : [value, "{PATH} has to be at least {MINLENGTH} characters long but input length had {VALUE} characters."];
}

//Export model
module.exports = mongoose.model('User', UserSchema);