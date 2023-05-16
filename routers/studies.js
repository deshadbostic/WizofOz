const express=require('express');
const path=require('path');
const router=express.Router();
const bodyParser = require('body-parser');
var db = require('../index');


const {Sequelize, Model, DataTypes } = require('sequelize')

router.use(bodyParser.json()); 

router.get('/', function(req, res) {
    //await new Promise(resolve => setTimeout(resolve, 10000));
    if(('passport' in req.session)){
        if(('user' in req.session.passport)){
           //output videos
           Study=db.Study;
            let studies=[];
            studies=Study.findAll()
            
            studies.then( function(studie) {  
               let studieso=[];
               console.log(studie);
               console.log(studie);
            
        res.send(studie)
    })
           
}
}else{
   
     //output videos
     let videos=[];
     fs.readdir(process.cwd()+ '/public/images/videos/', function (err, files){
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        console.log(videos); 
        files.forEach(function (file) {
            // Do whatever you want to do with the file           
           videos.push(file)
           console.log(videos); 
        });
        res.send(videos);
     } );
 

}
});


router.get('/loadresponses', function(req, res) {
    //await new Promise(resolve => setTimeout(resolve, 10000));
    if(('passport' in req.session)){
        if(('user' in req.session.passport)){
           //output videos
           Study=db.Response;
            let studies=[];
            studies=Study.findAll()
            
            studies.then( function(studie) {  
               let studieso=[];
               console.log(studie);
               console.log(studie);
            
        res.send(studie)
    })
           
}
}else{
    res.statusCode(403);

}
});
router.post('/addstudy', function (req, res) {
	
    
  
     const name = req.body.name;
     const creator =req.session.passport.user;
     //req.checkBody('fname','Name is required').notEmpty();
     req.checkBody('name', 'Name is required').notEmpty();

     let errors = req.validationErrors();
   
     if(errors){
         console.log("sending reg error"+JSON.stringify(errors));
         req.flash('error',JSON.stringify(errors));
      res.redirect('/')
       return
     } else {
     let id= Math.floor(1000000 + Math.random() * 9000000);
     console.log(id);
     id=parseInt(id)
     Study=db.Study;
     let  newStudy =Study.build({
         id: id,
         name: name,
         creator: creator
     });
    

            newStudy.save()
           
            req.flash('message','you have sucessfully registered')
              console.log(res.session)
              res.redirect('/admin')
  
     }
});


router.post('/addgroup', function (req, res) {
	
    
  
    const name = req.body.name;
    //const creator =req.session.passport.user; 
    //req.checkBody('fname','Name is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();

    let errors = req.validationErrors();
  
    if(errors){
        console.log("sending reg error"+JSON.stringify(errors));
        req.flash('error',JSON.stringify(errors));
     res.redirect('/')
      return
    } else {
    let id= Math.floor(1000000 + Math.random() * 9000000);
    console.log(id);
    id=parseInt(id)
    Study=db.Group;
    console.log(name)
    let  newStudy =Study.build({
        groupid: id,
        groupname: name
    });
   

           newStudy.save()
          
           req.flash('message','you have sucessfully registered')
             console.log(res.session)
             res.redirect('/admin')
 
    }
});

router.get('/loadgroups', function(req, res) {
    //await new Promise(resolve => setTimeout(resolve, 10000));
    if(('passport' in req.session)){
        if(('user' in req.session.passport)){
           //output videos
           Study=db.Group;
            let studies=[];
            studies=Study.findAll()
            
            studies.then( function(studie) {  
               let studieso=[];
               console.log(studie);
               console.log(studie);
            
        res.send(studie)
    })
           
}else{
    console.log("not logged in");
}
    }
    })


module.exports =router;