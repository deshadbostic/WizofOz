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

const fs = require('fs');
const mysql = require('mysql');


//passport config
   //console.log(req.session)
require("./config/passport")(passport);
// db setup
app.use(require('connect-flash')());

var con = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "",
  database: "wozbase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//body parser setup
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 


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

let User= require('./models/users');

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
let users = require('./routers/users.js');
let videos = require('./routers/videos.js');
let admin = require('./routers/admin.js');

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
  res.render('index.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });

});



app.use(function(req,res){
    res.status(404).send('Unable to find the requested resource!');
});
const PORT=process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT,() =>console.log(`server started ${PORT}`));