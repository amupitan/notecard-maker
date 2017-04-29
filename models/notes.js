const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = Schema(
  {
    title : {type: String, maxlength: 100, required: true},
    course: {type: String, required: true, maxlength: 100},
    date_created: {type: Date, default: Date.now},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    info : {}
  }
);


class NoteClass{
  get date(){
    return (new Date(this.date_created)).toDateString();
  }
  
  get url(){
    return '/notes/note/' + this._id;
  }
  
  get cards(){
    return [...this.info.cards];
  }
  
  static getNote(id, callback){
    this.findOne({_id: id}).populate('owner').exec(callback); 
  }
}

NoteSchema.loadClass(NoteClass);

module.exports = mongoose.model('Note', NoteSchema);