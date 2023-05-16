const localStrategy = require('passport-local').Strategy;
const db = require('../models/users');
const database = require('./database');
const bcrypt= require('bcryptjs');
const passport = require('passport');
const Users=db.User;
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
   Users.findOne({ where:query}).then( function(user) {  
      if (!user){
        console.log('Incorrect username:');
        console.log(req.session)
          return done(null,false,{message:"no user found"});
      }
      bcrypt.compare(password,user.Password,(err,isMatch)=>{
        if (err) { 
          console.log('Error :', err);
          return done(err); 
        }
         if(isMatch){
           console.log("logged in off");
             return done(null,user);
         }
         else {
           console.log("didnt probably wrong pass work");
           console.log(password+user.Password);
            return done(null,false,{message:"password incorrect"});
         }
      });
    });

}));

passport.serializeUser(function(user, done) {
  console.log('seession started');
    done(null, user.UserId);
  });
  
  passport.deserializeUser(function(UserId, done) {
    console.log('seesion ended');
     Users.findByPk(UserId) .then( function(user) {
      console.log("note user found"+user)
      done(null, user);
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
