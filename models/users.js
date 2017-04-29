const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Note = require('./notes');

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

class UserClass{
  get name(){
    return `${this.last_name.charAt(0).toUpperCase() + this.last_name.substr(1)}, ${this.first_name.charAt(0).toUpperCase() + this.first_name.substr(1)}`;
  }
  get url(){
    return '/users/user/' + this._id;
  }
  
  getNotes(callback){
    Note.find({owner : this._id}, (err, notes) => {
      callback && callback(err, notes);
    });
  }
  
  addNotes(note, callback){
    let noteData = {
      title : note.title || note.note._meta.TITLE || `untitled-${Math.random().toString(36).substr(2,9)}`,
      course : note.course || note.note._meta.CLASS,
      date_created : note.note._meta.DATE,
      owner : this,
      info : Object.assign(note, note.note._meta.page && {page : note.note._meta.page}),
    };
    delete note.note._meta;

    Note.create(noteData, (err, new_note) => {
      callback && callback(err, new_note);
    });
    
  }
  
  static getUser(user_name, callback){
   this.findOne({username: user_name}, callback); 
  }
  
  static addUser(userInfo, callback){
    this.exists(userInfo, (userExists) => {
      if (!userExists){
        let userM = mongoose.model('User', UserSchema);
        if (userInfo.password.length === 0)
          callback({name: "ValidationError", errno : -4, message: "Password field cannot be empty"}, null);
        else if (userM.schema.tree.password.minlength && userInfo.password.length < userM.schema.tree.password.minlength[0])
          callback({name: "ValidationError", errno : -5, message: `Password has to be at least ${userM.schema.tree.password.minlength[0]} characters long` }, null);
        else{
          bcrypt.hash(userInfo.password, 10, function(err, hash){
            userInfo.password = hash;
            mongoose.model('User', UserSchema).create(userInfo, (err, new_user) => {
              if (err) console.error(err);
              console.log(new_user);
              callback(err, new_user);//TODO: might not want to return user
            });
          });
        }
        
      }else{
        //TODO: correctly use errors
        callback({name: "ValidationError", errno : -1, message: "username is already used"}, null);
      }
    });
  }
  
  static login(userData, callback){
    this.findOne({username: userData.username}, (err, user) => {
      if (err){
        callback(err, user);
        return;
      }
      if (user !== null){
        bcrypt.compare(userData.password, user.password, function(err, res) {
          if (err) {
            callback(err, user);
            return;
          }
          if(res){
            callback(null, user);
          }else{
            //TODO: correctly use errors
            console.log({errno: -3, message: "Incorrect username/password"});
            callback({name: "dberror", errno: -3, message: "Incorrect username/password"}, null);
          }
        });
      }else{
        //TODO: correctly use errors
        console.log({errno: -2, message: "Incorrect username/password"});
        callback({name: "dberror", errno: -2, message: "Incorrect username/password"}, null);
      }
    });
  }
  
  static exists(userData, callback){
    this.count({username : userData.username}, (err, count) => {
      if (err) console.error(err);
      callback(count >= 1);
    });
  }
  
  
}

UserSchema.loadClass(UserClass);

function lengthMessage(value, type){
  return type === "max" ? [value, "{PATH} has to be under {MAXLENGTH} characters but input had {VALUE} characters."]
                        : [value, "{PATH} has to be at least {MINLENGTH} characters long but input length had {VALUE} characters."];
}

module.exports = mongoose.model('User', UserSchema);