// en fait y a pas besoin d utiliser une pormise pour ça
const titre=document.getElementById("titre")
const canevas=document.getElementById("canevas")
const canevas2=document.getElementById("canevas2")
const body=document.getElementById("body")
let texte="bonjour maitre"
let truc
// renommer toutes ces variables pae des noms pour qu'n sache de quoi il s agit
let i=0
let x=5
let x2=0
let y =5
let y2 =0
let a=0;
let indexDrawColor=0


let cercleId=0
let cercleRemplissage
let keyPressedValue
let direction
let deplacement = ()=>(x2+=5)
let deplacemtCount
let key="ArrowRight"

const ctx2=canevas2.getContext("2d")

//utilisation css variables  pour changer la couleur du trait
let r = document.querySelector(':root');
let rs = getComputedStyle(r);
let color1 = rs.getPropertyValue('--color1');
let color2 = rs.getPropertyValue('--color2');
let color3 = rs.getPropertyValue('--color3');
let color4 = rs.getPropertyValue('--color4');
let colorFill=color1
let colors= [color1,color2,color3,color4]
///
function setColor() {
    indexDrawColor++
    if(indexDrawColor==colors.length) {indexDrawColor=0}
    colorFill=colors[indexDrawColor]   
}
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
        
    } 
    // {
    //     "event" : " ",
    //     "direction" : direction,
    //     "deplacement": ()=>(deplacement),
    //     "log" :"touche espace "
        
    // } 
]

function drawChoosedir() {
    key= keys.find((item)=>(item.event==keyPressedValue))
    if (key==undefined) { ()=>setInterval(()=>{ctx2.fillRect(x2,y2,5,5); x+=5;} ,11) } 
    else {    
    deplacement=key.deplacement ;}
    deplacement()
    console.log(deplacement)
    ctx2.fillRect(x2,y2,5,5); 
}


////////////

body.addEventListener("keydown",
function keyDetermine(event) {
    console.log(event.key)
    keyPressedValue=event.key
    if (keyPressedValue==' ') {
        setColor();
        // //rajouter le fct pour ctinuer à dessiner
        // drawChoosedir()
        }
}  
)


function draw2 () {
    
    ctx2.fillStyle = colorFill
    drawChoosedir()
    const timeoutid= setTimeout(draw2, 850);
    timeoutid   
}
draw2()

        // clearTimeout(timeoutid)    

//fonction récursive je crois, elle s'appelle elle meme
//ecriture du texte
function typeWriter() {
    if (i < texte.length) {
      document.getElementById("titre").innerHTML += texte.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
} 
typeWriter()


/////////////ddessin des cercles 
function draw(){
    const ctx=canevas.getContext("2d")
    ctx.fillStyle = "rgb(100,213,315)"
    //arc(x, y, rayon, angleInitial, angleFinal, antihoraire)
    const timeoutid= setTimeout(draw, 500);
    
    //dessiner un cercleplein
    
        function cerclePlein() {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);  // Cercle extérieur
            ctx.fill();   
        }
        function cercleVide() {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2, true);  // Cercle extérieur
            ctx.stroke();   
        }

    function cercleDefRemplissage(){
        if (cercleId%2==0) {
            cercleRemplissage=cerclePlein()
        }
        else if (cercleId%2!=0) {
            cercleRemplissage=cercleVide()
        }
    }

    if (x<=120 ) { 
        cercleDefRemplissage()
        cercleRemplissage
        x=x+25
        cercleId++
        timeoutid
    }
    if (x>120) {
        y=y+25
        x=5
        cercleDefRemplissage()
        cercleRemplissage
        cercleId++
        x=x+25
        console.log(x)
        timeoutid
    }
    if (cercleId>=25) {
        clearTimeout(timeoutid)
    }
}
draw()