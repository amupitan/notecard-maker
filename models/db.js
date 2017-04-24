const mongoose = require('mongoose');

//import models
const User = require('./users');

var bcrypt = require('bcrypt');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/np';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

class database{
  constructor(){
    
  }
  
  static addUser(userInfo, callback){
    User.count({username : userInfo.username}, function(err, count){
      if (err) throw err;
      if (count === 0){
        bcrypt.hash(userInfo.password, 10, function(err, hash){
          userInfo.password = hash;
          User.create(userInfo, (err, new_user) => {
            if (err) throw err;
            console.log(new_user);
          });
        });
        
      }else{
        //TODO: correctly use errors
        callback({name: "dberror", errno : -1, message: "username is already used"}, null);
        // console.log(userInfo.result);
      }
    });
  }
  
  static login(userData, callback){
    User.findOne({username: userData.username}, (err, user) => {
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
  
  static saveNotes(user, notes, callback){
  
  }
}


// var new_user = new User({ first_name: 'John', last_name: 'Doe', username: 'mich', password: 'mich' });
let temp_user = { first_name: 'John', last_name: 'Doe', username: 'michelu', password: 'mich' };
// database.addUser(temp_user);
// database.login({username : 'michelua', password: 'mich'}, function(err, res){
//   if (err) throw err;
//     console.log(res);
// });

module.exports = database;
