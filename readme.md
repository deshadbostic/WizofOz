
Requirements
Node installed
Xampp/ mysql with same user name and server name can be found in index connection string

Guide
step 1 using vs code open npm scripts and run the installer script after that can run the devstart script

the start script is best used for server devstart script allows dev to restart server automatically on changes

there are 5 main sections model,index page,routers,public folder,package json

the model stores the different tables and is then converted to sql

the index page stores connection string and base routes along with being where all the different sections meet is the hear of the application

the routers are like the branches of the application and hold the logic for the routes

the public folder holds views instead of html and allows application to render severside code in the dom it also holds all the files sent to user this is sent in the index page

last part is the package json this is the real heart/brains of the application and this references the index file on start and holds the references and ver numbers of packages when installing using installer script this creates the node_modules folder that stores the packages and uses the package lock file as a acessory file to hold more information

Extra Files
some of the other files i should probably mention are the gitignore never remove the node_modules folder especially because it increases the load on sending files when using git also there is the .env which hold the environment variables

The most difficult file which is the passport.js this is what handles the logging in and logging out and creates the session this is a pretty complicated file compared to the other files but well documented online

Background information
This project was built from a calorie tracker project there may be some reminisces of that project still here especially in the public folder css and js feel free to cut down classes and functions that dont exsist

Author 

contact deshadbostic@gmail.com