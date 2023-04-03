const express=require('express');
const path=require('path');
const router=express.Router();
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
let User= require('../models/users');
const passport =require('passport');
router.use(bodyParser.json()); 

router.post('/register', function(req, res) {
    let newuser =  JSON.parse(req.body.regform);
     req.body= newuser; //may cause weird behaviour unsure
     const fname = newuser.fname;
     const lname = newuser.lname;
     const username = newuser.username;
     const email = newuser.email;
     const password = newuser.password;
     const password2 = newuser.password2;
     const role= newuser.role;
     const cal_total = newuser.cal_total;
     const allergies = newuser.allergies;
     //req.checkBody('fname','Name is required').notEmpty();
     req.checkBody('fname', 'Name is required').notEmpty();
     req.checkBody('lname', 'Name is required').notEmpty();
     req.checkBody('username', 'Name is required').notEmpty();
     req.checkBody('email', 'Email is required').notEmpty();
     req.checkBody('email', 'Email is not valid').isEmail();
     req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('role', 'Name is required').notEmpty();
    req.checkBody('cal_main', 'Name is required').notEmpty();
    req.checkBody('cal_total', 'Name is required').notEmpty();
    req.checkBody('allergies', 'Name is required').notEmpty();
     let errors = req.validationErrors();
   
     if(errors){
         console.log("sending reg error"+JSON.stringify(errors));
         req.flash('error',JSON.stringify(errors));
      res.redirect('/')
       return
     } else {
      
     let  newUser = new User({
         fname: fname,
         lname: lname,
         username: username,
         UserId:userid,
         email: email,
         password: password,
         Role: role
     });
    
     bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(newUser.password,salt,(err,hash)=>{
           if(err){
               console.log('error at hash1'+err);
           }
           newUser.password= hash;
           newUser.save((error)=>{
            if(error){
                console.log('error at hash2'+error+allergies);
                return;
            }
            else{
              // handle the situation u would want to respond upon succcess 
              console.log("blacnk is werird");
              req.flash('message','you have sucessfully registered')
              console.log(res.session)
                req.login(newUser, function (err) {
                if ( ! err ){
                  console.log("logged in");
                   return res.redirect('/');
                } else {
                    //handle error
                    console.log("not logged in");
                    return;
                }
              });
           console.log("not logged in");
            }
           })
       });
     });
    }
 });


router.post('/login',function(req,res,next){
    console.log('the passport file is being reached check1');
    
// passport.authenticate('local',{
//     successRedirect:'/',
//     failureRedirect:'/fail',
//     failureFlash: true
// })
// (req,res,next); 

passport.authenticate('local',(error,user,info)=>{
//This will print: 'Missing credentials'
if (error) { next(err); }
if (!user) { req.flash('error',info.message) ; return res.redirect('/'); }

req.logIn(user, function(err) {
  if (err) { return next(err); }
  // req.session.save(function(err) {
  //   // session saved
  // })
  console.log( req.isAuthenticated());
  req.session.initialised="test"
  req.flash("message","sucessfully logged in");
  console.log(req.session)
  return res.redirect('/');
});

//res.redirect('/'+info);
})(req,res,next);

});

router.get('/logout',function(req, res){
    req.flash('message','you are loggred out');
    req.logout();
    req.session.initialised=undefined;
    req.session.passport=undefined;
    console.log('logged out');
    
    res.redirect('/');
    console.log('succesfully redirected');
});

router.get('/fail',(req,res) =>{ 
    req.flash('success_msg','you are loggred out');
    console.log(req.flash('success_msg'));
    res.render('index.ejs',{ success_msg: req.flash('success_msg') });
  });

  router.get('/',(req,res) =>{ 
    res.sendFile(__dirname+'/public/html/index.html');
  });
  

 module.exports = router;   