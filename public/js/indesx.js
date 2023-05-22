
var loginstatus;

  
function toggleelement(element){
    if(element){
            let x = document.getElementById(element);
            let z = document.getElementsByTagName('body')[0]; 

            if ( !(x.classList.contains('visibilityoff'))) {
                console.log("fwafr");
                x.classList.add('visibilityoff');
                z.classList.remove('auto');
            } else {
                x.classList.remove('visibilityoff');
              z.classList.add('auto');
            }
    }
}

 function loadvideos(){
    $.ajax({
        url:"/videos/",
        type:"GET",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(response){
             console.log(response);
       implementvideolist( response);
}
    });
}
function implementvideolist(foodlist){
    let select = document.getElementById("videolist"); 
    select.innerHTML="";
    // console.log( foodlist);
    for(let i = 0; i <  foodlist.length; i++) {
        let opt =  foodlist[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value =foodlist[i];
        select.appendChild(el);
    }
      }


      function loadstudies(){
        $.ajax({
            url:"/study/",
            type:"GET",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(response){
                 console.log(response);
           implementstudylist( response);
    }
        });
    }


    function loadgroups(){
        $.ajax({
            url:"/study/loadgroups",
            type:"GET",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(response){
                 console.log(response);
           implementgrouplist( response);
    }
        });
    }
    function implementstudylist(foodlist){
        let select = document.getElementById("studylist"); 
        select.innerHTML="";
         console.log( foodlist[0]);
        for(let i = 0; i <  foodlist.length; i++) {
            let opt =  foodlist[i].name;
            let el = document.createElement("option");
            el.textContent = opt;
            el.value =foodlist[i].id;
            select.appendChild(el);
        }
          }

          function loadusers(groupid){
            $.ajax({
                url:"/users/loadusers",
                type:"Get",
                data: {groupid:groupid},
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(response){
                     console.log(response);
               implementuserlist( response);
        }
            });
        }
        function implementuserlist(foodlist){
            let select = document.getElementById("userlist"); 
            select.innerHTML="";
             console.log( foodlist[0]);
            for(let i = 0; i <  foodlist.length; i++) {
                let opt =  foodlist[i].UserId;
                let el = document.createElement("option");
                el.textContent = opt;
                el.value =foodlist[i].UserId;
                select.appendChild(el);
            }
              }

          function loadresponses(){
            $.ajax({
                url:"/study/loadresponses",
                type:"GET",
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(response){
                     console.log(response);
               implementresponselist( response);
        }
            });
        }
        function implementresponselist(foodlist){
            let select = document.getElementById("responselist"); 
            select.innerHTML="";
             console.log( foodlist[0]);
            for(let i = 0; i <  foodlist.length; i++) {
                let opt =  foodlist[i].contents;
                let el = document.createElement("option");
                el.textContent = opt;
                el.value =foodlist[i].responseid;
                select.appendChild(el);
            }
              }

                function implementgrouplist(foodlist){
            let select = document.getElementById("grouplist"); 
            select.innerHTML="";
             console.log( foodlist[0]);
            for(let i = 0; i <  foodlist.length; i++) {
                let opt =  foodlist[i].groupname;
                let el = document.createElement("option");
                el.textContent = opt;
                el.value =foodlist[i].groupid;
                select.appendChild(el);
            }
              }

function loadsignup(){
    console.log('worked');
    let closelogin=document.getElementsByClassName('login');
    closelogin[1].style.display="none";
    let main =document.getElementsByTagName('main');
    let regpage=document.getElementById('registration');
    regpage.style.display="block";
    regpage.style.gridArea="calinfo";
    let input= document.getElementById('inputsection');
    input.style.display="none";
    let title=document.getElementsByClassName("websitename");
    title[0].style.fontSize="5vw";
     changeprimary("signup");
    let signup=document.getElementsByClassName('signup');
    signup[1].style.display="block";
    let xbutton=document.getElementById('xbutton');
    xbutton.style.display="block";
}
function loadlogin(){
    console.log('worked');
    let closesignup=document.getElementsByClassName('signup');
    closesignup[1].style.display="none";
    let main =document.getElementsByTagName('main');
    let regpage=document.getElementById('registration');
    regpage.style.display="block";
    regpage.style.gridArea="calinfo";
    let title=document.getElementsByClassName("websitename");
    title[0].style.fontSize="5vw";
    changeprimary("login");
    let input= document.getElementById('inputsection');
    input.style.display="none";
    
    let login=document.getElementsByClassName('login');
    login[1].style.display="block";
    let xbutton=document.getElementById('xbutton');
    xbutton.style.display="block";
}

function closel (){
    console.log("xbutotn functionay");
    
    let close=document.getElementById('xbutton');
    close.parentElement.parentElement.style.display="none"
     let main =document.getElementsByTagName('main');
     let marginreduc =document.getElementsByClassName("websitename")[0];
     marginreduc.classList.remove("marginreduc");
     let title=document.getElementsByClassName("websitename");
     title[0].style.fontSize="6vw";
    let input= document.getElementById('inputsection');
    input.style.display="block";
     changeprimary();
}

function changeprimary(caller){

    let body=document.getElementsByClassName('maincontainer')[0];
    let main =document.getElementsByTagName('main')[0];
    let css=getComputedStyle(body);
    let pb;
    if(caller){
         pb=css.getPropertyValue('--dropdown-background');
         main.classList.add("regis");
         main.classList.remove("home");
    }else{
        main.classList.add("home");
        main.classList.remove("regis");
      pb=css.getPropertyValue('--primary-background');
    }
    
    body.style.backgroundColor=pb;
}


// login and signin




function login(){
    if(!logincheck())
    {
        return false;
    }
    let uname=document.getElementsByClassName('login');
    let profile=document.getElementsByClassName('loadedprofile');
    let regbtns=document.getElementById('registrationbtns');
    regbtns.style.display="none";
    uname[0];
   profile[0].style.display="block";
   profile[1].style.display="block";
    let close=document.getElementById('xbutton');
    close.parentElement.parentElement.style.display="none"
    let main =document.getElementsByTagName('main');
    main[0].style.display="block";
    pic="water.jpg";
    let x = uname[0];
     loginstatus=true;
     return true;
}
function logincheck(){
    let loginclass=document.getElementsByClassName('login');
   //getting data 
   let logindata =[];
   for(let x=3;x<5;x++){
    logindata[x-3]=loginclass[x].value;
   }
    //data checks 
   if(false){
       return false
   }
   //creating object
    let loginobj= {email:logindata[0],password:logindata[1]};
    //data sendoff
   
   // signupobj= JSON.stringify(signupobj);
   
    //console.log(loginobj);
    return true ;
    // loginpost(loginobj);
   }
   function loginpost(loginobj){
    // making post
    alert("Remove once confirmed");
    $.ajax({
        url:"http://127.0.0.1:5000/users/login",
        type:"POST",
        data:JSON.stringify(loginobj),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(response){
            console.log(res+"she see d in her face nickname her blueray");
            if(response.retStatus === 'Success') {
                // not sure what did you mean by ('/team' && '/team' !== "")
                // if('/team' && '/team' !== "") {
                if (response.redirectTo) {
                    window.location = response.redirectTo;
                }
            }
        console.log(res+"she see d in her face nickname her blueray");
        }
      })
    // $.post('https://3f42bf84-d8cd-42bb-a2a9-d8115ae9f86e.mock.pstmn.io/users',signupobj,(res)=>{
        
    // },"json");
    
    }
    function loginstate(){
        if(loginstatus){
            return true;
        }else{
            return false;
        }
       }

    function checkifloggedin(){
         if(loginstate()){
            alert("logged in");
            let lp=document.getElementsByClassName("loadedprofile");
          lp[0].style.display="block";
          lp[1].style.display="block";
         }
    } 
   function signuphandler(senderinfo){
    if(senderinfo=="form"){
        if(signupcheck()){
        return true;
        }else{
            let page;
            //additional behaviourr
            //find first page with error
           changescreen(()=>{ 
            let spart=document.getElementsByClassName("signupparts");

            page= (spart[2].contains('signuperr') ) ?  2  : page;
            page= (spart[1].contains('signuperr') ) ?  1  : page;
            page= (spart[0].contains('signuperr') ) ?  0  : page;
            return page;
            });
         return false;
        }
    }
    if(senderinfo=="button"){
        if(document.getElementById('spart3').style.display=="block"){
            if(signupcheck()){
                nextsignuppage();
                return true;
            }else{
                let page;
                //additional behaviourr
                //find first page with error
                let callbac=()=>{ 
                    let spart=document.getElementsByClassName("signupparts");
        
                    page= (spart[2].classList.contains('signuperr') ) ?  2  : page;
                    page= (spart[1].classList.contains('signuperr') ) ?  1  : page;
                    page= (spart[0].classList.contains('signuperr') ) ?  0  : page;
                    return page;
                    }
               changescreen(callbac());
               
             return false;
                
        }
    }
return nextsignuppage();
    }
if(!senderinfo||true){
    console.error("no valid sender");
  throw err;
  return;
}
   }

    function nextsignuppage(){
        let page;
        let currpage;
        currpage=findcursignuppage();
        page=currpage+1;
        if(page==3){
            signupbtn.setAttribute("type", "submit");
        }
changescreen(page); 


return ;
    }

function findcursignuppage(){
    let currpage;
    let spart=document.getElementsByClassName("signupparts");
    if(spart[0].style.display=="block"||spart[0].style.display==""){
        currpage=0;
      }else if(spart[1].style.display=="block"){
        currpage=1;
      }else if(spart[2].style.display=="block"){
      currpage=2
      }else{
          return;
      }
      return currpage;
}
function signup(state){
     if(state=="notdone"){
        nextsignuppage();
      return ;
     }
    return ;
    let uname=document.getElementsByClassName('signup');
    let profile=document.getElementsByClassName('loadedprofile');
    let regbtns=document.getElementById('registrationbtns');
    regbtns.style.display="none";
    uname[0];
   profile[0].style.display="block";
   profile[1].style.display="block";
    let close=document.getElementById('xbutton');
    close.parentElement.parentElement.style.display="none"
    let main =document.getElementsByTagName('main');
    main[0].style.display="block";
    pic="water.jpg";
    let x = uname[0];
     loginstatus=true;
     alert('you have been signed up');
}
function changescreen(page){
let spart=document.getElementsByClassName("signupparts");
let signupbtn=document.getElementById("signupbtn");
let svg=document.getElementsByTagName("svg");
if(page==0){
    spart[1].style.display="none";
    spart[2].style.display="none";
    svg[1].style.display="inline";
    svg[2].setAttribute("onclick", "changescreen(1)");
    svg[3].style.display="none";
    spart[0].style.display="block";
    signupbtn.innerText="Next";
}
if(page==1){
    spart[0].style.display="none";
    spart[2].style.display="none";
    svg[1].style.display="none";
    svg[2].setAttribute("onclick", "changescreen(0)");
    svg[3].style.display="inline";
    spart[1].style.display="block";
    signupbtn.innerText="Next";
}
if(page==2){
    spart[1].style.display="none";
    spart[0].style.display="none";
    spart[2].style.display="block";
    signupbtn.innerText="Sign up";
}
return;
}

function signupcheck(){
 let signupclass=document.getElementsByClassName('signup');
 //getting data 
 let signupdata =[];
 let signuperr="";
 let err=false;
 for(let x=3;x<12;x++){
    signupdata[x-3]=signupclass[x].value;
 } 
 //data checks 

 //check if filled
 for(let x=0;x<8;x++){
    if(!signupdata[x]){
        err=true;
        signuperr+="not filler";
        
     }
   }
//limit inputs to signups
let signupfields=document.getElementsByClassName("signup");
 //check if right type
 for (var a = signupfields.length, i = 0; i < a; i++) {
 
        instantValidation(signupfields[i]);
  }
 //check for invalid characters
if(signupdata[0]){

}

//handle appropriate errors

//creating object
 let signupobj= {fname:signupdata[0],lname:signupdata[1],gender:signupdata[3],email:signupdata[2],password:signupdata[4],role:signupdata[6],username:signupdata[7],cal_total:parseInt(signupdata[7]),allergies:signupdata[8]};
 //data sendoff

// signupobj= JSON.stringify(signupobj);

//set signuperr class on spart
if(err){
    alert(signuperr);
    //if apge 1 has a error set err class
if(true){
    //set error
let spart=document.getElementsByClassName('signupparts');
spart[0].classList.add("signuperr");
}

    return false;
}
 console.log(signupobj);
  signuppost(signupobj);
  return true;
}

 
function signuppost(signupobj){
// making post
// $.ajax({
//     url:"http://127.0.0.1:5000/users/register",
//     type:"POST",
//     data:JSON.stringify(signupobj),
//     contentType:"application/json; charset=utf-8",
//     error: function(XMLHttpRequest, textStatus, errorThrown) { 
//         console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
//     }   ,
//     success: function(res){
//         if (res.redirect) {
//         // data.redirect contains the string URL to redirect to
//             window.location.href = res.redirect;
//       }
//       $("body").html(res);
//       console.log("working");
//     console.log(res);
//     }
//   })


regform=document.getElementById('regform');
regform.value=JSON.stringify(signupobj);
// $.post('https://3f42bf84-d8cd-42bb-a2a9-d8115ae9f86e.mock.pstmn.io/users',signupobj,(res)=>{
    
// },"json");

}

   
  checkifloggedin();
