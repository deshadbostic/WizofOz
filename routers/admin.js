const express=require('express');
const path=require('path');
const router=express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.json()); 


    router.get('/',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user)
        res.render('admin/home.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });
      router.get('/vmanager',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/videomanager.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });
      router.get('/responsemanager',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/responsemanager.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });
      
      router.get('/createstudy',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/createstudy.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });


      router.get('/researchmanager',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/researchmanager.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });


        router.get('/dw',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/createstudy.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });
module.exports =router;