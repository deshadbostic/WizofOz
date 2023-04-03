const localStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const database = require('./database');
const bcrypt= require('bcryptjs');
const passport = require('passport');

module.exports = function (passport) {
//local strategies 
console.log('the passport file is being reached check 2');
passport.use( 'local',new localStrategy({
  // local strategy uses username and password. These settings are overriding the values.
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},(req,email,password,done)=>{ 
 
    let query ={email:email};
 console.log('the passport file is being reached check 3');
    Users.findOne(query,(err,user)=>{
      if (err) { 
        console.log('Error :', err);
        return done(err); 
      }
      if (!user){
        console.log('Incorrect username:');
        console.log(req.session)
          return done(null,false,{message:"no user found"});
      }
      bcrypt.compare(password,user.password,(err,isMatch)=>{
        if (err) { 
          console.log('Error :', err);
          return done(err); 
        }
         if(isMatch){
           console.log("logged in");
             return done(null,user);
         }
         else {
           console.log("didnt probably wrong pass work");
            return done(null,false,{message:"password incorrect"});
         }
      });
    });

}));

passport.serializeUser(function(user, done) {
  console.log('seession started');
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('seesion ended');
   // console.log(id)
    Users.findById(id, function(err, user) {
      console.log("note user found")
      done(err, user);
    });
  });

//   passport.deserializeUser(function(id, done) {
//     console.log('seesion ended');
//     // User.findById(id, function(err, user) {
    
//     // }); 
//     let err=null;
//      done(err, { firstName: 'Foo', lastName: 'Bar' });
//   });
// } 
}
