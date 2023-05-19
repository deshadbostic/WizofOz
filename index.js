const express=require('express');
const path=require('path');
const app=express();
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/database');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors= require('cors')
const {Sequelize, Model, DataTypes } = require('sequelize')

const fs = require('fs');
const mysql = require('mysql');




var db = {};
const sequelize = new Sequelize("wozbase","root","",{
  host: "localhost",
  dialect: "mysql",
  dialectModule:require("mysql2"),
  define: {
    timestamps: false
}
});

sequelize.authenticate().then(() => {
  console.info('INFO - Database connected.')
    // Export db as a module
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
        module.exports.db = db;
        let User= require('./models/users');
        let Study= require('./models/studies');
        let Response= require('./models/responses');
        let Group= require('./models/group');
        let GroupSequence= require('./models/groupseq');
        let Video= require('./models/videos');
        db.Video=Video.Video
        db.GroupSequence=GroupSequence.GroupSequence
        db.Group=Group.Group
        db.Response=Response.Response
        db.User= User.User;
        db.Study= Study.Study;
        module.exports.db = db;
        require("./config/passport")(passport);
       
 })
 .catch(err => {
  console.error('ERROR - Unable to connect to the database:', err)
 })

  module.exports = db;
  
//body parser setup
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

require('dotenv').config();
//passport config
   //console.log(req.session)

// db setup
app.use(require('connect-flash')());


app.use(cors({
  origin: process.env.DOMAIN_NAME,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: false
}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5000");
//   res.header('Access-Control-Allow-Methods', 'DELETE, PUT,GET,POST');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   if ('OPTIONS' == req.method) {
//      res.sendStatus(200);
//    }
//    else {
//      next();
//    }});


const multer = require('multer');
  


//bring in dbmodels



app.use(cookieParser('pass'));
//express session middleware
  app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized:true ,
      rolling: true,
      cookie: { maxAge:3000000,secure:false}
  }));

//passport middleware
app.use(passport.initialize());
  app.use(passport.session());

//express mesages middleware




app.use(flash());

//Global variables
app.use((req,res,next)=>{
   res.locals.success_msg="test";       // req.flash("success_msg");
   res.locals.error_msg=  null;       //req.flash('error_msg');
   res.locals.message=    null;       //req.flash("message");
   res.locals.errors=     null;       //req.flash('errors');
   res.locals.error =     null;       //req.flash("error");
   res.locals.success =   null;       //req.flash("success");
  res.locals.messages =   null;       //req.flash("messages");

 next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


 //router files

 let videos = require('./routers/videos.js');
 let admin = require('./routers/admin.js');
 let users = require('./routers/users.js');
 let studies = require('./routers/studies.js');
 app.use('/study',studies);
        app.use('/users',users);
 
 app.use('/videos',videos);
 
 app.use('/admin',admin);

app.use(express.static(path.join(__dirname,"public" )));
app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

app.get('/jquery.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.js');
});

app.get('*',(req,res,next)=>{
  res.locals.user = req.user || null; //sends all user data needs breaking down
  next();
});
app.get('/',(req,res) =>{ 
  //req.flash('message','custom message from flash')
  console.log(req.isAuthenticated());
  console.log(req.session);
  //console.log(req.flash('error')[0]);
  //console.log(res.locals.user)

  if(('passport' in req.session)){
    if(('user' in req.session.passport)){
       //output videos
       return res.redirect('/admin');
}
}else{
  res.render('index.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
}


});
app.get('/carryoutstudy',(req,res) =>{ 
  //req.flash('message','custom message from flash')
  console.log(req.isAuthenticated());
  console.log(req.session);
  //console.log(req.flash('error')[0]);
  //console.log(res.locals.user)
  res.render('choosestudy.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });

});

app.get('/thankyou',(req,res) =>{ 
  //req.flash('message','custom message from flash')
  console.log(req.isAuthenticated());
  console.log(req.session);
  //console.log(req.flash('error')[0]);
  //console.log(res.locals.user)
  res.render('thankyou.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });

});



app.use(function(req,res){
    res.status(404).send('Unable to find the requested resource!');
});
const PORT=process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT,() =>console.log(`server started ${PORT}`));

