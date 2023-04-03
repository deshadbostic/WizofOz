const express=require('express');
const path=require('path');
const router=express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.json()); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null , req.body.name + '-' + Date.now()+'.jpg')
    }
}); 
const upload = multer({ 
    storage: storage,  limits: {
    fileSize: 1024 * 1024 * 10 // max 5mb for image size
}});
router.get('/', function(req, res) {
    //await new Promise(resolve => setTimeout(resolve, 10000));
    if(('passport' in req.session)){
        if(('user' in req.session.passport)){
           //output videos
            let videos=[];
            console.log('videos'); 
        res.send(videos)
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
      upload.single('image')(req, res, function (error) {
        if (error) {
          console.log(`upload.single error: ${error}`);
          return res.sendStatus(500);
        }  
        console.log(req.file)
            const Image= {
                data: fs.readFileSync(path.join(process.cwd()+ '/public/images/uploads/' + req.file.filename)),
                name: req.file.filename,
                contentType: 'image/png'
            }
    
            let newuser = req.body;
            req.body = newuser; //may cause weird behaviour unsure
    
            console.log(req.body);
            const name = newuser.name;
            const foods = newuser.food;
            console.log(foods);
            const servingtype = newuser.serving_type;
            const createdby = req.session.passport.user;
            const type = "user";
console.log(foods);
            let newMeal= new Meals({
                name: name,
                img: Image,
                foods: foods,
                serving_size: servingsize,
                serving_type: servingtype,
                createdby: createdby,
                acc_type: type
            });
    
            newMeal.save((error) => {
                if (error) {
                    console.log('error at meal hash2' + error);
                    return;
                }
                else {
                    // handle the situation u would want to respond upon succcess 
                    console.log("blacnk is werird");
                    req.flash('message', 'you have sucessfully added a meal');
                    console.log(res.session);
                    res.redirect('/');
                }
            });
    })
});
router.post('/addfood', function (req, res) {
	if (!req.user) {
		req.flash("message","cant access unless logged in");
      return res.redirect("/");
	}

        //await new Promise(resolve => setTimeout(resolve, 10000));
        upload.single('image')(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      return res.sendStatus(500);
    }  
    console.log(req.file)
        const Image= {
            data: fs.readFileSync(path.join(process.cwd()+ '/public/images/uploads/' + req.file.filename)),
            name: req.file.filename,
            contentType: 'image/png'
        }

        let newuser = req.body;
        req.body = newuser; //may cause weird behaviour unsure

        console.log(req.body);
        const name = newuser.name;
        const calories = newuser.calories;
        const protein = newuser.protein;
        const carbs = newuser.carbs;
        const fats = newuser.fats;
        const sodium = newuser.Sodium;
        const cholestrol = newuser.cholestrol;
        const potassium = newuser.potassium;
        const servingsize = newuser.serving_size;
        const servingtype = newuser.serving_type;
        const createdby = req.session.passport.user;
        const type = "user";
      
        const micronutrients = {
             Vitamins: { 
                 'Fat Soluable':{
                     'Vitamin A':newuser.VitaminA ?newuser.VitaminA:0,
                     'Vitamin D':newuser.VitaminD? newuser.VitaminD:0,
                     'Vitamin E':newuser.VitaminE? newuser.VitaminE:0,
                     'Vitamin K':newuser.VitaminK? newuser.VitaminK:0
                },
                'Water Soluable':{
                    'Vitamin B1':newuser.VitaminB1 ?newuser.VitaminB1:0,
                    'Vitamin B2':newuser.VitaminB2 ?newuser.VitaminB2:0,
                    'Vitamin B3':newuser.VitaminB3 ?newuser.VitaminB3:0,
                    'Vitamin B5':newuser.VitaminB5 ?newuser.VitaminB5:0,
                    'Vitamin B6':newuser.VitaminB6 ?newuser.VitaminB6:0,
                    'Vitamin B7':newuser.VitaminB7 ?newuser.VitaminB7:0,
                    'Vitamin B9':newuser.VitaminB9 ?newuser.VitaminB9:0,
                    'Vitamin B12':newuser.VitaminB12 ?newuser.VitaminB12:0,
                    'Vitamin C':newuser.VitaminC ?newuser.VitaminC :0
                }
              },
            Minerals:{
                    'Macro Minerals':{
                        Sodium:newuser.Sodium?newuser.Sodium:0,
                        Calcium:newuser.Calcium?newuser.Calcium:0,
                        Magnesium:newuser.Magnesium?newuser.Magnesium:0,
                        Potassium:newuser.Potassium? newuser.Potassium:0,
                        Phosphorus:newuser.Phosphorus?newuser.Phosphorus:0,
                        Chloride:newuser.Chloride?newuser.Chloride:0,
                        Sulfur:newuser.Sulfur?newuser.Sulfur:0

                    },
                    'Trace Minerals':{
                        Iron:newuser.Iron?newuser.Iron:0,
                        Maganese:newuser.Maganese?newuser.Maganese:0,
                        Copper:newuser.Copper?newuser.Copper:0,
                        Zinc:newuser.Zinc?newuser.Zinc:0,
                        Iodine:newuser.Iodine?newuser.Iodine:0,
                        Fluoride:newuser.Fluoride?newuser.Fluoride:0,
                        Selenium:newuser.Selenium?newuser.Selenium:0
                    }
              } 
            };
        console.log(micronutrients.Vitamins['Fat Soluable']['Vitamin A']);
        let newFood = new Foods({
            name: name,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fats: fats,
            sodium: sodium,
            cholestrol: cholestrol,
            img: Image,
            potassium: potassium,
            micro_nutrients: micronutrients,
            serving_size: servingsize,
            serving_type: servingtype,
            createdby: createdby,
            acc_type: type
        });

        newFood.save((error) => {
            if (error) {
                console.log('error at food hash2' + error);
                return;
            }
            else {
                // handle the situation u would want to respond upon succcess 
                console.log("blacnk is werird");
                req.flash('message', 'you have sucessfully added a food');
                console.log(res.session);
                res.redirect('/');
            }
        });
    })
    });
module.exports =router;