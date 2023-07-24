
const titre=document.getElementById("titre")
const canevas=document.getElementById("canevas")
const canevas2=document.getElementById("canevas2")
const body=document.getElementById("body")
let texte="bonjour maitre"
let truc
let i=0
let x=5
let x2=5
let y =5
let y2 =5
let a=0;
let cercleId=0
let cercleRemplissage
let keyPressedValue
let direction
let deplacement = x2=x2+5
let deplacemtCount

//utilisation css variables pour changer la couleur du trait
let r = document.querySelector(':root');
let rs = getComputedStyle(r);
let color1 = rs.getPropertyValue('--color1');
let color2 = rs.getPropertyValue('--color2');
let colorFill=color1
function setColor() {
    colorFill=color2
    console.log(colorFill)
    // r.style.setProperty('--color1', '--color2');
  }


/////////////dessin des cercles 
function drawCircles(){
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
drawCircles()
