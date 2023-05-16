const express=require('express');
const path=require('path');
const router=express.Router();
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
var db = require('../index');


const {Sequelize, Model, DataTypes } = require('sequelize')

const passport =require('passport');
router.use(bodyParser.json()); 

router.post('/register', function(req, res) {
 
    let newuser =  JSON.parse(req.body.regform);
     req.body= newuser; //may cause weird behaviour unsure
     const fname = newuser.fname;
     const lname = newuser.lname;
     const username = newuser.username;
     console.log(username);
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
   
     let errors = req.validationErrors();
   
     if(errors){
         console.log("sending reg error"+JSON.stringify(errors));
         req.flash('error',JSON.stringify(errors));
      res.redirect('/')
       return
     } else {
     let userid="11111111"+ Math.floor(1000 + Math.random() * 9000);
     console.log(userid);
     userid=parseInt(userid)
     User=db.User;
     let  newUser =User.build({
         Fname: fname,
         Lname: lname,
         Username: username,
         UserId:userid,
         Email: email,
         Password: password,
         Role: role
     });
    
     bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(newUser.Password,salt,(err,hash)=>{
           if(err){
               console.log('error at hash1'+err);
           }
           newUser.Password= hash;

            newUser.save()
           
            req.flash('message','you have sucessfully registered')
              console.log(res.session)
                req.login(newUser, function (err) {
                if ( ! err ){
                  console.log("logged in");
                   return res.redirect('/admin');
                } else {
                    //handle error
                    console.log("not logged in"+err);
                    return;
                }
              }); 
       });
     });
    }
 });


 router.post('/startstudy', function(req, res){
  const userid = req.body.userid;
  let groupid;
  
  // output videos
  Study = db.User;
  let studies = [];
  
  studies = Study.findOne({ 
    where: { Role: "user", UserId: userid }
  });
  
  // Joins probably would have been the better solution
  studies.then(function(studie) {
    if (studie) { //if user exists
      groupid = studie.Email; //email is where groupids are stored on users
      let responsesdb = db.GroupSequence;
      responselist = responsesdb.findAll({ 
        where: { groupid: groupid }
      });

      responselist.then(function(responses) { //got the response sequence for this group
        let responsesdb2 = db.Response;
        let videosdb = db.Video;
        
        //responses and videos
        if (responses) {  
          Promise.all(responses.map(individualgrpresponse => {
            const responsedata = responsesdb2.findOne({ where: { responseid: individualgrpresponse.responseid } });
            const videodata = videosdb.findAll({ where: { responseid: individualgrpresponse.responseid } });
          
            return Promise.all([responsedata, videodata]).then(([responsedataResult, videodataResult]) => {
              individualgrpresponse.dataValues.content = responsedataResult.contents;
              individualgrpresponse.dataValues.video = videodataResult.map(v => v.videoid);
            });
          })).then(() => {
            Promise.all(responses).then(resulto => {
              console.log(resulto[0]);
              res.render('launchstudy.ejs', { groupid: groupid, responses: JSON.stringify(resulto), error: req.flash('error') });
            });
          });
        } else {
          res.render('choosestudy.ejs', { error: req.flash("msg", 'no participant with this data') });
        }
      });
    } else {
      res.render('choosestudy.ejs', { error: req.flash("msg", 'no participant with this data') });
    }
  });
});


router.post('/login',function(req,res,next){
  console.log('the passport file is being reached check1');
  req.body
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
return res.redirect('/admin');
});

//res.redirect('/'+info);
})(req,res,next);

});

router.get('/logout',function(req, res){
    req.flash('message','you are loggred out');
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.initialised=undefined;
    req.session.passport=undefined;
    console.log('logged out');
    
    res.redirect('/');
    console.log('succesfully redirected');
    });
   
});

router.get('/fail',(req,res) =>{ 
    req.flash('success_msg','you are loggred out');
    console.log(req.flash('success_msg'));
    res.render('index.ejs',{ success_msg: req.flash('success_msg') });
  });


  router.get('/loadusers',function(req,res){
    const groupid = req.query.groupid;
    console.log(groupid);

    Study=db.User;
    let studies=[];
    studies=Study.findAll({ 
      where: { Role: "user",Email:groupid }
  })

  studies.then( function(studie) {  
    let studieso=[];
    console.log(studie);
    console.log(studie);
 
res.send(studie)
})
    
});

router.post('/removeuser',function(req,res,next){
  const userid = req.body.userlist;
  Study=db.User;
  let studies=[];
  studies=Study.destroy({
    where: {UserId:userid }
})

studies.then( function(studie) {  
  return res.redirect('/admin/');
})

});
  router.get('/',(req,res) =>{ 
    res.sendFile(__dirname+'/public/html/index.html');
  });


  
  router.post('/createuser', function(req, res) {
 
 //may cause weird behaviour unsure
     const groupid = req.body.groupid;
   console.log(groupid);

   
     let userid="00000000"+ Math.floor(1000 + Math.random() * 9000);
     console.log(userid);
     userid=parseInt(userid)
     User=db.User;
     let  newUser =User.build({
         Fname: "anonymous",
         Lname: "anonymous",
         Username: "testuser.username",
         UserId:userid,
         Email: groupid,
         Password: "password",
         Role: "user"
     });
    
     bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(newUser.Password,salt,(err,hash)=>{
           if(err){
               console.log('error at hash1'+err);
           }
           newUser.Password= hash;

            newUser.save()
            return res.redirect('/admin/participantmanager');
       });
     });
 });

 module.exports = router;   