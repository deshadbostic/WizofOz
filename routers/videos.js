const express=require('express');
const path=require('path');
const router=express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.json()); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/videos')
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname.substring(0, file.originalname.length - 4) + '-' + Date.now()+'.mp4')
    }
}); 
const upload = multer({ 
    storage: storage,  limits: {
    fileSize: 1024 * 1024 * 1000 // max 5mb for image size
},
fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
       return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
 }
});
router.get('/', function(req, res) {
    //await new Promise(resolve => setTimeout(resolve, 10000));
    if(('passport' in req.session)){
        if(('user' in req.session.passport)){
           //output videos
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

router.post('/addvideo', function (req, res) {
    console.log("does this works");
	if (!req.user) {
		req.flash("message","cant access unless logged in");
      return res.redirect("/");
	}
      upload.single('video')(req, res, function (error) {
        if (error) {
          console.log(`upload.single error: ${error}`);
          return res.sendStatus(500);
        }  
        console.log(req.file)
            const Image= {
                data: fs.readFileSync(path.join(process.cwd()+ '/public/images/videos/' + req.file.filename)),
                name: req.file.filename,
                contentType: 'video/mp4'
            }
    
                    console.log("blacnk is werird");
                    req.flash('message', 'you have sucessfully added a video');
                    console.log(res.session);
                    res.redirect('/admin/vmanager');
                })
           
});

module.exports =router;