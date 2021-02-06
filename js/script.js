'use strict'
let mainColor =localStorage.getItem('main-color');
let backgroundOption= localStorage.getItem('backgroundOption');
let bulletOpsStorage = localStorage.getItem('displayBullets');

let landingPage = document.querySelector('.landing-page');
//let arrImg = ["surf01.jpg","surf02.jpg","surf03.jpg","surf05.jpg","surf06.jpg"];
// let arrImg =["bg1.jpg","bg2.jpg","bg5.jpg","bg4.jpg","bg5.jpg"];
let arrImg =["https://images.app.goo.gl/xpnC3LTmqLrPWgZM7","https://images.app.goo.gl/xpnC3LTmqLrPWgZM7","https://images.app.goo.gl/xpnC3LTmqLrPWgZM7"];
https://images.app.goo.gl/xpnC3LTmqLrPWgZM7
let optionBG = true;
let intervalBG;
let navBullets    = document.querySelector('.nav-bullets');
let bulletsOption = document.querySelectorAll('.settings-box .navigation-bullets span');

//---------------------
// if(localStorage != null){
//    //---------------main color --------
//    document.documentElement.style.setProperty('--main-color',mainColor);
//    document.querySelectorAll('.color-list li').forEach(element=>{
//       element.classList.remove('active');
//       if(element.dataset.color==mainColor){
//         element.classList.add('active');
//       }
//    });
//    //---------background---------------
//    document.querySelectorAll('.random-background span').forEach(element =>{
//      element.classList.remove('active');
//    });

//       if(backgroundOption == 'true'){
//          optionBG = true;
//          document.querySelector('.random-background .yes').classList.add('active');
//       }
//       if(backgroundOption == 'false'){
//          optionBG = false;
//          document.querySelector('.random-background .no').classList.add('active');
//       }
//    //---------bullets------------
//    bulletsOption.forEach(span=>{
//             span.classList.remove('active');
//    });
    
//       if(bulletOpsStorage === 'block'){
//          navBullets.style.display = 'block';
//          document.querySelector('.navigation-bullets .yes').classList.add('active');
//       }else{
//          navBullets.style.display = 'none';
//          document.querySelector('.navigation-bullets .no').classList.add('active');
//       }
// }//end local storage



 document.querySelector('.icon-settings .fa-cog').onclick = function(){
    this.classList.toggle('fa-spin');
    document.querySelector('.settings-box').classList.toggle('open');
   
 }
 //function to remove class active from elemnt and add it to clickabel element
  function switchClass(ev,elnm){
   ev.target.parentElement.querySelectorAll('.active').forEach(elnm => {
      elnm.classList.remove('active');
      
   });
   ev.target.classList.add('active');
  }

//Switch colors controller
 const myClassList = document.querySelectorAll('.color-list li');
 myClassList.forEach(li=> {
  li.addEventListener('click',(e)=>{
     document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
     localStorage.setItem('main-color',e.target.dataset.color);
     switchClass(e,li);
    })
 });

 //switch backgrouns controller
  const backgroundEl = document.querySelectorAll('.random-background span');
   backgroundEl.forEach(span=>{
        span.addEventListener('click',(s)=>{
         s.target.parentElement.querySelectorAll('.active').forEach(element=>{
            element.classList.remove('active');
         });
         s.target.classList.add('active');
         if(s.target.dataset.bg == 'yes'){
            optionBG = true;
            randomBG();
            localStorage.setItem('backgroundOption',true);
         }else{
             clearInterval(intervalBG);
             localStorage.setItem('backgroundOption',false);
         }
        });
        
   });

   function randomBG(){
      if(optionBG == true){
         intervalBG = setInterval(()=>{
           let randomNumber = Math.floor(Math.random() * arrImg.length);
           landingPage.style.backgroundImage=url(arrImg[randomNumber]);
        },1000);
        
      }  
    }

    randomBG();

//skills progress
let mySkills = document.querySelector('.skills');
    window.onscroll = ()=>{
      let skillsOffsetTop = mySkills.offsetTop;
      let skillsHieghtDiv = mySkills.offsetHeight;
      let windowHieght    = this.innerHeight;
      let windowScrollTop = this.pageYOffset;

         if(windowScrollTop > (skillsOffsetTop - windowHieght)){
            let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
            allSkills.forEach(skill=>{
               skill.style.width = skill.dataset.progress;
            });
         }
    }

//pop up in gallery
  let galleryimg = document.querySelectorAll('.gallery .image-box img');
      galleryimg.forEach(img=>{
         img.addEventListener('click',(e)=>{
            let overly = document.createElement('div');
                overly.className ='poopup-overly';
               document.body.appendChild(overly);

            let poopupBox = document.createElement('div');
                poopupBox.className = 'poopup-box';
               
                if(img.alt !== null){
                  let imgHeading = document.createElement('h3');
                  let imgText    = document.createTextNode(img.alt)
                  imgHeading.appendChild(imgText);
                  poopupBox.appendChild(imgHeading);
              }

            let poopuoImg = document.createElement('img');
                poopuoImg.src = img.src;
                
                poopupBox.appendChild(poopuoImg);
                document.body.appendChild(poopupBox);
            
            let closButton = document.createElement('span');
            let closButtonText = document.createTextNode('X');
                closButton.appendChild(closButtonText);
                closButton.className ='close-btn';
                poopupBox.appendChild(closButton);

         });
        
      });

      //close pop up
      
      document.addEventListener('click',(e)=>{

         if(e.target.className =='close-btn'){
            e.target.parentElement.remove();
            document.querySelector('.poopup-overly').remove();
         }     
      });


      //bullets section
      let bullets = document.querySelectorAll('.nav-bullets .bullets');
      let navLinks = document.querySelectorAll('.header-area .link li');
   
      function navigation(elementName){
         elementName.forEach(elnm=>{
               elnm.addEventListener('click',(e)=>{
               e.preventDefault();
               document.querySelector(e.target.dataset.section).scrollIntoView({
                  behavior:'smooth',
                  block:'center',
                  inline:'center'
               });
            });
         });
   
      }
      navigation(bullets);
      navigation(navLinks);
   
  
   //bullets
   bulletsOption.forEach(span=>{
      span.addEventListener('click',ev =>{
         switchClass(ev,span);
         if(ev.target.dataset.dp == 'show'){
            navBullets.style.display='block';
            navBullets.style.transition ='6s ease-in-out'
            localStorage.setItem('displayBullets','block');
         }
         else{
            navBullets.style.display='none'; 
            localStorage.setItem('displayBullets','none');
         } 
      }); 
   });


   //reset All
   document.querySelector('.settings-box .reset').onclick =()=>{
       localStorage.removeItem('backgroundOption');
       localStorage.removeItem('main-color');
       localStorage.removeItem('displayBullets');
       window.location.reload();
   }
//toggle menu
 let toggleMenu = document.querySelector('.toggle-menu');
 let links      = document.querySelector('.header-area .link');
  
 toggleMenu.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle('menu-active');
    links.classList.toggle('open');
 }


 document.addEventListener('click',(e)=>{
    if(e.tagret !== toggleMenu && e.target !== links){
        if(links.classList.contains('open')){
         toggleMenu.classList.toggle('menu-active');
         links.classList.toggle('open');
        }
      
    }
 })
