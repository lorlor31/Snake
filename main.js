// réduire/rétablir ctrl k ctrl 0 /ctrl J 


 import {draw} from "./drawCircles"

 const titre=document.getElementById("titre")
 const canevas=document.getElementById("canevas")
 const canevas2=document.getElementById("canevas2")
 const body=document.getElementById("body")
 // let texte="bonjour maitre"
 
 let truc
 // renommer toutes ces variables par des noms pour qu'on sache de quoi il s agit
 //les lcasser en sous partie selon les fctions qui les utilisent
 // let i=0
 
 //Variables pour typewriter()
 let indexLettre=0
 let texte="bonjour maitre"
 let texte2="comment allez vous"

 let x2=-5

 let y2 =0
 let a=0;
 let indexDrawColor=0
 let drawing=true
 let delai=300
 
 let keyPressedValue="ArrowRight"
 let keyPressedValueMem="ArrowRight"
 let direction="L2R" 
 let deplacement = function(){x2+=5}
 let directionmem
 let deplacementmem
 let deplacemtCountcolorFill
 let key
 
 let tableau=[]
 let randomPointX=Math.round(Math.random()*20)*5
 let randomPointY=Math.round(Math.random()*20)*5
 
 const ctx2=canevas2.getContext("2d")
 
 // EventListener pour le téléchargement du canevas 
 document.getElementById("download").addEventListener("click",
 function(){
     let canvasUrl=canevas2.toDataURL()
     const lien=document.createElement("a")
     lien.href=canvasUrl
     lien.download="imageCanevas"
     lien.click()
     lien.remove()  
    }
    )
    
    //utilisation des CSS variables pour changer la couleur du trait
    let r = document.querySelector(':root');
    let rs = getComputedStyle(r);
    let color1 = rs.getPropertyValue('--color1');
    let color2 = rs.getPropertyValue('--color2');
    let color3 = rs.getPropertyValue('--color3');
    let color4 = rs.getPropertyValue('--color4');
    let colorFill=color1
    let colorFillMem=color1
    let colors= [color1,color2,color3,color4]
    // Fonction pour changer la couleur du serpent
function setColor() {
     indexDrawColor++
     if(indexDrawColor==colors.length) {indexDrawColor=0}
     colorFill=colors[indexDrawColor]
     colorFillMem=colorFill
 }
 // tableau des touches et des directions de celles-ci
let keys=[
     {
         "event" : "ArrowRight",
         "direction" : "L2R" ,
         "deplacement": ()=>(x2+=5),
         "log" :"'x2 est', x2, direction"
     } ,
     {
         "event" : "ArrowDown",
         "direction" : "U2D" ,
         "deplacement": ()=>(y2+=5),
         "log" :"'y2 est', y2, direction"
     } ,
     {
         "event" : "ArrowUp",
         "direction" : "D2U" ,
         "deplacement": ()=>(y2-=5),
         "log" :"'y2 est', y2, direction"
     } ,
     {
         "event" : "ArrowLeft",
         "direction" : "R2L" ,
         "deplacement": ()=>(x2-=5),
         "log" :"'x2 est', x2, direction"
 
     } ,
     {
         "event" : "pause",
         "direction" : "none",
         "deplacement": ()=>(x2=x2),
         "log" :"deplacement vari"
     }
 ]
 
 ////
body.addEventListener("keydown",
     function keyDetermine(event) {
        keyPressedValue=event.key ;
        function keyPressValueAttribution(){
            if (keyPressedValue=='Alt') {
                setColor();
            }

            if (keyPressedValue==' ' &&  drawing==true) {
                drawing=false ;
                keyPressedValue="pause" ;
                console.log("pause",keyPressedValueMem)
            }
            else if (keyPressedValue==' ' &&  drawing==false) {
                keyPressedValue=keyPressedValueMem ;
                drawing=true
                console.log("restarting")
            }
            else{
                switch (keyPressedValue) {
                    case "ArrowRight" : 
                    keyPressedValue="ArrowRight" ;
                    keyPressedValueMem="ArrowRight" ;
                    break ;
                    case "ArrowLeft" : 
                    keyPressedValue="ArrowLeft" ;
                    keyPressedValueMem="ArrowLeft" ;
                    break ;
                    case "ArrowDown" : 
                    keyPressedValue="ArrowDown" ;
                    keyPressedValueMem="ArrowDown" ;
                    break ;
                    case "ArrowUp" : 
                    keyPressedValue="ArrowUp" ;
                    keyPressedValueMem="ArrowUp" ;
                    break ;
                    default :
                    keyPressedValue=keyPressedValueMem ;
                }
            console.log("keypressvalueMem eest",keyPressedValue)        
            }
        
        }
        keyPressValueAttribution() ;
        
    }
 )
 
 //affiche un point au hasard 
function drawRandomPoint () {
     console.log(randomPointX,randomPointY)
     ctx2.fillStyle = "pink" ;
     ctx2.fillRect(randomPointX,randomPointY,5,5);
 }
drawRandomPoint()
 
//  //boucle pour colorer le trajet en double

function drawPoint() {
    deplacement() ;

    
    //     //colore si ça croise
    //     for (let point of tableau) {
    //         if (point.x2==x2  && point.y2==y2) {
    //              colorFill="red" ;
    //         }
    //     }
    //     // Message si attrape le point
    //     if (x2==randomPointX  && y2==randomPointY) {
    //         alert("Vous êtes trop fort Maître" )
    //     }
        //
        key= keys.find((item)=>(item.event==keyPressedValue))
        direction=key.direction ;
        deplacement=key.deplacement ;
        ctx2.fillStyle = colorFill
        ctx2.fillRect(x2,y2,5,5);
        tableau.push({x2,y2}) ;
        
        colorFill=colorFillMem 
     
     // console.log(tableau,x2,y2)
}


const drawSnake = () =>
(setInterval(()=>drawPoint(),delai))
 
drawSnake()
 

// est ce qu'on pourrait utiliser les promise pour lancer typewrtier2 une fois que le 1er  a termine

// //EXEMPLE D UTILISATION D UNE PROMISE
let writing=true
function typeWriter(t) {
    function resetText() {document.getElementById("titre").innerHTML ='';}
     if (indexLettre< t.length) {
        //console.log("t est",t,typeof(t))
       document.getElementById("titre").innerHTML += t.charAt(indexLettre);
       indexLettre++;
       setTimeout(()=>typeWriter(t), 100);
       //console.log("writing is",writing)
     }
     else {writing=false ; 
        //console.log("writing is",writing) ;
     setTimeout(resetText,1500)
     
    }
}

// //ESSAI D UTILISATION DUNE PROMISE POUR ENCHAINER LES 2 typewro=iter mais ç amarche pas
// // //création d'une Promise
//     let maPromesse = new Promise(

//         function(myResolve, myReject) { //



//     // la Promise est un objet qui contient 
  
//     //      1/ le code qui produit    //patienter//  
//             if (writing == true) {
//             myResolve(texte);// code qui s'éxécute si résolue => la variable ss va prendre cette valeu
//             } 
//             else {
//             myReject(texte2);// code qui s'éxécute si non résolue => la variable error va prendre cette valeur
//             }
//         }
//     );
// // //      2/ le code qui consomme      
//     maPromesse
//     .then(function(ss){typeWriter(ss)})
//     .catch(function(error){typeWriter(error)})
       
    

// ///////
//bon bah pour linstant je n'arrive pas a changer ce titre et à l'affihcer progressibement

typeWriter(texte)
setTimeout(()=>typeWriter(texte2),4500)


// setTimeout(() => {
//    typeWriter(texte2) 
// }, 5000);

draw()
 
             
     
 
 