const express=require('express');
const path=require('path');
const router=express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
var db = require('../index');
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

      router.get('/participantmanager',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/participantmanager.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });


      router.get('/addvideoes',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/addvideo.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
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


        router.post('/editstudy',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);

        const name = req.body.studyname;
     console.log(name);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render(`admin/editstudy.ejs`,{ name: name,error:req.flash('error') });
      
      });
      router.post('/editvideos',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);

        const name = req.body.videoname;
     
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/editvideo.ejs',{ name: name,error:req.flash('error') });
      
      });
      router.post('/attachresponse',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);

        const group = req.body.groupname;
        const option = req.body.optionname;

        Study=db.GroupSequence;

        let  newStudy =Study.build({
          groupid: group,
          responseid: option,
         sequence: 4
      });
     
 
             newStudy.save()
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/responsemanager.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });

      router.post('/attachvidtoresponse',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);

        const video = req.body.videoname;
        const option = req.body.optionname;

        Study=db.Video;

        let  newStudy =Study.build({
          videoid: video,
          responseid: option
      });
     
 
              newStudy.save()
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/videomanager.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
      });

      router.post('/addresponse',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        

        const name = req.body.studyname;
        const response = req.body.response;
        const id=Math.floor(1000000 + Math.random() * 9000000);
        Study=db.Response;

        let  newStudy =Study.build({
          responseid: id,
          contents: response,
          "research study": name
      });
     
 
             newStudy.save()
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/editstudy.ejs',{ name: name, error:req.flash('error') });
      
      });
      router.post('/addprompt',(req,res) =>{ 
        //req.flash('message','custom message from flash')
        console.log(req.isAuthenticated());
        console.log(req.session);
        const name = req.body.studyname;
        const prompt = req.body.prompt;
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/editstudy.ejs',{ name: name,error:req.flash('error') });
      
      });
      router.get("/creategroup",(req,res)=>{
        console.log(req.isAuthenticated());
        console.log(req.session);
        //console.log(req.flash('error')[0]);
        //console.log(res.locals.user) 
        res.render('admin/creategroup.ejs',{ success_msg: req.flash('message'),error:req.flash('error') });
      
    })

    router.post("/editgroup",(req,res)=>{
      console.log(req.isAuthenticated());
      console.log(req.session);
      const groupid = req.body.groupid;
      //console.log(req.flash('error')[0]);
      //console.log(res.locals.user) 
      res.render('admin/editgroup.ejs',{ groupid:groupid,error:req.flash('error') });
    
  })
module.exports =router;