const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = Schema(
  {
    title : {type: String, required: true, maxlength: 100},
    course: {type: String, required: true, maxlength: 100},
    date_created: {type: Date, default: Date.now},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  }
);

// Virtual for user's full name
NoteSchema
.virtual('date')
.get(function () {
  return (new Date(this.date_created)).toDateString();
});

// Virtual for user's URL
NoteSchema
.virtual('url')
.get(function () {
  return '/notes/note/' + this._id;
});

//Export model
module.exports = mongoose.model('Note', NoteSchema);