// trouver cmt determiner la direcion duserpent qd on a appuye syr la touche espace, pquoi elle dvient undefined qd on fait pause ?



const titre=document.getElementById("titre")
const canevas=document.getElementById("canevas")
const canevas2=document.getElementById("canevas2")
const body=document.getElementById("body")
// let texte="bonjour maitre"

let truc
// renommer toutes ces variables pae des noms pour qu'n sache de quoi il s agit
let i=0
let x=5
let x2=-5
let y =5
let y2 =0
let a=0;
let indexDrawColor=0
let drawing=true
let delai=300


let cercleId=0
let cercleRemplissage
let keyPressedValue="ArrowRight"
let direction
let deplacement = function(){x2+=5}
let deplacemtCount
let key

let tableau=[]
let randomPointX=Math.round(Math.random()*20)*5
let randomPointY=Math.round(Math.random()*20)*5

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

    } ,
    {
        "event" : " ",
        "direction" : direction,
        "deplacement": deplacement,
        "log" :"deplacement vari"

    }
]

body.addEventListener("keydown",
    function keyDetermine(event) {
        keyPressedValue=event.key
        if (keyPressedValue=='Alt') {
            setColor();
        }
        if (keyPressedValue==' ' && drawing==false) {
            console.log("restarting")
            key=keys.find((item)=>(item.direction==`${direction}`))
            keyPressedValue=key.event
            draw2()
            drawing=true ;
        //    keyPressedValue=keys.find((item)=>(item.direction==`${direction}`)).event
        }
    }
)
let texte="bonjour maitre"
//pquoi jepx pas passer "bonjour maitre" en argumant a la place de texte ??
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
function drawChoosedir() {
    deplacement()// demarre le snale dés le chargement
    key= keys.find((item)=>(item.event==keyPressedValue))
    deplacement=key.deplacement ;
    direction=key.direction
    console.log(direction,x2,y2)
    if (x2==randomPointX  && y2==randomPointY) {
        document.getElementById("titre").innerHTML=""
        
        texte="Vous êtes trop fort Maître"
        typeWriter()
    }
    
    //boucle pour colorer le trajet en double
    // for (point of tableau) {
    //     if (point.x2==x2  && point.y2==y2) {
    //         colorFill="red" ;
    //         
    //     }
    //      } 
        
    ctx2.fillRect(x2,y2,5,5);
    tableau.push({x2,y2})

}
////////////

function drawRandomPoint () {
    console.log(randomPointX,randomPointY)
    ctx2.fillStyle = "pink" ;
    ctx2.fillRect(randomPointX,randomPointY,5,5);
}

    drawRandomPoint()

function draw2 () {

    const timeoutid= setTimeout(draw2, delai); //pquoi je px pas le déclarer à l'extér de draw2 sinon il se lance pas

    ctx2.fillStyle = colorFill
    drawChoosedir()
    if (keyPressedValue==' ' && drawing==true) { // je peux pas relancer le mvmt d ici puisque c une fct recursive
        console.log("pause")
        clearTimeout(timeoutid) ; drawing=false} //ici la driection devient undefined ?? poquoi  ?
}
draw2()





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
        timeoutid
    }
    if (cercleId>=25) {
        clearTimeout(timeoutid)
    }
}
draw()
